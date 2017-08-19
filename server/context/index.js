var path = require('path');
var getJsFiles = require('../utils/getJsFiles');

var contextFiles = getJsFiles(__dirname);

module.exports = function (app) {
    app.use(async (ctx, next) => {

        contextFiles.forEach(function (file) {
            var context = require(file);
            var basename = path.basename(file, '.js');
            ctx[basename] = context.bind(ctx);
        });

        await next();
    });
};
