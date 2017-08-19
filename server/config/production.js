var path = require('path')
var defaultProjectRoot = path.resolve(__dirname,'../../../');
var ip = require('ip');

const ipAddress = ip.address();
const staticPort = 8040;
const prefix = 'overrall';
module.exports = {
  port: 8061,
  assetDirAbsolute: path.resolve(__dirname, '../../dist'),
 
}
