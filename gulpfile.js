// gulpfile.mjs
import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import imagemin from 'gulp-imagemin';
import uglify from 'gulp-uglify';

const sass = gulpSass(dartSass);

// Caminhos
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

// Compilar SCSS
export function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest(paths.styles.dest));
}

// Minificar imagens
export function images() {
  return gulp.src(paths.images.src)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.images.dest));
}

// Minificar JS
export function scripts() {
  return gulp.src(paths.scripts.src)
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.dest));
}

// Build (sem watch)
export const build = gulp.series(gulp.parallel(styles, images, scripts));
export default build;
