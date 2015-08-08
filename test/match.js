var sir = require('../sir-fuzzy.js');

var chai = require("chai").should();

var assert = require("assert")
describe('match', function() {
  describe('when searching for \'small\'', function() {
    it('should return \'In Portsmouth, all is [small]\'', function () {
      var result = sir.match('small', 'In Portsmouth, all is small');
      result[0].positions.should.deep.equal([22, 23, 24, 25, 26]);
    });
  });
});
