/* global describe it */

'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _distErrorWithPolyfill = require('../../dist/error.with-polyfill');

var _distErrorWithPolyfill2 = _interopRequireDefault(_distErrorWithPolyfill);

var _havanaEvent = require('havana-event');

var _havanaEvent2 = _interopRequireDefault(_havanaEvent);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var expect = _chai2['default'].expect;

var event = new _havanaEvent2['default']();

var error = new _distErrorWithPolyfill2['default']({
  'event': event,
  'reporting': {
    'level': 0,
    'reporter': console.log
  }
});

describe('Server', function () {
  describe('_', function () {
    it('should be private', function () {
      expect(error).to.not.have.property('_');
    });
  });

  describe('event', function () {
    it('should be private', function () {
      expect(error).to.not.have.property('event');
    });
  });

  describe('reporting', function () {
    it('should be private', function () {
      expect(error).to.not.have.property('reporting');
    });
  });

  describe('response.send', function () {
    it('should be published when a response.error event is received', function (done) {
      var token = event.subscribe('response.send', function () {
        event.unsubscribe(token);
        done();
      });

      event.publish('response.error', {});
    });

    it('should send a 404 status code', function (done) {
      var token = event.subscribe('response.send', function (data) {
        event.unsubscribe(token);
        expect(data.statusCode).to.equal(404);
        done();
      });

      event.publish('response.error', {
        'id': 1
      });
    });
  });
});