# HTTP DB Client

This is a client for [http-db](https://github.com/JerrySievert/http-db).

## Usage

```js
var Client = require('http-db-client');

var db = new Client(url, token);
```


---

## Client


<a name="Client"><h3>
Client.Client(host, token) </h3></a>
-----------------------------
HTTP DB Client

_Usage:_
```
var Client = require('http-db-client');

var db = new Client(host, token);
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| **host** | _String_ | HTTP host and port ex. http://localhost:8765 |
| **token** | _String_ | JWT Token |


<a name="get"><h3>
Client.get(store, key, callback) </h3></a>
-----------------------------
Retrieves a value from a Store

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| **store** | _String_ | Store to retrieve from |
| **key** | _String_ | Key to retrieve |
| **callback** | _function_ | Callback function to execute |


<a name="put"><h3>
Client.put(store, key, value, callback) </h3></a>
-----------------------------
Puts a value to a key in a Store

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| **store** | _String_ | Store to put to |
| **key** | _String_ | Key to put |
| **value** | _Object_ | Value to put |
| **callback** | _function_ | Callback function to execute |


<a name="del"><h3>
Client.del(store, key, callback) </h3></a>
-----------------------------
Deletes a value from a Store

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| **store** | _String_ | Store to delete from |
| **key** | _String_ | Key to delete |
| **callback** | _function_ | Callback function to execute |


<a name="keys"><h3>
Client.keys(store, callback) </h3></a>
-----------------------------
Retrieves all keys from a Store

Keys are returned as an Array of `keys`.

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| **store** | _String_ | Store to retrieve from |
| **callback** | _function_ | Callback function to execute |


<a name="filter"><h3>
Client.filter(store, key, value, callback) </h3></a>
-----------------------------
Retrieves all keys and values from a Store that match the filter

Keys and values are returned as an Array of Objects containing `key` and `value`.

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| **store** | _String_ | Store to retrieve from |
| **key** | _String_ | Key to filter on |
| **value** | _String_ | Value to filter on |
| **callback** | _function_ | Callback function to execute |


<a name="query"><h3>
Client.query(store, query, callback) </h3></a>
-----------------------------
Retrieves all keys and values from a Store that match query

Keys and values are returned as an Array of Objects containing `key` and `value`.

_Example:_
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

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| **store** | _String_ | Store to retrieve from |
| **query** | _Object_ | Query to execute |
| **callback** | _function_ | Callback function to execute |


<a name="all"><h3>
Client.all(store, callback) </h3></a>
-----------------------------
Retrieves all keys and values from a Store

Keys and values are returned as an Array of Objects containing `key` and `value`.

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| **store** | _String_ | Store to retrieve from |
| **callback** | _function_ | Callback function to execute |




---

*Author:* Jerry Sievert code@legitimatesounding.com
*(c) 2014 Jerry Sievert*


**License:** ISC


