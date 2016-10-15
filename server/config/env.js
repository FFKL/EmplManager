var env = require('../../env.json');

exports.config = () => {
    var node_env = process.env.NODE_ENV || 'development';
    return env[node_env];
};