var factory, Factory, mongoose, schema;

mongoose = require('mongoose');
connection = mongoose.connect('mongodb://localhost/mongoos-factory-test')

factory0Schema = new mongoose.Schema({
  "firstName": String,
  "lastName": String,
  "addr": String,
  "type": {"type": Number, "max": 10},
  "date": Date 
});

model = mongoose.model('factory0', factory0Schema);

Factory = require('../index.js');

factory1Schema = new mongoose.Schema({
  "test": String
});

model1 = mongoose.model('factory1', factory1Schema);

factory1 = new Factory(mongoose.model("factory1"), function() {
  return {
    test: "factory"
  };
});

factory = new Factory(mongoose.model("factory0"), function() {
  return {
    firstName: "d00d",
    lastName: "zik",
    addr: "isabela",
    type: 0,
    $child: {
      lola: function() {
        return {
          firstName: "lo",
          lastName: "la",
          $child: {
            la: function() {
              return {
                firstName: "la"
              };
            }
          }
        };
      },
      empty: function() {
        return {
          $child: {
            notempty: function() {
              return {
                firstName: "not",
                lastName: "empty"
              };
            }
          }
        };
      },
      object_child: {
        firstName: "object child"
      },
      current_date: function() {
        return {
          date: new Date()
        };
      },
      factory_ref: function() {
        var $docs;
        factory1.build({}, function(err, doc){
          $docs = doc;
        });
        return {
          firstName: $docs.test
        };
      },
    }
  };
});

factoryObj = new Factory(function() {
  return {
    firstName: "factory",
    lastName: "hi",
    type: "lolo"
  };
});

