var match = function(needle, haystack) {
    var lastWhitespace = 0;
    var result = [];
    haystack.split("").forEach(function(hayChar, hayCharIndex) {
        needle.split("").some(function(needleChar, needleCharIndex) {
            if(!result[needleCharIndex]) { result[needleCharIndex] = [] }

            if(hayChar == ' ') {
                lastWhitespace = hayCharIndex;
                return true;
            }

            if(needleChar.toLowerCase() == hayChar.toLowerCase()) {
                if(needleCharIndex == 0) {
                    var score = (lastWhitespace == hayCharIndex - 1) ? 2 : 1;
                    result[needleCharIndex].push({positions: [hayCharIndex], score: score});
                } else {
                    result[needleCharIndex-1].forEach(function(possibility) {
                        positions = possibility.positions;
                        if(positions[positions.length-1] != hayCharIndex) {
                            var score = possibility.score + 1;
                            if(positions[positions.length-1] == (hayCharIndex - 1)) {
                                score += 1;
                            } else if(lastWhitespace == (hayCharIndex - 1)) {
                                score += 1;
                            }

                            if(needleCharIndex == needle.length - 1 && ((positions[positions.length-1] - positions[0]) == (needle.length - 2))) {
                              if(haystack[hayCharIndex + 1] == ' ') {
                                score += 1.5
                              }
                            }
                            result[needleCharIndex].push({positions: positions.concat(hayCharIndex), score: score});
                        }
                    });
                    // First time match, do not check further needles
                    if(result[needleCharIndex-1].length == result[needleCharIndex].length) {
                        return true;
                    }
                }
            } else if(result[needleCharIndex].length == 0) {
                return true;
            }
        });
    });

    result[needle.length-1].sort(function(a, b) { return b.score - a.score; });

    return result[needle.length-1];
}

exports.match = match;
