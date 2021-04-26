var gulp          = require('gulp');
var sass          = require('gulp-sass');
var sourcemaps    = require('gulp-sourcemaps');
var autoprefixer  = require('gulp-autoprefixer');
var rename        = require('gulp-rename');
var cssbeautify   = require('gulp-cssbeautify');
var browserSync   = require('browser-sync').create();
var minify        = require('gulp-minify');

function css_style(done){
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
    .pipe(rename({suffix: '.min'}))
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
function jsMinify(){
  gulp.src('./app/js/*.js')
  .pipe(minify({
    errorLogToConsole: true,
    ext: {
        min: '.min.js'
    },
    ignoreFiles: ['-min.js']
    }))
    .on('error', console.error.bind(console))
    .pipe(gulp.dest('./app/js/'))
  done();
}
function Sync(done){
  browserSync.init({
    server: {
      baseDir: "./app/"
    },
    port: 3000
  });
  done();
}
function browserReload(done){
  browserSync.reload();
  done();
}
function watchFiles(){
  gulp.watch('./app/scss/**/*', css_style);
  gulp.watch('./app/scss/**/*', browserReload);
  gulp.watch('./app/pages/**/*', browserReload);
  gulp.watch('./app/**/*.html', browserReload);
  gulp.watch('./app/js/main.js', jsMinify);
  //gulp.watch('./app/js/**/*', browserReload);
}
gulp.task('default', gulp.parallel(Sync, watchFiles));