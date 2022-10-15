var strgMethods;

strgMethods = require("../index.js");

describe("strgMethods", function() {
  it("$len", function() {
    var Strg;
    Strg = new strgMethods("xx$len(32)");
    Strg.len().value.length.should.be.equal(34);
  });
  it("$seq", function() {
    var Strg;
    Strg = new strgMethods("22$seqnanan", 1);
    Strg.seq().value.should.be.equal("221nanan");
    Strg = new strgMethods("22$seqnanan", 39);
    Strg.seq().value.should.be.equal("2239nanan");
  });
  it("$intv", function() {
    var Strg;
    Strg = new strgMethods("$intv(2)", 40);
    Strg.intv().value.should.be.equal("80");
    Strg = new strgMethods("22$intv(2)nanan", 40);
    Strg.intv().value.should.be.equal("2280nanan");
  });
});