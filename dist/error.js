'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _ = new WeakMap();

var Error = (function () {
  function Error(config) {
    _classCallCheck(this, Error);

    var props = {
      'event': config.event,
      'name': 'error',
      'reporting': config.reporting
    };

    _.set(this, props);

    this.init();
  }

  _createClass(Error, [{
    key: 'init',
    value: function init() {
      var event = _.get(this).event;
      var name = _.get(this).name;
      var reporting = _.get(this).reporting;

      event.subscribe('response.error', function (data) {
        if (reporting.level > 0) {
          reporting.reporter('-- Response sent from handler: error');
        }

        event.publish('response.send', {
          'name': name,
          'id': data.id,
          'time': Date.now(),
          'statusCode': 404
        });
      });
    }
  }]);

  return Error;
})();

exports['default'] = Error;
module.exports = exports['default'];