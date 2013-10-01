/**
 * @fileoverview Tests for string manipulation functions.
 */

goog.require('spf.string');


describe('spf.string', function() {

  it('contains', function() {
    // Character matching.
    expect(spf.string.contains('/path?query=arg', '?')).toBe(true);
    expect(spf.string.contains('/path?query=arg', '#')).toBe(false);
    // Substring matching.
    expect(spf.string.contains('/path?query=arg', 'query')).toBe(true);
    expect(spf.string.contains('/path?query=arg', 'hash')).toBe(false);
    // Full matching.
    expect(spf.string.contains('attr="value"', 'attr="value"')).toBe(true);
    expect(spf.string.contains('attr="value"', 'attr="other"')).toBe(false);
  });

  it('startsWith', function() {
    // Character matching.
    expect(spf.string.startsWith('?query=arg', '?')).toBe(true);
    expect(spf.string.startsWith('?query=arg', '#')).toBe(false);
    // Substring matching.
    expect(spf.string.startsWith('?query=arg', '?query')).toBe(true);
    expect(spf.string.startsWith('?query=arg', '?other')).toBe(false);
    // Full matching.
    expect(spf.string.startsWith('attr="value"', 'attr="value"')).toBe(true);
    expect(spf.string.startsWith('attr="value"', 'attr="other"')).toBe(false);
  });

  it('endsWith', function() {
    // Character matching.
    expect(spf.string.endsWith('file.js', 's')).toBe(true);
    expect(spf.string.endsWith('file.js', 't')).toBe(false);
    // Substring matching.
    expect(spf.string.endsWith('file.js', '.js')).toBe(true);
    expect(spf.string.endsWith('file.js', '.txt')).toBe(false);
    // Substring matching.
    expect(spf.string.endsWith('file.js', 'file.js')).toBe(true);
    expect(spf.string.endsWith('file.js', 'file.txt')).toBe(false);
  });

  it('hashCode', function() {
    expect(function() {spf.string.hashCode(null)}).toThrow();
    expect(spf.string.hashCode('')).toEqual(0);
    expect(spf.string.hashCode('foo')).toEqual(101574);
    expect(spf.string.hashCode('\uAAAAfoo')).toEqual(1301670364);
    var repeat = function(n, s) { return (new Array(n + 1)).join(s); };
    expect(spf.string.hashCode(repeat(5, 'a'))).toEqual(92567585);
    expect(spf.string.hashCode(repeat(6, 'a'))).toEqual(2869595232);
    expect(spf.string.hashCode(repeat(7, 'a'))).toEqual(3058106369);
    expect(spf.string.hashCode(repeat(8, 'a'))).toEqual(312017024);
    expect(spf.string.hashCode(repeat(1024, 'a'))).toEqual(2929737728);
  });

  it('toSelectorCase', function() {
    expect(spf.string.toSelectorCase('OneTwoThree')).toEqual('-one-two-three');
    expect(spf.string.toSelectorCase('oneTwoThree')).toEqual('one-two-three');
    expect(spf.string.toSelectorCase('oneTwo')).toEqual('one-two');
    expect(spf.string.toSelectorCase('one')).toEqual('one');
    expect(spf.string.toSelectorCase('one-two')).toEqual('one-two');
    // String object function name.
    expect(spf.string.toSelectorCase('toString')).toEqual('to-string');
  });

});