// importando Gulp
const { src, dest, watch, series } = require("gulp");
// sass para compliar css
const sass = require("gulp-sass")(require("sass"));
const purgecss = require('gulp-purgecss');
const rename = require('gulp-rename');

// comprimir images
const imagemin = require("gulp-imagemin");
 
function css() {
  return src("src/scss/app.scss") //archivo de origen
    .pipe(sass()) //compilacion
    .pipe(dest("build/css")); //exportar la compilacion
}
 
function img() {
  return src("src/img/**/*")
    .pipe(imagemin({ optimizationLevel: 3 }))
    .pipe(dest("build/img"));
}
 
function dev() {
  watch("src/scss/**/*.scss", css);
}

function cssbuild() {
  src('build/css/app.css')
    .pipe( rename({
      suffix: '.min'
    }) )
    .pipe( purgecss({
      content: ['index.html']
    }))
    .pipe( dest('build/css'));

   
}
 
exports.css = css;
exports.dev = dev;
exports.img = img;
exports.default = series(img, css, dev);
exports.build = series( cssbuild )