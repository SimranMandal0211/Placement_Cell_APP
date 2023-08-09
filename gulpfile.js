const gulp = require('gulp');
const hash = require('gulp-hash');
const clearCSS = require('gulp-clean-css');
const terser = require('gulp-terser');


gulp.task('css', function(done){
    console.log('minifying css...');

     gulp.src('./assets/**/*.css')
     .pipe(clearCSS())
     .pipe(hash())
     .pipe(gulp.dest('public/assets/css'))
    .pipe(hash.manifest('manifest.json', { // Generate the manifest file
      deleteOld: true,
      sourceDir: __dirname + '/public/css'
    }))
    .pipe(gulp.dest('./public/assets'));

    done();
});



gulp.task('js', function(done){
    console.log('minifying js...');

     gulp.src('./assets/**/*.js')
     .pipe(terser({
      output: {
        comments: false, // Remove comments
      }}))
    .pipe(hash())
    .pipe(gulp.dest('./public/assets/js'))
    .pipe(hash.manifest('manifest.json', { // Generate the manifest file
      deleteOld: true,
      sourceDir: __dirname + '/public/js'
    }))
    .pipe(gulp.dest('./public/assets'));
    
    done();

});


// Task to run both 'css' and 'js' tasks concurrently
gulp.task('build', gulp.parallel('css', 'js'));

// Default task to run 'build'
gulp.task('default', gulp.series('build'));