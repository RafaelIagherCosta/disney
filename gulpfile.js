const gulp = require('gulp');
const dartSass = require('sass');
const gulpSass = require('gulp-sass')(dartSass);
const imagemin = require('gulp-imagemin');

// Caminhos
const paths = {
  styles: {
    src: './src/styles/**/*.scss',
    dest: './dist/css'
  },
  images: {
    src: './src/images/**/*.{jpg,jpeg,png,svg,gif}',
    dest: './dist/images'
  }
};

// Compilar SCSS e minificar
function styles() {
  return gulp.src(paths.styles.src)
    .pipe(gulpSass({ outputStyle: 'compressed' }).on('error', gulpSass.logError))
    .pipe(gulp.dest(paths.styles.dest));
}

// Minificar imagens
function images() {
  return gulp.src(paths.images.src)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.images.dest));
}

// Observar alterações
function watch() {
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.images.src, images);
}

// Exportar tarefas
exports.styles = styles;
exports.images = images;
exports.watch = watch;
exports.default = gulp.parallel(styles, images);
