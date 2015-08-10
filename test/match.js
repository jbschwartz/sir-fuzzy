var sir = require('../sir-fuzzy.js');

var chai = require("chai").should();

var assert = require("assert")
describe('match', function() {
  describe('when searching for \'small\'', function() {
    it('should return \'In Portsmouth, all is [small]\'', function () {
      var result = sir.match('small', 'In Portsmouth, all is small');
      result[0].positions.should.deep.equal([22, 23, 24, 25, 26]);
    });
    it('should return \'Smallest [Small] Smaller\'', function () {
      var result = sir.match('small', 'Smallest Small Smaller');
      result[0].positions.should.deep.equal([9, 10, 11, 12, 13]);
    });
    it('should return \'Smallest [Small], Smaller\'', function () {
      var result = sir.match('small', 'Smallest Small, Smaller');
      result[0].positions.should.deep.equal([9, 10, 11, 12, 13]);
    });
    it('should return \'Smallest Smaller [Small]\'', function () {
      var result = sir.match('small', 'Smallest Smaller Small');
      result[0].positions.should.deep.equal([17, 18, 19, 20, 21]);
    });
  })
});
