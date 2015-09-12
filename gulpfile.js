
var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('js', function () {
  return gulp.src('src/**/*.js')
    .pipe(babel({
        stage: 0,
        plugins: ['./build/babelRelayPlugin'],
        optional: [
          'optimisation.react.constantElements',
          'optimisation.react.inlineElements'
        ]
      }))
    .pipe(gulp.dest('dist'));
});

gulp.task('cp', function() {
  gulp.src(['./package.json', './README.md'])
    .pipe(gulp.dest('./dist/'));
});

gulp.task('build', ['js', 'cp']);

gulp.task('default', ['build']);
