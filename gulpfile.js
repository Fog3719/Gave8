const gulp = require('gulp');
const pug = require('gulp-pug');
const postcss = require('gulp-postcss');
const browserSync = require('browser-sync').create();
const clean = require('gulp-clean');
const shell = require('gulp-shell');
const fs = require('fs');
const path = require('path');
const through = require('through2');
const tailwindcss = require('tailwindcss');
const watch = require('gulp-watch');
// 复制素材文件任务


function copyAssets() {
  return gulp.src('./src/assets/**/*',{ encoding: false })
    .pipe(through.obj(function(file, enc, cb) {
      if (file.isBuffer()) {
        const targetPath = path.join('./public/assets', file.relative);
        fs.mkdirSync(path.dirname(targetPath), { recursive: true });
        fs.writeFileSync(targetPath, file.contents);
        console.log('Copied:', file.path, '->', targetPath);
      }
      cb(null, file);
    }));
}

// 清理任务
function cleanTask() {
  return gulp.src('./public', {read: false, allowEmpty: true})
    .pipe(clean());
}


// Pug 编译任务
function compilePug() {
  return gulp.src('./src/templates/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('./public'));
}

// CSS 编译任务
function compileCSS() {
  return gulp.src(['./src/styles/tailwind.css', './src/styles/base.css'])
    .pipe(postcss([
      tailwindcss()
    ]))
    .pipe(gulp.dest('./public/styles'));
}



// JavaScript 复制任务
function copyJS() {
  return gulp.src('./src/scripts/*.js')
    .pipe(gulp.dest('./public/scripts'));
}

// function watchTailwindCSS() {
//   return watch('./src/**/*.{js,vue,pug}', () => { // 监听所有可能影响 Tailwind CSS 的文件
//     return gulp.src(['./src/styles/tailwind.css', './src/styles/base.css'])
//       .pipe(postcss([
//         tailwindcss()  // 使用 tailwindcss 插件
//       ]))
//       .pipe(gulp.dest('./public/styles'));
//   });
// }

function watchTailwindCSS() {
  return gulp.watch('./src/**/*.{js,vue,pug}', gulp.series(compileCSS, browserSyncReload));
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


// 推送到 gh-pages 分支的任务
function deployToGitHub() {
  return gulp.src('public', {read: false})
    .pipe(shell([
      'git init',
      'git add -A',
      'git commit -m "Deploy to GitHub Pages"',
      'git push -f git@github.com:Fog3719/Gave8.git main:gh-pages'
    ], {
      cwd: './public'
    }));
}


// 监听文件变化
// function watchFiles() {
//   gulp.watch('./src/templates/**/*.pug', gulp.series(compilePug, browserSyncReload));
//   gulp.watch('./src/styles/**/*.css', gulp.series(compileCSS, browserSyncReload));
//   gulp.watch('./src/scripts/**/*.js', gulp.series(copyJS, browserSyncReload));
//   gulp.watch('./src/assets/**/*', gulp.series(copyAssets, browserSyncReload));
// }
function watchFiles() {
  gulp.watch('./src/templates/**/*.pug', gulp.series(compilePug, browserSyncReload));
  gulp.watch('./src/scripts/**/*.js', gulp.series(copyJS, browserSyncReload));
  gulp.watch('./src/assets/**/*', gulp.series(copyAssets, browserSyncReload));
}






// 构建任务
const build = gulp.series(cleanTask, gulp.parallel(compilePug, compileCSS, copyJS, copyAssets));


// 默认任务
exports.default = gulp.series(
  build,
  browserSyncServe,
  watchTailwindCSS,
  watchFiles,
);

// 导出部署任务
exports.deploy = gulp.series(build, deployToGitHub);

// 导出构建任务
exports.build = build;
