const gulp = require('gulp');
const dartSass = require('sass'); // Importa o compilador Sass (Dart Sass)
const gulpSass = require('gulp-sass')(dartSass); // Conecta o gulp-sass ao compilador

function styles() {
  return gulp.src('./src/styles/*.scss') // ou apenas * se não for SCSS
    .pipe(gulpSass({ outputStyle: 'compressed' }).on('error', gulpSass.logError)) // adiciona tratamento de erro
    .pipe(gulp.dest('./dist/css'));
}

exports.default = styles;

exports.watch = function(){
    gulp.watch('./src/styles/*.scss', gulp.parallel(styles))
}
