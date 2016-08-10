var gulp = require('gulp');
var gulpSass = require('gulp-sass');
var gulpCopy = require('gulp-copy');
var gulpCean = require('gulp-clean');
var gulpFlatten = require('gulp-flatten');

gulp.task('clean', function () {
    return gulp.src(['css/sass/vendor', 'js/vendor', 'fonts'], { read: false })
        .pipe(gulpCean());
});

gulp.task('sass', function () {
    gulp.src('css/sass/styles.scss')
    .pipe(gulpSass())
    .pipe(gulp.dest('./css'));
});

gulp.task('move-vendor-sass', function () {
    gulp.src('bower_components/bootstrap-sass/assets/stylesheets/**/*')
    .pipe(gulp.dest('./css/sass/vendor'));
});

gulp.task('move-vendor-fonts', function () {
    gulp.src(['bower_components/bootstrap-sass/assets/fonts/**/*'])
    .pipe(gulp.dest('./fonts'));
});

gulp.task('move-vendor-js', function () {
    gulp.src(['bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',
        'bower_components/angular/angular.js',
        'bower_components/angular-ui-router/release/angular-ui-router.js',
        'bower_components/jquery/dist/jquery.js',
        'bower_components/react/react.js',
        'bower_components/createjs-collection/vendor_modules/**/*.combined.js'])
        .pipe(gulpFlatten())
        .pipe(gulp.dest('./js/vendor'));
});

gulp.task('copy', ['clean'], function () {
    return gulp.src(['src/public/**/*', 'src/vendor/**/*'], {
        base: 'fonts'
    }).pipe(gulp.dest('build'));
});
//gulp.task('vendor-js', function () {
//    gulp.src('css/sass/styles.scss')
//    .pipe(gulpSass())
//    .pipe(gulp.dest('./css/sass'));
//});

gulp.task('watch', ['sass'], function () {
    gulp.watch('css/sass/**/*.scss', ['sass']);
});