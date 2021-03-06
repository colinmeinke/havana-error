# Havana error

[![NPM version](https://badge.fury.io/js/havana-error.svg)](http://badge.fury.io/js/havana-error)
[![Build Status](https://travis-ci.org/colinmeinke/havana-error.svg?branch=master)](https://travis-ci.org/colinmeinke/havana-error)
[![Dependency status](https://david-dm.org/colinmeinke/havana-error.svg)](https://david-dm.org/colinmeinke/havana-error.svg)

An error response handler.

Havana error works with a request/response dispatcher such as
[Havana server](https://github.com/colinmeinke/havana-server),
[Havana browser](https://github.com/colinmeinke/havana-browser)
or a library with an interchangeable API. When a dispatcher
publishes a `response.error` event, Havana error will in turn
publish a `response.send` event with a 404 response.

## How to install

```
npm install havana-error
```

## How to use

```javascript
import Error from 'havana-error';
import Event from 'havana-event';
import Server from 'havana-server';

const event = new Event();

const reporting = {
  'level': 2, 
  'reporter': console.log,
};

const server = new Server({
  'event': event,
  'reporting': reporting,
});

new Error({
  'event': event,
  'reporting': reporting,
});

server.listen( 3000 );
```

## Event list

Events take the form of
[Havana event](https://github.com/colinmeinke/havana-event)
or a library with an interchangeable API.

### Publish

- `response.send`: Signifies that Havana error has handled
  a response error, publishing the response data for
  consumption by a request/response dispatcher.

### Subscribe

- `response.error`: Allows a request/response dispatcher
  to notify Havana error that all registered handlers have
  failed to handled a request.

## ES2015+

Havana error is written using ES2015+ syntax.

However, by default this module will use an ES5
compatible file that has been compiled using
[Babel](https://babeljs.io).

In the `dist` directory there are four files, the default
is `error.server.js`. The default when using a client-side
bundler that supports the
[browser field](https://gist.github.com/defunctzombie/4339901)
spec is `error.browser.js`.

Havana error currently requires the 
[Babel polyfill](https://babeljs.io/docs/usage/polyfill).
You are expected to supply this yourself. However, as a
courtesy you will also find `error.server.with-polyfill.js`
and `error.browser.with-polyfill.js` in the `dist`
directory.
