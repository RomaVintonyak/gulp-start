var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var cssbeautify = require('gulp-cssbeautify');
var browserSync = require('browser-sync').create();
var minify = require('gulp-minify');

function css_style(done) {
  /* minifi css */
  gulp.src('./app/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      errorLogToConsole: true,
      outputStyle: 'compressed'
    }))
    .on('error', console.error.bind(console))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./app/css/'));
  done();
  /* uncompresed css */
  gulp.src('./app/scss/**/*.scss')
    .pipe(sass({
      errorLogToConsole: true,
      outputStyle: 'expanded'
    }))
    .on('error', console.error.bind(console))
    .pipe(autoprefixer({
      cascade: true
    }))
    .pipe(cssbeautify())
    .pipe(gulp.dest('./app/css/'))
    .pipe(browserSync.stream());
  done();
}
/*work with js */
function js_minify(done){
  gulp.src('./app/js_src/*.js')
  .pipe(minify({
    errorLogToConsole: true,
    ext: {
        min: '.min.js'
    },
    ignoreFiles: ['-min.js']
    }))
    .on('error', console.error.bind(console))
    .pipe(gulp.dest('./app/js'))
  done();
}
/*start template*/
function Sync(done) {
  browserSync.init({
    server: {
      baseDir: "./app/"
    },
    port: 3000
  });
  done();
}
/*reload func*/
function browserReload(done) {
  browserSync.reload();
  done();
}
/*watch files*/
function watchFiles() {
  gulp.watch('./app/scss/**/*', css_style);
  gulp.watch('./app/scss/**/*', browserReload);
  gulp.watch('./app/pages/**/*', browserReload);
  gulp.watch('./app/**/*.html', browserReload);
  gulp.watch('./app/js_src/*.js', js_minify);
  gulp.watch('./app/js_src/*.js', browserReload);
}
/*start gulp*/
gulp.task('default', gulp.parallel(Sync, watchFiles));