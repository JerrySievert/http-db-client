var request = require('request');

/**
 * @author Jerry Sievert code@legitimatesounding.com
 * @copyright (c) 2014 Jerry Sievert
 * @license ISC
 * @overview
# HTTP DB Client

This is a client for [http-db](https://github.com/JerrySievert/http-db).

## Usage

```js
var Client = require('http-db-client');

var db = new Client(url, token);
```

 */


/**
 * HTTP DB Client
 *
 * _Usage:_
```
var Client = require('http-db-client');

var db = new Client(host, token);
```
 * @param host {String} HTTP host and port ex. http://localhost:8765
 * @param token {String} JWT Token
 * @function Client
 */
function Client (host, token) {
  this.host = host;
  this.token = token;
}

/**
 * @class Client
 */

/**
 * Retrieves a value from a Store
 *
 * @method get
 * @param store {String} Store to retrieve from
 * @param key {String} Key to retrieve
 * @param callback {Function} Callback function to execute
 */
Client.prototype.get = function (store, key, callback) {
  request.get(this.host + '/database/value/' + store + '/' + key, {
    auth: {
      bearer: this.token
    }
  }, function (err, reply, body) {
    if (err) {
      return callback(err);
    }

    if (body === '') {
      return callback();
    }

    try {
      var returned = JSON.parse(body);
      callback(null, returned);
    } catch (err) {
      callback('Unable to decode data from server');
    }
  });
};

/**
 * Puts a value to a key in a Store
 *
 * @method put
 * @param store {String} Store to put to
 * @param key {String} Key to put
 * @param value {Object} Value to put
 * @param callback {Function} Callback function to execute
 */

Client.prototype.put = function (store, key, value, callback) {
  if (typeof value !== 'object') {
    return callback('Unable to encode value, it must be an Object');
  }

  var body = JSON.stringify(value);

  request({
    url: this.host + '/database/value/' + store + '/' + key,
    auth: {
      bearer: this.token
    },
    json: true,
    method: 'POST',
    body: body
  }, function (err, reply, body) {
    if (err) {
      callback(err);
    } else if (body.status !== 'ok') {
      callback(body.status);
    } else {
      callback();
    }
  });
};

/**
 * Deletes a value from a Store
 *
 * @method del
 * @param store {String} Store to delete from
 * @param key {String} Key to delete
 * @param callback {Function} Callback function to execute
 */
Client.prototype.del = function (store, key, callback) {
  request({
    url: this.host + '/database/value/' + store + '/' + key,
    auth: {
      bearer: this.token
    },
    method: 'DELETE'
  }, function (err, reply, body) {
    if (err) {
      callback(err);
    } else if (body.status !== 'ok') {
      callback(body.status);
    } else {
      callback();
    }
  });
};

/**
 * Retrieves all keys from a Store
 *
 * Keys are returned as an Array of `keys`.
 *
 * @method keys
 * @param store {String} Store to retrieve from
 * @param callback {Function} Callback function to execute
 */
Client.prototype.keys = function (store, callback) {
  request.get(this.host + '/database/keys/' + store, {
    auth: {
      bearer: this.token
    }
  }, function (err, reply, body) {
    if (err) {
      return callback(err);
    }

    if (body === '') {
      return callback();
    }

    try {
      var returned = JSON.parse(body);
      callback(null, returned.keys);
    } catch(err) {
      callback('Unable to decode data from server');
    }
  });
};

/**
 * Retrieves all keys and values from a Store that match the filter
 *
 * Keys and values are returned as an Array of Objects containing `key` and `value`.
 *
 * @method filter
 * @param store {String} Store to retrieve from
 * @param key {String} Key to filter on
 * @param value {String} Value to filter on
 * @param callback {Function} Callback function to execute
 */
Client.prototype.filter = function (store, key, value, callback) {
  request.get(this.host + '/database/filter/' + store + '?key=' + key + '&value=' + value, {
    auth: {
      bearer: this.token
    }
  }, function (err, reply, body) {
    if (err) {
      return callback(err);
    }

    if (body === '') {
      return callback();
    }

    var parts = body.split("\n");
    var data = [ ];

    for (var i = 0; i < parts.length; i++) {
      try {
        var returned = JSON.parse(parts[i]);
        data.push({
          key: returned.key,
          value: JSON.parse(returned.value)
        });
      } catch (err) {
      }
    }

    callback(null, data);
  });
};

/**
 * Retrieves all keys and values from a Store that match query
 *
 * Keys and values are returned as an Array of Objects containing `key` and `value`.
 *
 * _Example:_
```
db.query(
  store,
  {
    "$and": [
      {
        "$or": [
          {
            "name": {
              "equals": "Main"
            }
          },
          {
            "crime.type": {
              "equals": "Arson"
            }
          }
        ]
      },
      {
        "date": {
          "between": [ '2013-11-30', '2014-01-01' ]
        }
      }
    ]
  },
  callback
);
```
 * @method query
 * @param store {String} Store to retrieve from
 * @param query {Object} Query to execute
 * @param callback {Function} Callback function to execute
 */
Client.prototype.query = function (store, search, callback) {
  if (typeof search !== 'object') {
    return callback('Unable to encode search query, it must be an Object');
  }

  var body = JSON.stringify(search);

  request({
    url: this.host + '/database/query/' + store,
    auth: {
      bearer: this.token
    },
    json: true,
    method: 'POST',
    body: body
  }, function (err, reply, body) {
    if (err) {
      callback(err);
    } else if (body.status !== 'ok') {
      callback(body.status);
    } else {
      callback();
    }
  });
};

/**
 * Retrieves all keys and values from a Store
 *
 * Keys and values are returned as an Array of Objects containing `key` and `value`.
 *
 * @method all
 * @param store {String} Store to retrieve from
 * @param callback {Function} Callback function to execute
 */
Client.prototype.all = function (store, callback) {
  request.get(this.host + '/database/all/' + store, {
    auth: {
      bearer: this.token
    }
  }, function (err, reply, body) {
    if (err) {
      return callback(err);
    }

    if (body === '') {
      return callback();
    }

    var parts = body.split("\n");
    var data = [ ];

    for (var i = 0; i < parts.length; i++) {
      try {
        var returned = JSON.parse(parts[i]);
        data.push({
          key: returned.key,
          value: JSON.parse(returned.value)
        });
      } catch (err) {
      }
    }

    callback(null, data);
  });
};

exports = module.exports = Client;
