module.exports = function (data, code, msg) {
    this.body = {
        code: code || 0,
        msg: msg || '',
        data: data || null,
        isNodeServer: true
    };
}