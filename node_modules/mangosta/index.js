var Factory, strgMethods;
strgMethods = require('strg_methods');

/**
@class Factory
@example
  new Factory(mongoose.model('name'), function() { return obj; });
@constructor
@param [model] {Object} The mongoose.model('name') or nothing if you want a plain factory Object
@param factory {Function} The factory Object
  @param factory.object {Object} The return Object of function, if you want you can include another factory in the obj/child. please look at the test/index.js ile in the repo how it is included
    @param [factory.object.key] {String|Number|Array} value 
    @param [factory.object.$child] {Object} you can nest children in other children as you wish. you can use empty children, too
    @param [factory.object.$child.child_name] {Object|Function}
@property model
@type Function|Object
@default factory
@property factory
@type Function
@property sequence
@type Number
@default 0
*/
function Factory(model, factory){
  this.model = model;
  this.factory = factory || model;
  this.sequenc = 0;
}

/**

builds a mongoose Object or a plain Object

@method build
@async
@param [options={}] {Object} options field, if nothing specified then return one default doc
  @param [options.$factory="default"] {String} write the child factories down seperated by space which you want to build. $child{first: {$child: second{}}} would be options.$factory = "first second"
  @param [options.$seq=this.sequenc] {Number} when provided resets sequence with given num
  @param [options.$doc={}] {Object} Set the value of the doc to create
    @param [options.$doc.$factory=options.$factory] {String} same as options.$factory
    @param [options.$doc.$num=1] {Number} set number of docs which should be created
    @param [options.$doc.key] {String|Number|Array} value which should be merged with parent factory and this factory
  @param [options.$docs=[{}]] {Array} if you want to build multiple different docs, basically the same as options.$doc in an Array -> [ options.$doc, options.$doc ]
@param callback {Function} callback
*/
Factory.prototype.build = function (options, callback){
  if (typeof options == "function"){
    callback = options;
    options = {};
  }
  this.sequenc = (typeof options.$seq === 'undefined') ? this.sequenc : options.$seq;
  this._getNewDocs(options, function (err, docs) {
    if (err) { return callback(err, null); }
    docs = (docs.length === 1 ) ? docs[0] : docs;
    return callback(err, docs);
  });
};

/**

checks if new mongoose.model(object) got a wrong field value

@method _compareObjSync
@private
@param mObj {Object} mongoose Object
@param obj {Object} plain Object
@return {Object} if no error then null else new Error
*/
Factory.prototype._compareObjSync = function (mObj, obj) {
  var defaults, arr, mArr;
  if(this.model === this.factory){ return null; }
  obj._id = "";
  mArr = Object.keys(mObj.toObject()).sort();
  arr = Object.keys(obj).sort();
  //check if default by adding keys from mObj to obj
  defaults = mArr.filter(function(val) {
    return arr.indexOf(val) == -1;
  });
  arr = arr.concat(defaults).sort();
  for (var i = 0; i < arr.length; i++) {
    if (mArr[i] != arr[i]) {
      return new Error(arr[i]+' isnt the right Schema var type');
    }
  }
  return null;
};

/**

merges obj2 into obj1

@method _mergeObjsSync
@private
@param obj1 {Object} Object
@param obj2 {Object} Object
@return {Object} merged object
*/
Factory.prototype._mergeObjsSync = function (obj1, obj2) {
  var attrname, obj3;
  obj3 = {};
  for (attrname in obj1) {
    obj3[attrname] = obj1[attrname];
  }
  for (attrname in obj2) {
    obj3[attrname] = obj2[attrname];
  }
  return obj3;
};

/**

handles the options field from build

@method _getNewDocs
@private
@async
@param options {Object} options field
@param callback {Function} callback
@returns {Function} callback(err, docs) 
*/
Factory.prototype._getNewDocs = function (options, callback) {
  var $doc, docs, $docsOpt, factory, $num, _i, _len;
  docs = [];
  options.$docs = (options.$doc) ? [options.$doc] : options.$docs;
  $docsOpt = options.$docs || [{}];
  for (_i = 0, _len = $docsOpt.length; _i < _len; _i++) {
    $doc = $docsOpt[_i];
    $num = $doc.$num || 1;
    factory = (typeof $doc.$factory === "undefined") ? options.$factory : $doc.$factory;
    this._getFactory(factory, function(err, $fctry) {
      if (err) {return callback(err, null);}
      $factory = $fctry;
    });
    delete $doc.$factory;
    delete $doc.$num;
    for (__i = 0, __len = $num; __i < __len; __i++) {
      this.sequenc++;
      docs.push(this._newDoc($factory, $doc));
      err = this._compareObjSync(docs[_i], this._mergeObjsSync($factory, $doc));
    }
  }
  return callback(err, docs);
}; 

