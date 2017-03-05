/**
 * Created by mayanklohani on 03/03/17.
 */

// imports
var gulp           = require('gulp');
var gulpUglify     = require('gulp-uglify');
var del            = require('del');
var gulpCoffee     = require('gulp-coffee');
var gulpSass       = require('gulp-sass');
var gulpTypescript = require('gulp-typescript');
var gulpAutoPrefix = require('gulp-autoprefixer');
var gulpCleanCss   = require('gulp-clean-css');
var rename         = require('gulp-rename');
var nodemon        = require('gulp-nodemon');



// gulp configs
var gulpConfig     = require('./dev_config/gulp_configs/gulp_config');
var tsConfig       = require('./dev_config/gulp_configs/ts_config');
var nodemonConfig  = require('./dev_config/gulp_configs/nodemon_config');

console.log('gulpConfig', JSON.stringify(gulpConfig, null, 2));


gulp.task('monitor', function () {
    nodemon(nodemonConfig)
});




/*
* start of server tasks
* ----------------------------------------------------------------------------------------------------------------------
* */

// deletes server build directory
gulp.task('clean:server', function() {
    return del
        .sync(gulpConfig.server.clean.src);
});

// compiles coffee to js from src to build in server directory
gulp.task('compile-coffee-to-js:server', function(){
    gulp
        .src (gulpConfig.server.compileCoffeeToJS.src)
        .pipe(gulpCoffee({bare: true}))
        .pipe(gulp.dest(gulpConfig.server.compileCoffeeToJS.dest));
});

// watches changes in server directory files and triggers corresponding tasks
gulp.task('server:watch', function(){
    gulp.watch(gulpConfig.server.compileCoffeeToJS.src, ['compile-coffee-to-js:server']);
});

// startup task for server directory files
gulp.task('startup:server', [
        'clean:server',
        'compile-coffee-to-js:server',
        'server:watch'
    ]
);

/*
* end of server tasks
* ----------------------------------------------------------------------------------------------------------------------
* */





/*
* start of web tasks
* ----------------------------------------------------------------------------------------------------------------------
* */


// deletes web build directory
gulp.task('clean:web', function() {
    return del
        .sync(gulpConfig.web.clean.src);
});

// copies views from src to build in web directory
gulp.task('copy-views:web', function(){
    gulp
        .src (gulpConfig.web.copyViews.src)
        .pipe(gulp.dest(gulpConfig.web.copyViews.dest));
});

// compiles sass to css from src to build in web directory
gulp.task('compile-sass-to-css:web', function () {
    return gulp
        .src(gulpConfig.web.compileSassToCss.src)
        .pipe(gulpSass()
            .on('error', gulpSass.logError))
        .pipe(gulpAutoPrefix())
        .pipe(gulpCleanCss())
        // .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest(gulpConfig.web.compileSassToCss.dest));
});

gulp.task('compile-ts-to-js:web', function() {
    return gulp
        .src(gulpConfig.web.compileTSToJS.src)
        .pipe(gulpTypescript(tsConfig))
        // .pipe(gulpUglify())
        // .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest(gulpConfig.web.compileTSToJS.dest));
});


gulp.task('copy-js:web', function() {
    gulp
        .src (gulpConfig.web.copyJS.src)
        .pipe(gulp.dest(gulpConfig.web.copyJS.dest));
});

// watches changes in web directory files and triggers corresponding tasks
gulp.task('web:watch', function () {
    gulp.watch(gulpConfig.web.copyViews.src,        ['copy-views:web']);
    gulp.watch(gulpConfig.web.copyJS.src,          ['copy-js:web']);
    gulp.watch(gulpConfig.web.compileSassToCss.src, ['compile-sass-to-css:web']);
    gulp.watch(gulpConfig.web.compileTSToJS.src,    ['compile-ts-to-js:web']   );
});

// startup task for web directory files
gulp.task('startup:web', [
        'clean:web',
        'copy-views:web',
        'copy-js:web',
        'compile-sass-to-css:web',
        'compile-ts-to-js:web',
        'web:watch'
    ]
);


/*
* end of web tasks
* ----------------------------------------------------------------------------------------------------------------------
* */





gulp.task('startup', ['startup:web', 'startup:server', 'monitor']);
gulp.task('dev',     ['startup']);
gulp.task('default', ['dev']);