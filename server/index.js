var koa = require('koa');
var app = new koa();
var config = require('config');
var koaBody = require('koa-body');
var path = require('path')
var apiProxyMiddleware = require('./middlewares/apiProxy');
var assetProxyMiddleware = require('./middlewares/assetProxy');
var controllers = require('./controllers');
var context = require('./context');


app.use(koaBody({
    patchKoa: true
}));


app.use(async (ctx, next) => {
    console.log(ctx.path);
    if (!ctx.request.body) {ctx.request.body = {}}
    await next();
});

context(app);
app.use(apiProxyMiddleware);
controllers(app);
app.use(assetProxyMiddleware.asset);


app.use(assetProxyMiddleware.index);
app.listen(config.port);
console.log('已经启动监听端口： ' + config.port);



