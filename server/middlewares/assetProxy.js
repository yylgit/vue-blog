'use strict';

var config = require('config');
var koaStatic = require('koa-static');
var send = require('koa-send');

exports.asset = async (ctx, next) => {
    var maxage = 365 * 24 * 60 * 60 * 1000; // 一年
    var reqPath = ctx.path;

    if (/.*\.html$/.test(reqPath)) {
        maxage = 0;
    }

    //koa-static 去处理没有找到文件时执行await next
    await koaStatic(config.assetDirAbsolute, {
        maxage,
        index: "none.html"
    }).call(ctx, ctx, next);

};



exports.index = async (ctx, next) => {
    await send(ctx, 'index.html', {
        root: config.assetDirAbsolute
    });
};

