createStrg = function(length) {
  var chars, i, randomstring, rnum;
  chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  randomstring = "";
  i = 0;
  while (i < length) {
    rnum = Math.floor(Math.random() * chars.length);
    randomstring += chars.substring(rnum, rnum + 1);
    i++;
  }
  return randomstring;
};

function strgMethods (value, sequence) {
  this.value = value;
  this.sequence = sequence || 0;
} 

strgMethods.prototype.seq = function () {
  if ('string' == typeof this.value && this.value.match(/\$seq/)) {
    this.value = this.value.replace('$seq', this.sequence);
  }
  return this;
}

strgMethods.prototype.intv = function () {
  var isIntv, intv;
  regExp = /\$intv\(([^)]+)\)/;
  if ('string' == typeof this.value && this.value.match(regExp)) {
    intv = regExp.exec(this.value)[1];
    this.value = this.value.replace('$intv('+intv+')', this.sequence*intv);
  }
  return this;
}

strgMethods.prototype.len = function () {
  var length, regExp;
  regExp = /\$len\(([^)]+)\)/;
  if ('string' == typeof this.value && this.value.match(regExp)) {
    length = regExp.exec(this.value)[1];
    this.value = this.value.replace('$len('+length+')', createStrg(length));
  }
  return this;
}

strgMethods.prototype.all = function () {
  return this.intv().seq().len().value;
}

module.exports = strgMethods;
