/* global describe it */

'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _distErrorServerWithPolyfill = require('../../dist/error.server.with-polyfill');

var _distErrorServerWithPolyfill2 = _interopRequireDefault(_distErrorServerWithPolyfill);

var _havanaEvent = require('havana-event');

var _havanaEvent2 = _interopRequireDefault(_havanaEvent);

var expect = _chai2['default'].expect;

var event = new _havanaEvent2['default']();

var error = new _distErrorServerWithPolyfill2['default']({
  'event': event,
  'reporting': {
    'level': 0,
    'reporter': console.log
  }
});

describe('Error', function () {
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

  describe('name', function () {
    it('should be private', function () {
      expect(error).to.not.have.property('name');
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

    it('should send a name of error', function (done) {
      var token = event.subscribe('response.send', function (data) {
        event.unsubscribe(token);
        expect(data.name).to.equal('error');
        done();
      });

      event.publish('response.error', {
        'id': 1
      });
    });

    it('should send a statusCode of 404', function (done) {
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