// Copyright 2015 James Schwartz
// Licensed under the MIT License

var Cursor = require('./cursor.js');

var match = function(needleString, haystackString) {
    var lastWhitespace = 0;
    var result = [];

    var haystack = new Cursor(haystackString);
    var needle = new Cursor(needleString);

    do {
        do {
            if(!result[needle.index]) { result[needle.index] = [] }

            if(haystack.is.whiteSpace()) {
                lastWhitespace = haystack.index;
                continue;
            }

            if(needle.character.toLowerCase() == haystack.character.toLowerCase()) {
                if(needle.is.firstCharacter()) {
                    var score = (lastWhitespace == haystack.index - 1) ? 2 : 1;
                    result[needle.index].push({positions: [haystack.index], score: score});
                } else {
                    result[needle.index-1].forEach(function(possibility) {
                        var positions = possibility.positions;
                        if(positions[positions.length-1] != haystack.index) {
                            var score = possibility.score + 1;
                            if(positions[positions.length-1] == (haystack.index - 1)) {
                                score += 1;
                            } else if(lastWhitespace == (haystack.index - 1)) {
                                score += 1;
                            }

                            if(needle.is.lastCharacter() && ((haystack.index - positions[0]) == (needle.length - 1))) {
                              if(haystack.next().is.wordBoundary() || haystack.is.lastCharacter()) {
                                score += 1.5;
                              }
                            }
                            result[needle.index].push({positions: positions.concat(haystack.index), score: score});
                        }
                    });
                    // First time match, do not check further needles
                    if(result[needle.index-1].length == result[needle.index].length) {
                        continue;
                    }
                }
            } else if(result[needle.index].length == 0) {
                continue;
            }
        } while(needle.advance());
        needle.reset();
    } while(haystack.advance());

    result[needle.length-1].sort(function(a, b) { return b.score - a.score; });

    return result[needle.length-1];
}

exports.match = match;
