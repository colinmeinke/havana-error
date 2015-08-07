const _ = new WeakMap();

class Error {
  constructor ( config ) {
    const props = {
      'event': config.event,
      'name': 'error',
      'reporting': config.reporting,
    };

    _.set( this, props );

    this.init();
  }

  init () {
    const { event, name, reporting } = _.get( this );

    event.subscribe( 'response.error', ( data ) => {
      if ( reporting.level > 0 ) {
        reporting.reporter( '-- Response sent from handler: error' );
      }

      event.publish( 'response.send', {
        'name': name,
        'id': data.id,
        'time': Date.now(),
        'statusCode': 404,
      });
    });
  }
}

export default Error;
