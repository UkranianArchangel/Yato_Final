import gulp from 'gulp';
import  babel from 'gulp-babel';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import cleanCSS from 'gulp-clean-css';
import rename from 'gulp-rename';
import replace from 'gulp-replace';
import imagemin from 'gulp-imagemin';
import nodemon from 'gulp-nodemon';




// Define a task to bundle and minify JavaScript files
gulp.task('scripts', () => {
  return gulp.src('public/scripts.js') // Adjust the source directory if needed
    .pipe(concat('scripts.js'))
    .pipe(babel())
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('build/public'));
});

gulp.task('node', () => {
  return gulp.src('public/app.js') // Adjust the source directory if needed
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('build'));
});

// Define a task to minify CSS files
gulp.task('styles', () => {
  return gulp.src('public/style/*.css') // Adjust the source directory if needed
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('build/style'));
});

// Define a task to copy HTML files
gulp.task('copy-html', () => {
  return gulp.src('public/*.html') // Adjust the source directory if needed
    .pipe(gulp.dest('build'));
});

gulp.task('update-paths', function () {
  return gulp.src('public/*.html') // Update the path to match your actual HTML file location
    .pipe(replace(/\.css/g, '.min.css'))
    .pipe(replace('scripts.js', 'scripts.min.js'))
    .pipe(replace(/\.html/g, '.min.html'))
    .pipe(gulp.dest('build/')); // Update the destination folder where the updated HTML files will be saved
});

gulp.task('build-images', function () {
  return gulp.src('public/images/*') // Update the path to match your actual image files location
    .pipe(imagemin())
    .pipe(gulp.dest('build/images/')); // Update the destination folder where the optimized images will be saved
});

gulp.task('build-svg', function () {
  return gulp.src('public/svg/*') // Update the path to match your actual image files location
    .pipe(imagemin())
    .pipe(gulp.dest('build/svg')); // Update the destination folder where the optimized images will be saved
});


gulp.task('start', function (done) {
  nodemon({
    script: 'build/app.min.js', 
    ext: 'js html', 
    env: { 'NODE_ENV': 'development' }
  })
  done();
});
// Define a task to watch for changes
gulp.task('watch', () => {
  gulp.watch('public/*.js', gulp.series('scripts'));
  gulp.watch('public/*.css', gulp.series('styles'));
  gulp.watch('public/*.html', gulp.series('copy-html'));
});

gulp.task('build', function () {
  return gulp.src('public/app.js') // Specify the source files to be transpiled
    .pipe(babel({
      presets: ['@babel/preset-env'],
    }))
    .pipe(gulp.dest('build')); // Specify the destination directory for the transpiled files
})

// Define the default task that runs all other tasks
gulp.task('default', gulp.parallel(
  'scripts', 
  'node', 
  'styles', 
  'copy-html', 
  'watch', 
  'update-paths', 
  'build-images', 
  'update-paths', 
  'build-svg', 
  'start'
  ));
