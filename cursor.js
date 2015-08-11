// Copyright 2015 James Schwartz
// Licensed under the MIT License

var Cursor = function(string, index) {
  this.index = index || 0;
  this.string = string;
  this.length = string.length;
  this.character = this.string[this.index];
  this.is = this;
}

Cursor.prototype.reset = function(index) {
  this.index = index || 0;
  this.character = this.string[this.index];
}

Cursor.prototype.advance = function(stride) {
  var stride = stride || 1;
  this.index += stride;
  this.character = this.string[this.index];
  return this.character;
}

Cursor.prototype.next = function() {
  return new Cursor(this.string, this.index + 1);
}

Cursor.prototype.nextCharacter = function() {
  return this.string[this.index + 1];
}

Cursor.prototype.firstCharacter = function() {
  return this.index == 0;
}

Cursor.prototype.lastCharacter = function() {
  return this.index == (this.length - 1);
}

Cursor.prototype.whiteSpace = function() {
  return /\s/.test(this.character);
};

Cursor.prototype.punctuation = function () {
  return /[,.;:]/.test(this.character)
}

Cursor.prototype.wordBoundary = function() {
  return this.whiteSpace() || this.punctuation();
}

module.exports = Cursor;
