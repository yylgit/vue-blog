'use strict';

var config = require('config');
var url = require('url');
var proxyKoa = require('../utils/proxy');
var apiPrefix = config.apiPrefix;
var apiConfig = config.apiConfig;
const convert = require('koa-convert');

function defaultMapFunc(path) {
    return path;
}

module.exports = async (ctx, next) => {
    var reqPath = ctx.path;
    var paths = Object.keys(apiConfig);
    var targetUrl = '', map = defaultMapFunc;

    if (ctx.path.indexOf(apiPrefix) !== 0) {
        await next();
    }
    else {
        for (var i = 0; i < paths.length; i++) {
            if (reqPath.indexOf(apiPrefix + paths[i]) === 0) {
                if (typeof apiConfig[paths[i]].map === 'function') {
                    map = apiConfig[paths[i]].map
                }
                targetUrl = map(reqPath);
                targetUrl = url.resolve(apiConfig[paths[i]].url, targetUrl);
                console.log(ctx.path+" => "+targetUrl);
                return await convert(proxyKoa({
                    host: apiConfig[paths[i]].url,
                    map: apiConfig[paths[i]].map || defaultMapFunc
                })).call(ctx, ctx, next);
            }
        }
        await next();
    }
};
