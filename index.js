'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var fs = _interopDefault(require('fs'));
var Promise = _interopDefault(require('bluebird'));

const readFile = Promise.promisify(fs.readFile);
const writeFile = Promise.promisify(fs.writeFile);

const splitBy = /([\s\S]+?)(```)([\S]*?)\n([\s\S]+?\n)(```)([\s\S]+?)/;


function toCode(str, type = false){

    const getBlock = type
    ? (code, codeType)=>{
        if(codeType === type){
            return code;
        }
        return '';
    }
    : (code)=>{
        return code;
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

function readCode(filename, type){
    return readFile(filename, 'utf8')
    .then(str=>{
        return toCode(str, type);
    });
}

class Transfer {
    constructor({
        filename = '',
        type = null
    } = {}){
        this.filename = filename;
        this.type = type;
        this.pending = readCode(filename, type);
    }
    write(out){
        return this.pending.then(code=>{
            return writeFile(out, code)
            .then(v=>code);
        });
    }
}

function mdToCode(opts){
    return new Transfer(opts);
}

exports.splitBy = splitBy;
exports.toCode = toCode;
exports.readCode = readCode;
exports.mdToCode = mdToCode;
