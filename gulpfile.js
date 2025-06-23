const gulp = require('gulp');
const dartSass = require('sass');
const gulpSass = require('gulp-sass')(dartSass);
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');

const paths = {
  styles: {
    src: './src/styles/**/*.scss',
    dest: './dist/css'
  },
  images: {
    src: './src/images/**/*.{jpg,jpeg,png,svg,gif}',
    dest: './dist/images'
  },
  scripts: {
    src: './src/scripts/*.js',
    dest: './dist/js'
  }
};

function styles() {
  return gulp.src(paths.styles.src)
    .pipe(gulpSass({ outputStyle: 'compressed' }).on('error', gulpSass.logError))
    .pipe(gulp.dest(paths.styles.dest));
}

function images() {
  return gulp.src(paths.images.src)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.images.dest));
}

function scripts() {
  return gulp.src(paths.scripts.src)
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.dest));
}

// Para desenvolvimento local
function watch() {
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.images.src, images);
  gulp.watch(paths.scripts.src, scripts);
}

const build = gulp.series(gulp.parallel(styles, images, scripts));

// Exportações
exports.styles = styles;
exports.images = images;
exports.scripts = scripts;
exports.watch = watch;
exports.build = build;
exports.default = build; // <- Isso será usado pela Vercel
