markdown-to-code
===

Install
---

`npm install markdown-to-code`

Usage
---

```javascript
//import { mdToCode } from 'markdown-to-code';
//import fs from 'fs';
const { mdToCode } = require('markdown-to-code');
const fs = require('fs');

mdToCode({
    //The markdown file name
    filename:'test.md',
    //Filter by type
    type: 'javascript',
    //map is optional, gets each block of code,
    //and must return a string if you set it
    map(code){
        return code;
    }
})
//Write to a file
.write('out.js')
.then(({code, filename})=>{
    //Prove the new code file exists
    console.log(fs.readFileSync(filename, 'utf8'));
})
.catch(err=>console.log(err));
```

A markdown file like this:

~~~~markdown
Title
===

```javascript
let me = 'exist';
```

```javascript

let that = me;
```
~~~~

Will be turned into this:

```javascript
let me = 'exist';

let that = me;
```

About
---

`markdown-to-code` gets code from [github style code blocks](https://help.github.com/articles/creating-and-highlighting-code-blocks/) in markdown, and writes that code to a file.
