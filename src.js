import fs from 'fs';
import Promise from 'bluebird';
const readFile = Promise.promisify(fs.readFile);
const writeFile = Promise.promisify(fs.writeFile);

export const splitBy = /([\s\S]+?)(```)([\S]*?)\n([\s\S]+?\n)(```)([\s\S]+?)/;


export function toCode(str, type = false, map = (code)=>code){

    const getBlock = type
    ? (code, codeType)=>{
        if(codeType === type){
            return map(code);
        }
        return '';
    }
    : (code)=>{
        return map(code);
    };

    let code = '';
    let tokens = str.split(splitBy);

    for(let i=0; i<tokens.length; i++){

        if(tokens[i] === '```'){
            ++i;
            code += getBlock(tokens[i+1], tokens[i]);
            ++i; ++i;
        }
    }

    return code;
}

export function readCode(filename, type, map){
    return readFile(filename, 'utf8')
    .then(str=>{
        return toCode(str, type, map);
    });
}

class Transfer {
    constructor({
        filename = '',
        type = null,
        map = (code)=>code
    } = {}){
        this.filename = filename;
        this.type = type;
        this.pending = readCode(filename, type, map);
    }
    write(out){
        return this.pending.then(code=>{
            return writeFile(out, code)
            .then(v=>({code,filename:this.filename}));
        });
    }
}

export function mdToCode(opts){
    return new Transfer(opts);
}
