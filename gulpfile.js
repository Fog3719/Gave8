const gulp = require('gulp');
const pug = require('gulp-pug');
const postcss = require('gulp-postcss');
const browserSync = require('browser-sync').create();

// Pug 编译任务
function compilePug() {
  return gulp.src('./src/templates/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('./public'));
}

// CSS 编译任务
function compileCSS() {
  return gulp.src('./src/styles/tailwind.css')
    .pipe(postcss())
    .pipe(gulp.dest('./public/styles'));
}

// JavaScript 复制任务
function copyJS() {
  return gulp.src('./src/scripts/*.js')
    .pipe(gulp.dest('./public/scripts'));
}

// 浏览器同步任务
function browserSyncServe(cb) {
  browserSync.init({
    server: {
      baseDir: './public'
    }
  });
  cb();
}

function browserSyncReload(cb) {
  browserSync.reload();
  cb();
}

// 监听文件变化
function watchFiles() {
  gulp.watch('./src/templates/**/*.pug', gulp.series(compilePug, browserSyncReload));
  gulp.watch('./src/styles/**/*.css', gulp.series(compileCSS, browserSyncReload));
  gulp.watch('./src/scripts/**/*.js', gulp.series(copyJS, browserSyncReload));
}

// 默认任务
exports.default = gulp.series(
  gulp.parallel(compilePug, compileCSS, copyJS),
  browserSyncServe,
  watchFiles
);
