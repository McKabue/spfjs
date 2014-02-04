/**
 * @fileoverview Tests for URL manipulation functions.
 */

goog.require('spf.config');
goog.require('spf.url');


describe('spf.url', function() {

  afterEach(function() {
    spf.config.clear();
  });


  describe('identify', function() {

    it('no identifier', function() {
      spf.config.set('url-identifier', null);
      var url = '/page';
      expect(spf.url.identify(url)).toEqual('/page');
      expect(spf.url.identify(url, 'test')).toEqual('/page');
    });

    it('static identifier', function() {
      spf.config.set('url-identifier', '.spf.json');
      var url = '/page.html';
      expect(spf.url.identify(url)).toEqual('/page.html.spf.json');
      expect(spf.url.identify(url, 'test')).toEqual('/page.html.spf.json');
    });

    it('dynamic identifier', function() {
      spf.config.set('url-identifier', '?spf=__type__');
      var url = '/page';
      expect(spf.url.identify(url)).toEqual('/page?spf=');
      expect(spf.url.identify(url, 'test')).toEqual('/page?spf=test');
      url = '/page?arg=1';
      expect(spf.url.identify(url)).toEqual('/page?arg=1&spf=');
      expect(spf.url.identify(url, 'test')).toEqual('/page?arg=1&spf=test');
    });

  });


  describe('unprotocol', function() {

    it('absolute', function() {
      // HTTP.
      var url = 'http://domain/path/';
      expect(spf.url.unprotocol(url)).toEqual('//domain/path/');
      // HTTP with extra slashes in path.
      url = 'http://domain//path/';
      expect(spf.url.unprotocol(url)).toEqual('//domain//path/');
      // HTTPS.
      url = 'https://domain/path/';
      expect(spf.url.unprotocol(url)).toEqual('//domain/path/');
      // HTTPS with .. path component.
      url = 'https://domain/path/../';
      expect(spf.url.unprotocol(url)).toEqual('//domain/path/../');
      // Local files.
      url = 'file://domain/path/';
      expect(spf.url.unprotocol(url)).toEqual('//domain/path/');
      // Future-proofing.
      url = 'unknown://domain/path/';
      expect(spf.url.unprotocol(url)).toEqual('//domain/path/');
      // Don't touch weird things.
      url = 'malformed:path////file';
      expect(spf.url.unprotocol(url)).toEqual('malformed:path////file');
      // Still don't touch weird things.
      url = 'path/a/http://domain/path/b/';
      expect(spf.url.unprotocol(url)).toEqual('path/a/http://domain/path/b/');
    });

    it('protocol-relative', function() {
      var url = '//domain/path/file.ext';
      expect(spf.url.unprotocol(url)).toEqual('//domain/path/file.ext');
    });

    it('document-relative', function() {
      var url = '/path/file.ext';
      expect(spf.url.unprotocol(url)).toEqual('/path/file.ext');
    });

  });


  describe('unfragment', function() {

    it('no fragment', function() {
      var url = '/page';
      expect(spf.url.unfragment(url)).toEqual('/page');
    });

    it('empty fragment', function() {
      var url = '/page#';
      expect(spf.url.unfragment(url)).toEqual('/page');
    });

    it('fragment', function() {
      var url = '/page#frag';
      expect(spf.url.unfragment(url)).toEqual('/page');
    });

  });


});