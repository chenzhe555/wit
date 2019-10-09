const minimist = require('minimist');

/**
 * 命令行参数
 * env: 当前环境
 */
const params = minimist(process.argv.slice(2), {
    'string': ['env'],
    'boolean': ['watch'],
    'default': {
        'env': process.env.NODE_ENV || 'production'
    }
});

module.exports = params;