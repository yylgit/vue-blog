'use strict';
var glob = require('glob');

module.exports = function (dir) {
    return glob.sync('**/*.js', {
        cwd: dir,
        nodir: true,
        ignore: 'index.js',
        realpath: true
    });
};