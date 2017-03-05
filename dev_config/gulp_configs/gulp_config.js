/**
 * Created by mayanklohani on 03/03/17.
 */

var path = require('path');

var gulpConfig = {
    'server': {
        'compileCoffeeToJS': {
            'src' : path.join(__dirname, '/../../server/src/**/*.coffee'),
            'dest': path.join(__dirname, '/../../server/build/')
        } ,
        'clean': {
            'src': [
                path.join(__dirname, '/../../server/build/')
            ]
        }
    },
    'web': {
        'copyViews': {
            'src' : path.join(__dirname, '/../../web/src/**/*.html'),
            'dest': path.join(__dirname, '/../../web/build/')
        },
        'copyJS': {
            'src' : path.join(__dirname, '/../../web/src/scripts/**/*.js'),
            'dest': path.join(__dirname, '/../../web/build/static/scripts')
        },
        'clean': {
            'src': [
                path.join(__dirname, '/../../web/build/')
            ]
        },
        'compileSassToCss': {
            'src' : path.join(__dirname, '/../../web/src/**/*.sass'),
            'dest': path.join(__dirname, '/../../web/build/static/')
        },
        'compileTSToJS': {
            'src' : path.join(__dirname, '/../../web/src/**/*.ts'),
            'dest': path.join(__dirname, '/../../web/build/static/')
        }
    }

};

module.exports = gulpConfig;