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
const svgmin = require('gulp-svgmin');
const svgSprite = require('gulp-svg-sprite');

// SVG 精灵图配置
const svgSpriteConfig = {
  mode: {
    symbol: {
      dest: 'sprite',
      sprite: 'sprite.svg',
      example: false
    }
  },
  shape: {
    transform: ['svgo'],
    id: {
      generator: function(name) {
        // 移除路径和扩展名，只保留文件名作为ID
        return path.basename(name, '.svg');
      }
    }
  },
  svg: {
    xmlDeclaration: false,
    doctypeDeclaration: false
  }
};

// SVG 压缩和精灵图生成任务
function generateSvgSprite() {
  return gulp.src('./src/assets/icon/**/*.svg')
    .pipe(svgmin()) // 压缩 SVG
    .pipe(svgSprite(svgSpriteConfig))
    .pipe(gulp.dest('./src/assets')); // 输出到 assets 目录
}

// 复制素材文件任务
function copyAssets() {
  return gulp.src([
    './src/assets/**/*',                // All assets
    '!./src/assets/icon/**/*.svg',      // Exclude individual SVG files
    './src/assets/sprite/**/*.svg'      // Include generated sprite SVGs
  ], { 
    encoding: false 
  })
  .pipe(through.obj(function(file, enc, callback) {
      if (file.isBuffer()) {
        const targetPath = path.join('./public/assets', file.relative);
      
      // Create directory if it doesn't exist
      fs.mkdirSync(path.dirname(targetPath), { 
        recursive: true 
      });
      
      // Write file to destination
        fs.writeFileSync(targetPath, file.contents);
      
      // Log copied file
        console.log('Copied:', file.path, '->', targetPath);
      }
    callback(null, file);
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
    .pipe(pug({
      basedir: path.resolve('./src')
    }))
    .pipe(gulp.dest('./public'));
}

// CSS 编译任务
function compileCSS() {
  return gulp.src(['./src/styles/tailwind.css', './src/styles/base.css'])
    .pipe(postcss([
      tailwindcss()
    ]))
    .pipe(gulp.dest('./public/styles'))
    .pipe(browserSync.stream());
}

// JavaScript 复制任务
function copyJS() {
  return gulp.src('./src/scripts/*.js')
    .pipe(gulp.dest('./public/scripts'));
}

// 复制 Swiper.js 任务
function copySwiper() {
  return gulp.src([
    './node_modules/swiper/swiper-bundle.min.css', 
    './node_modules/swiper/swiper-bundle.min.js' 
  ])
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
function watchFiles() {
  // 监听 SVG 文件变化
  gulp.watch('./src/assets/icon/**/*.svg', 
    gulp.series(generateSvgSprite, copyAssets, browserSyncReload)
  );
  
  gulp.watch('./src/templates/**/*.pug', 
    gulp.series(compilePug, compileCSS, browserSyncReload)
  );
  gulp.watch('./src/scripts/**/*.js', 
    gulp.series(copyJS, browserSyncReload)
  );
  gulp.watch('./src/assets/**/*', 
    gulp.series(copyAssets, browserSyncReload)
  );
  gulp.watch('./src/styles/**/*.css', 
    gulp.series(compileCSS, browserSyncReload)
  );
}

// 构建任务
const build = gulp.series(
  cleanTask, 
  generateSvgSprite,
  gulp.parallel(compilePug, compileCSS, copyJS, copyAssets, copySwiper)
);

// 默认任务
exports.default = gulp.series(
  build,
  browserSyncServe,
  watchFiles
);

// 导出部署任务
exports.deploy = gulp.series(build, deployToGitHub);

// 导出构建任务
exports.build = build;

// 导出 SVG 精灵图生成任务
exports.sprite = generateSvgSprite;
