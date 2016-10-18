var gulp = require('gulp'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    minifyCss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    rev = require('gulp-rev'),
    wiredep = require('gulp-wiredep'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean');

gulp.path = {
    src: './src',
    dist: './dist'
};

// gulp server
gulp.task('connect', function() {
    connect.server({
        root: gulp.path.src,
        port: 9999,
        livereload: true,
        middleware:function(connect, opt){
            return [['/bower_components',
                connect["static"]('./bower_components')]]
        }
    });
});

gulp.task('sass', function () {
    return gulp.src(gulp.path.src + '/scss/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest(gulp.path.src + '/css'))
        .pipe(connect.reload());
});

gulp.task('html', function () {
    return gulp.src(gulp.path.src + '/**/*.html')
        // .pipe(gulp.dest(gulp.path.src))
        .pipe(connect.reload());
});

gulp.task('scripts', function() {
    return gulp.src(gulp.path.src + '/**/*.js')
        .pipe(uglify().on('error', function(e){
            console.log(e);
        }))
        .pipe(connect.reload());
});

gulp.task('images', function () {
    return gulp.src(gulp.path.src + '/assets/images/**/*')
        .pipe(gulp.dest(gulp.path.dist));
});

// gulp bower - add bower components to html files
gulp.task('bower', function () {
    gulp.src(gulp.path.src + '/*.html')
        .pipe(wiredep({
            directory: './bower_components'
        }))
        .pipe(gulp.dest(gulp.path.src));
});


// gulp build - create vendor build
gulp.task('build', ['clean', 'images'], function () {
    return gulp.src(gulp.path.src + '/**/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest(gulp.path.dist));
});

gulp.task('clean', function () {
    return gulp.src(gulp.path.dist, {read: false})
        .pipe(clean());
});

//gulp watch
gulp.task('watch', function() {
    gulp.watch(gulp.path.src + '/scss/**/*.scss', ['sass']);
    gulp.watch(gulp.path.src + '/**/*.html', ['html']);
    gulp.watch(gulp.path.src + '/**/*.js', ['scripts']);
    gulp.watch('./bower.json', ['bower']);
});

// gulp run
gulp.task('run', ['connect', 'sass', 'html', 'scripts', 'bower', 'watch']);