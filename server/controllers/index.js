var getJsFiles = require('../utils/getJsFiles');
var Router = require('koa-router');

var controllerFiles = getJsFiles(__dirname);

module.exports = function (app) {
    var router = new Router();
    controllerFiles.forEach(function (file) {
        var controller = require(file);
        if (!(controller instanceof Array)) {
            controller = [controller];
        }
        controller.forEach(function (item) {
            var method = item.method || ['get', 'post'];

            if (typeof method === 'string') {
                method = [method];
            }

            method.forEach(function (verb) {
                router[verb](item.path, item.controller);
            });
        });
    });

    app.use(router.routes());
    app.use(router.allowedMethods());
};
