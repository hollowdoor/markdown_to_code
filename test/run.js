const { mdToCode } = require('../');
const fs = require('fs');
mdToCode({
    filename:'test.md',
    type: 'javascript'
})
.write('out.js')
.then(result=>{
    console.log(fs.readFileSync('out.js', 'utf8'));
});
