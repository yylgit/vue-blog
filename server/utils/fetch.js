'use strict';

var querystring = require('querystring');
var fetch = require('node-fetch');
module.exports = function (url, options) {
    if (!options) {
        options = {};
    }

    let type = options.type || 'json';
    let method = options.method || 'get';

    if (!options.headers) {
        options.headers = {};
    }

    if (options.body && method.toLowerCase() === 'post') {
        if (type === 'json') {
            options.body = JSON.stringify(options.body);
            options.headers['Content-Type'] = 'application/json;';
        } else if (type === 'form') {
            options.body = querystring.stringify(options.body);
            options.headers['Content-Type'] = 'application/x-www-form-urlencoded;';
        }
    }
    
    return fetch(url, options)
        .catch(function (err) {
            console.error(err);
            throw err;
        }).then(function (res) {
            if (res.ok) {
                let result = res.json()
                result.then(data=>{
                return result;
                });
            }
        });
}