describe('Factory', function(){
  afterEach(function(done){
    model.remove(function(){
      model1.remove(function(){
        done();
      });
    });
  });

  describe('when done() as callback', function(){
    before(function(done) {
      factory.create({$doc:{$num:6}}, done());
    });
    it("returns counts",function(){
      factory.count({}, function(err, num){
        num.should.eql(6);
      });
    });
  });

  describe('when stringMethods', function(){
    it('returns valid', function(){
      factory.stringMethods({test:"$len(12)"}).test.length.should.eql(12) 
    });
  });
  
  describe('when _newDoc', function(){
    it('returns valid mongoose doc', function(){
      var new_doc;
      new_doc = factory._newDoc({firstName: 'hoohhhoo', lastName: 'hiihhhii'}, {lastName: '$len(66)', type: 3});
      new_doc.lastName.length.should.eql(66);
      new_doc.type.should.eql(3);
      new_doc.constructor.name.should.eql('model');
    });
    it('returns valid plain obj', function(){
      var new_doc;
      new_doc = factoryObj._newDoc({firstName: 'hoohhhoo', lastName: 'hiihhhii'}, {lastName: '$len(66)', type: 3});
      new_doc.lastName.length.should.eql(66);
      new_doc.type.should.eql(3);
      new_doc.constructor.name.should.not.eql('model');
    });
  });

  describe('when _getFactory', function(){
    it('return default factory', function(){
      var test_obj;
      test_obj = {firstName: "d00d", lastName: "zik", addr: "isabela", type: 0};
      factory._getFactory('default', function(err, fctry){
        fctry.should.eql(test_obj);
      });
      factory._getFactory(function(err, fctry){
        fctry.should.eql(test_obj);
      });
    });

    it('return 1st child', function(){
      var test_obj;
      test_obj = {firstName: "lo", lastName: "la", addr: "isabela", type: 0};
      factory._getFactory("lola", function(err, fctry){
        fctry.should.eql(test_obj);
      });
    });

    it('return 2st child', function(){
      var test_obj;
      test_obj = {firstName: "la", lastName: "la", addr: "isabela", type: 0};
      factory._getFactory("lola la", function(err, fctry){
        fctry.should.eql(test_obj);
      });
    });

    it('return 2st child with empty first', function(){
      var test_obj;
      test_obj = {firstName: "not", lastName: "empty", addr: "isabela", type: 0};
      factory._getFactory("empty notempty", function(err, fctry){
        fctry.should.eql(test_obj);
      });
    });

    it('return child with obj not function', function(){
      var test_obj;
      test_obj = {firstName: "object child", lastName: "zik", addr: "isabela", type: 0};
      factory._getFactory("object_child", function(err, fctry){
        fctry.should.eql(test_obj);
      });
    });

    it('invoke fx at build', function(){
      var test_obj;
      factory._getFactory("current_date", function(err, fctry){
        setTimeout(function(){
          factory._getFactory("current_date", function(err, fctry1){
            fctry1.date.should.not.be.above(fctry.date);
          });
        }, 1000);
      });
    });

    it('doesnt have proberty of child', function(){
      factory._getFactory(function(err, fctry){
        fctry.should.not.have.property("$child");
      });
    });

    it('return factory in factory', function(){
      var test_obj;
      factory._getFactory("factory_ref", function(err, fctry){
        fctry.firstName.should.eql("factory");
      });
    });

    describe("with invalid", function(){
      it("returns err", function() {
        factory._getFactory("notExists", function(err){
          err.message.should.eql("notExists isnt a child factory");
        });
      });
    });
  });

  describe("_mergeObjsSync", function(){
    it("returns merged obj", function(){
      var newObj;
      newObj = factory._mergeObjsSync({one:"one", two: "two"}, {one: "three", three: "one"});
      newObj.one.should.eql("three");
      newObj.two.should.eql("two");
      newObj.three.should.eql("one");
    });
  });

  describe('when _compareObjSync', function(){
    describe('when Obj factory', function(){
      it("returns false",function(){
        (factoryObj._compareObjSync({hola: "fas", type:"avr"}, {}) == null).should.be.true;
      });
    });
    describe('when factory', function(){
      describe('when mObj keys different then obj keys', function(){
        it("returns Error",function(){
          var mObj, err;
          mObj = new factory.model({ firstName: "d00d", lastName: "111", addr: "isabela", type: 'lbhjlh'});
          err = factory._compareObjSync(mObj, {firstName: "d00d", lastName: "111", addr: "isabela", type: 0})
          err.should.be.instanceof(Error);
          err.message.should.eql('type isnt the right Schema var type');
        });
      });
      describe('when mObj keys different then obj keys', function(){
        it("returns null",function(){
          var mObj, err;
          mObj = new factory.model({    firstName: "d00d", lastName: "111", addr: "isabela", type: 0});
          (factory._compareObjSync(mObj, {firstName: "d00d", lastName: "111", addr: "isabela", type: 0}) == null).should.be.true;
        });
      });
    });
  });

  describe('when _getNewDocs', function(){
    it('returns single default', function(){
      factory._getNewDocs({}, function(err, docs){
        docs.length.should.eql(1);
      });
    });

    describe('with num', function(){
      it('return defaults', function(){
        factory._getNewDocs({$doc:{$num: 20}}, function(err, docs){
          docs.length.should.eql(20);
        });
      });
      it('return defaults with default objs', function(){
        factory._getNewDocs({$docs:[{$num: 20},{},{}]}, function(err, docs){
          docs.length.should.eql(22);
        });
      });
    });
    describe('with factory', function(){
      it('return 1 child in doc', function(){
        factory._getNewDocs({$docs:[{$factory: 'lola'}]}, function(err, docs){
          docs[0].firstName.should.eql('lo');
        });
      });
      it('return 1 child with custom doc', function(){
        factory._getNewDocs({$docs:[{$factory: 'lola', firstName:"dodo"}]}, function(err, docs){
          docs.length.should.eql(1);
          docs[0].firstName.should.eql('dodo');
          docs[0].lastName.should.eql('la');
        });
      });
      it('default factory with $doc factory 2nd child', function(){
        factory._getNewDocs({$factory: 'lola', $doc:{$factory: 'empty notempty'}}, function(err, docs){
          docs.length.should.eql(1);
          docs[0].firstName.should.eql('not');
          docs[0].lastName.should.eql('empty');
        });
      });
    });
  });

  describe('when find', function(){
    beforeEach(function(done){
      factory.model.find({}).remove(function(){
        factory.create({$docs:[{$num:5},{lastName: "zuk", $num: 3}]}, function(){
          done();
        });
      });
    });
    describe('without options', function(){
      it('returns 8 docs', function(){
        factory.find(function(err, docs){
          docs.length.should.eql(8);
        });
      });
    });
    describe('with options', function(){
      it('returns 3 docs', function(){
        factory.find({lastName: "zuk"}, function(err, docs){
          docs.length.should.eql(3);
        });
      });
    });
  });

  describe('when findOne', function(){
    before(function(done){
      factory.create({$docs:[{},{lastName: "zuk"}]}, function(){
        done();
      });
    });
    describe('without options', function(){
      it('returns one doc', function(){
        factory.findOne(function(err, doc){
          doc.length.should.eql(1);
        });
      });
    });
    describe('with options', function(){
      it('returns specific doc', function(){
        factory.findOne({lastName: "zuk"}, function(err, doc){
          doc.lastName.should.eql("zuk");
        });
      });
    });
  });
  
  describe('when count', function(){
    before(function(done) {
      factory.create({$doc:{$num:6}}, function(){
        done();
      });
    });
    it("returns counts",function(){
      factory.count({}, function(err, num){
        num.should.eql(6);
      });
    });
  });

  describe('when remove', function(){
    beforeEach(function(done){
      factory.model.find({}).remove(function(){
        factory.create({$docs:[{$num:5},{lastName: "zuk", $num: 3}]}, function(){
          done();
        });
      });
    });

    describe('without options', function(){
      describe('without callback', function(){
        it('removes all', function(done){
          factory.remove();
          process.nextTick(function(){
            factory.model.find({}).count(function(err, num){
              num.should.eql(0);
              done();
            });
          });
        });
      });

      describe('with callback', function(){
        it('removes all and return num of retured', function(){
          factory.remove(function(err, num){
            num.should.eql(8);
          });
        });
      });
    });

    describe('with options', function(){
      describe('without callback', function(){
        it('removes 3', function(){
          factory.remove({lastName: "zuk"});
          process.nextTick(function(){
            factory.model.find({}).count(function(err, num){
              num.should.eql(5);
            });
          });
        });
      });

      describe('with callback', function(){
        it('removes 3 and return num of retured', function(done){
          factory.remove({lastName: "zuk"}, function(err, num){
            num.should.eql(3);
            done();
          });
        });
      });
    });
  });

  describe('when build', function(){
    describe("with invalid", function(){
      it("var type return err", function(){
        factory.build({$doc:{type: "f234fq3"}}, function(err){
          err.message.should.eql("type isnt the right Schema var type");
        });
      });
    });

    it ("set sequence to given num", function(){
      factoryObj.build({$seq: 10, $doc: {$num: 20}}, function(err, doc){
        factoryObj.sequenc.should.eql(30);
        factoryObj.build({$doc: {$num: 20}}, function(err, doc){
          factoryObj.sequenc.should.eql(50);
        });
      });
    });

    describe('with single document', function(){
      it('without options', function(){
        factory.build({}, function(err, doc){
          doc.should.have.property('_id');
        });
      });
      it('with options', function(){
        factory.build({"$doc":{"type": 9}}, function(err, doc){
          doc.should.have.property('_id');
          doc.type.should.eql(9);
        });
      });    
    });

    describe('with multi document', function(){
      it('create default', function(){
        factory.build({$doc:{$num: 4}}, function(err, docs){
          docs.length.should.be.equal(4);
        });
      });
      it('create 2 default and 2 custom', function(){
        factory.build({$docs:[{addr: 'hallo'}, {type: 3}, {$num: 2}]}, function(err, docs){
          docs.length.should.be.equal(4);
          docs[0].should.have.property('addr', 'hallo');
          docs[1].should.have.property('type', 3);
        });
      });
      it('create 2 custom', function(){
        factory.build({$docs:[{addr: 'hallo'}, {type: 3}]}, function(err, docs){
          docs.length.should.be.equal(2);
          docs[0].should.have.property('addr', 'hallo');
          docs[1].should.have.property('type', 3);
        });
      });
    });
    describe("without args", function(){
      describe("without options", function(){
        it("returns default obj", function(){
          factory.build({}, function(err, doc1){
            factory.build(function(err, doc2){
              doc1["_id"] = doc2["_id"];
              doc1.toJSON().should.eql(doc2.toJSON());
            });
          });
        });
      });
    });
  });

  describe('when create', function(){
    describe('single document', function(){
      it('create mongodb dcuments', function(done){
        factory.create({$doc: {$num:10}}, function(){
          model.find({}).exec(function(err, doc){
            doc.length.should.eql(10);
            done();
          });
        });
      });

      it('with invalid data return err', function(){
        factory.create({"$docs":[{"type": 1000}]}, function(err, docs){
          err.should.be.an.instanceof(Error);
        });
      }); 
    });
    describe('multi document', function(){
      describe('with valid data', function(){
        it('create mongodb dcuments', function(done){
          factory.create({$docs:[{addr: 'hallo'}, {type: 3}]}, function(err, docs){
            model.find({}).exec(function(err, docs1){
              docs1.length.should.be.equal(2);
              done();
            });
          });
        });
      });
      describe('with invalid data', function(){
        it('retrieve err', function(done){
          factory.create({$docs:[{addr: 'hallo', $num: 3}, {type:1000}]}, function(err, docs){
            err.should.be.instanceof(Error);
            model.find({}).exec(function(err, docs1){
              docs1.length.should.be.equal(3);
              done();
            });
          });
        });
      });
    });

    describe("without args", function(){
      describe("without options", function(){
        it("returns default obj", function(){
          factory.create({}, function(err, doc1){
            factory.create(function(err, doc2){
              doc1["_id"] = doc2["_id"];
              doc1.toJSON().should.eql(doc2.toJSON());
            });
          });
        });
      });
      describe("without callback", function(){
        it("saves default obj to db", function(){
          factory.create({});
          factory.count({}, function(err, num){
            num.should.eql(0);
          });
        });
      });
      describe("without options, callback", function(){
        factory.create();
        factory.count({}, function(err, num){
          num.should.eql(0);
        });
      });
    });
  });
});
