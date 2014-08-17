var request = require('request');

function Client (host, token) {
  this.host = host;
  this.token = token;
}

Client.prototype.get = function (store, key, callback) {
  request.get(this.host + '/data/' + store + '/' + key, {
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

Client.prototype.put = function (store, key, value, callback) {
  if (typeof value !== 'object') {
    return callback('Unable to encode value, it must be an Object');
  }

  var body = JSON.stringify(value);

  request({
    url: this.host + '/data/' + store + '/' + key,
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

Client.prototype.del = function (store, key, callback) {
  request({
    url: this.host + '/data/' + store + '/' + key,
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

Client.prototype.keys = function (store, callback) {
  request.get(this.host + '/data/' + store, {
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
    } catch(err) {
      callback('Unable to decode data from server');
    }
  });
};

Client.prototype.filter = function (store, key, value, callback) {
  request.get(this.host + '/filter/' + store + '?key=' + key + '&value=' + value, {
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

Client.prototype.all = function (store, callback) {
  request.get(this.host + '/all/' + store, {
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
