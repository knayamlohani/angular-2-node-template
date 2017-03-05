/**
 * Created by mayanklohani on 05/03/17.
 */

var nodemonConfig = {
    script: './bin/www',
    ext: 'js html css',
    args: ['--debug'],
    verbose: true,
    env: { 'NODE_ENV': 'development' }
};

module.exports = nodemonConfig;