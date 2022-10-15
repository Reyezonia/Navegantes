# Overview

  strgMethods is a string method library designed for the usage with mangosta.

# Installation

# User Guide
```javascript
  Strg = require('strgMethods');
  strg = new Strg(value, sequence);
  
  strg.len().value // if in string '$len(num)' replace it with a random string of num chars
  strg.intv().value // if in string '$intv(num)' replace it with the given sequence multiplied buy num
  strg.seq().value // if in string '$seq' replace it with the sequence provided

  // you return the string by adding a .value to the end of the chain
  // you can chain the methods or run all on the value by strg.all(). you dont need to add a .value to the end
```
# License

(The MIT License)

Copyright (c) 2013 doodzik <4004blog@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
