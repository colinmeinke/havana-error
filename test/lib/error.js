/* global describe it */

import Error from '../../dist/error.with-polyfill';
import Event from 'havana-event';
import chai from 'chai';

const expect = chai.expect;

const event = new Event();

const error = new Error({
  'event': event,
  'reporting': {
    'level': 0,
    'reporter': console.log,
  },
});

describe( 'Server', () => {
  describe( '_', () => {
    it( 'should be private', () => {
      expect( error ).to.not.have.property( '_' );
    });
  });

  describe( 'event', () => {
    it( 'should be private', () => {
      expect( error ).to.not.have.property( 'event' );
    });
  });

  describe( 'reporting', () => {
    it( 'should be private', () => {
      expect( error ).to.not.have.property( 'reporting' );
    });
  });

  describe( 'response.send', () => {
    it( 'should be published when a response.error event is received', done => {
      const token = event.subscribe( 'response.send', () => {
        event.unsubscribe( token );
        done();
      });

      event.publish( 'response.error', {});
    });

    it( 'should send a 404 status code', done => {
      const token = event.subscribe( 'response.send', data => {
        event.unsubscribe( token );
        expect( data.statusCode ).to.equal( 404 );
        done();
      });

      event.publish( 'response.error', {
        'id': 1,
      });
    });
  });
});