/**

get factory object

@method _getFactory
@private
@async
@param options {Object} options field
@param callback {Function} callback
@returns {Function} callback(err, factoryObject) 
*/
Factory.prototype._getFactory = function (options, callback){
  var factory, err, child, _len, _i, child_factory;
  if (typeof options == "function"){
    callback = options;
    options = "";
  }
  factory = this.factory();
  child = factory.$child;
  delete factory.$child;
  if(options && options != "default"){
    factories = options.split(' ');
    for (_i = 0, _len = factories.length; _i < _len; _i++) {
      child_factory = child[factories[_i]];
      if (typeof child_factory === "undefined") { return callback(new Error(factories[_i]+' isnt a child factory'), null); }
      child_factory = (typeof child_factory === 'function') ? child_factory() : child_factory;
      child = child_factory.$child;
      delete child_factory.$child;
      factory = this._mergeObjsSync(factory, child_factory);
    }
  }
  return callback(null, factory);
};

/**

set new doc

@method _newDoc
@private
@param [options={}] {Object} options field
@param callback {Function} callback
@return {Object} mongoose factory ? mongoose Object : plain Object 
*/
Factory.prototype._newDoc = function (factory, doc){
  if(this.model === this.factory){
    return this.stringMethods(this._mergeObjsSync(factory, doc));
  } else {
    return new this.model(this.stringMethods(this._mergeObjsSync(factory, doc)));
  }
};

/**

applies strMethods.all() to each value of object

@method stringMethods
@uses strgMethods
@private
@param doc {Object} takes a document
@return {Object} object with applied strgMethods
*/
Factory.prototype.stringMethods = function (doc){
  for (var key in doc) {
    if (doc.hasOwnProperty(key)) {
      Strg = new strgMethods(doc[key], this.sequenc);
      doc[key] = Strg.all();
    }
  }
  return doc;
};

/** 

accepts options as factory.build

@example
  //with mocha you can pass done() as a callback
  factory.create({$doc: {$num: 3}}, done());
  factory.create(function(err, docs){
    //insert here whatever you want
  });

@method create
@async
@param [options={}] {Object} options field
@param [callback] {Function} callback
@return {Function} with (err, docs)
*/
Factory.prototype.create = function (options, callback) {
  var model;
  model = this.model;
  if(model === this.factory){ throw new Error("you cant use a mongoose method on a plain factory object"); }
  if (typeof options == "function"){
    callback = options;
    options = {};
  } else if (typeof options == "undefined"){
    options = {};
  }
  this.build(options, function (err, docs) {
    if (err && typeof callback == "function") { return callback(err, null); }
    model.create(docs, function (err, docs){
      if (typeof callback == "function"){
        return callback(err, docs);
      }
    });
  });
};

/**

instead of factory.model.find
see http://mongoosejs.com/docs/api.html#model_Model.find

@method find
@uses mongoose.model.find
*/
Factory.prototype.find =  function (args) {
  if(this.model === this.factory){ throw new Error("you cant use a mongoose method on a plain factory object"); }
  this.model.find.call(arguments);
};

/**

instead of factory.model.count
see http://mongoosejs.com/docs/api.html#model_Model.count

@method count
@uses mongoose.model.count
*/
Factory.prototype.count =  function (args) {
  if(this.model === this.factory){ throw new Error("you cant use a mongoose method on a plain factory object"); }
  this.model.count.call(arguments);
};

/** 

instead of factory.model.findOne
see http://mongoosejs.com/docs/api.html#model_Model.findOne

@method findOne
@uses mongoose.model.findOne
*/
Factory.prototype.findOne = function (args) {
  if(this.model === this.factory){ throw new Error("you cant use a mongoose method on a plain factory object"); }
  this.model.findOne.call(arguments);
};

/**

removes docs which matches options from factory.model

@method remove
@async
@uses mongoose.model.remove
@param [options={}] options field as in mongoose.model.remove
@param [callback] {Function} callback
@return {Function} returns the same callback as http://mongoosejs.com/docs/api.html#model_Model.remove
*/
Factory.prototype.remove = function (options, callback) {
  if(this.model === this.factory){ throw new Error("you cant use a mongoose method on a plain factory object"); }
  if (typeof options == "undefined") {
    options = {};
  }
  if (typeof options == "function") {
    callback = options;
    options = {};
  }
  this.model.remove(options, function (err, num){
    if (typeof callback != "undefined") {
      callback(err, num);
    }
  });
};

module.exports = Factory;
