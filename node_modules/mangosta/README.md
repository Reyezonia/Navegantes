# Overview

Mangosta (esp. for mongoose) is a factory library for mongoose, which provides a simple but powerful interface.

# Installation

$ npm install mangosta

# User Guide

find the API under: http://doodzik.github.io/mangosta

###Factory file
__dirname/test/factory/test_factory.js

```javascript
var factory, test_factory1, Factory, mongoose;

mongoose = require('mongoose');
Factory = require('mangosta');
model = mongoose.model("factory");//get model, which was previously created
test_factory1 = require(__dirname/test/factory/test_factory.js);

factory = new Factory(model, function() {
  return {
    key: value,
    $child: { // child factory -> isnt going to be in the doc
      // define child factory as an object or a function
      // define child as function if it is important that the child is build on every build/create operation 
      //   -> for example another factory
      child_name: function() {
        return {
          key: value
        };
      },
      child_name: {
        key: value
        $child: {
          child_name: function() {
            //example of another factory in a factory -> call this as a regular child no changes needed
            var $docs;
            test_factory1.build({}, function(err, doc){
              $docs = doc;
            });
            return {
              firstName: $docs.test
            };
          }
        }
      }
    }
  }
});

module.exports = factory;
```

###Test file
__dirname/test/index.js

```javascript

factory = require("./factories/test_factory.js");

//build and create accept the same parameters
factory.create(obj, callback)
factory.build(obj, callback)

// if single document return object else Array Object
// create return same param as model.create
callback = function(err, docs) {}

obj =
  {
    $seq: Int,
    // reset seq to given num
    $factory: String,
    // if factory isnt defined use the default factory 
    $docs:[ 
    //or $doc but then without the squared brackets
    //you can skip every key -> you can parse a empty object
      {
        // if the factory isnt defined use the factory of the parent
        $factory: String,
        //define how many of these object should be created
        $num: Int,
        // you can modify the values of the factory
        key: value
      }
      //add objects here to create multi num document with different factory 
      //or/and value for key of main factory
    ]
  };;

// if you wish you can access the model directly by factory.model

// string methods
// just include them in the value
// please visit the strgMethods module to see what you can do
// https://github.com/doodzik/strg_methods

```

or to see more examples look at the testfile

# License

(The MIT License)

Copyright (c) 2013 doodzik <4004blog@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
