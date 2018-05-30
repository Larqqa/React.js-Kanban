const gulp = require('gulp');
const sass = require('gulp-sass');

function swallowError(error) {

  // If you want details of the error in the console
  console.log(error.toString());

  this.emit('end');
}

// Compile Sass
gulp.task('sass', function () {
  return gulp.src(['src/sass/*.sass', '!src/sass/functions.sass'])
  .pipe(sass({
    outputStyle: 'expanded',
  }))
  .on('error', swallowError)
  .pipe(gulp.dest('src'))
});

// Watch & Serve
gulp.task('serve', ['sass'], function () {
  // Watch Sass
  gulp.watch(['src/sass/*.sass'], ['sass']);
});

// Default
gulp.task('default', ['serve']);
