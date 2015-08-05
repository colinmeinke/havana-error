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
    const event = _.get( this ).event;
    const name = _.get( this ).name;
    const reporting = _.get( this ).reporting;

    event.subscribe( 'response.error', ( data ) => {
      if ( reporting.level > 0 ) {
        reporting.reporter( '-- No response. Error response sent' );
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
