var gulp = require('gulp')
var bro = require('gulp-bro')
var babelify = require('babelify')
var browserSync = require('browser-sync')
var sourcemaps = require('gulp-sourcemaps')

var srcSample = './sample/**/*.!(js|jsx)'
var srcJs = './{lib,sample}/**/*.{js,jsx}'

gulp.task('js', () =>
  gulp.src(srcJs)
    .pipe(bro({
      transform: [
        babelify.configure({
          presets: ['env', 'react'],
          plugins: ['transform-class-properties', 'transform-object-rest-spread'],
        }),
      ],
    }))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist'))
)

gulp.task('sample', () =>
  gulp.src(srcSample)
    .pipe(gulp.dest('dist'))
)

gulp.task('serve', ['js', 'sample'], () => {
  browserSync.init({
    server: {
      baseDir: './dist',
    },
    reloadDelay: 500,
    open: false
  })
  gulp.watch(srcJs, ['js'])
  gulp.watch(srcSample, ['sample'])
  gulp.watch('./dist/**/*.*').on('change', browserSync.reload);
})

gulp.task('default', ['serve'])
