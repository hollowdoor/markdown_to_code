const { mdToCode } = require('../');
const fs = require('fs');

mdToCode({
    filename:'test.md',
    type: 'javascript'
})
.write('out.js')
.then(result=>{
    console.log(result);
    console.log(fs.readFileSync('out.js', 'utf8'));
})
.catch(err=>console.log(err));
