var gulp = require('gulp');
var wiredep = require('wiredep').stream;
var browserSync = require('browser-sync');
var reload = browserSync.reload;
// var babel = require('babel-core');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

var babelify = require('babelify');
var fs = require('fs');
// var BufferStream = require('./lib/buffer-stream');
// var _ = require('lodash');
var gutil = require('gulp-util');

gulp.task('wiredep', function(){
  gulp.src('./app/index.html')
    .pipe(wiredep())
    .pipe(gulp.dest('./app'));
});

gulp.task('watch', function(){
  gulp.watch('bower.json', ['wiredep']);

  gulp.watch(['*.html', 'styles/style.css', 'scripts/main.js'], {
    cwd:'app'
  }, reload);

  gulp.watch('app/es6/**/*.js', ['build']);

});

// gulp.task('babelify', function(){
//   var src = fs.createWriteStream('app/scripts/main.js');
//   babel.transformFile('app/es6/main.js', function(err, result){    // console.log(result.code);
//     if(err) {
//       console.log(err);
//       return;
//     }
//
//     var code = new BufferStream(result.code);
//     code.pipe(src);
//
//   });
//   return src;
// });

// var config = {
//   entryFile: './app/es6/main.js',
//   outputDir: 'app/scripts/',
//   outputFile: 'app/scripts/main.js'
// };
//
// var source = function(file) {
//   return fs.createWriteStream(file);
// };

// var _ = {
//   extend: function(dest, source) {
//     for(var key in source) {
//       dest[key] = source[key];
//     }
//     return dest[key]
//   }
// };

// var bundler = watchify(
//   browserify(config.entryFile)
// );
//
// bundler.on('update', function(){
//   console.log("updated");
//   gulp.start('build');
// })

gulp.task('build', function(){
  return browserify({
    entries: 'app/es6/main.js',
    debug: true
  })
  .transform(babelify)
  .on('error', gutil.log)
  .bundle()
  .on('error', gutil.log)
  .pipe(source('./main.js'))
  .pipe(gulp.dest('./app/scripts/'))
});

gulp.task('serve', function(){
  return browserSync({
    open: false,
    server: {
      baseDir: 'app'
    }
  });
});

gulp.task('default', ['wiredep', 'build', 'serve', 'watch']);
