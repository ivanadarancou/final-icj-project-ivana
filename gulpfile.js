import bake from './tasks/bake.js';
import clean from './tasks/clean.js';
import clear from './tasks/clear.js';
import copy from './tasks/copy.js';
import fetch from './tasks/fetch.js';
import format from './tasks/format.js';
import gulp from 'gulp';
import images from './tasks/images.js';
import lint from './tasks/lint.js';
import nunjucks from './tasks/nunjucks.js';
import runSequence from 'gulp4-run-sequence';
import scripts from './tasks/scripts.js';
import serve from './tasks/serve.js';
import styles from './tasks/styles.js';

// default tasks
gulp.task('default', (done) => {
  runSequence(
    [clean, styles, copy, gulp.parallel(scripts, images), nunjucks, bake],
    lint,
    format,
    done
  );
});

// run default tasks and then serve locally
gulp.task('dev', gulp.series('default', serve));

gulp.task('images', () => {
  return gulp.src('src/img/**/*')
    .pipe(gulp.dest('docs/img'));
});

gulp.task('artists', () => {
  return gulp.src('src/templates/artists.njk')
    .pipe(nunjucksRender({
      path: ['src/templates/'] // Path to your templates
    }))
    .pipe(rename('artists.html')) // Rename output file
    .pipe(gulp.dest('docs/')); // Output to your destination folder
});

gulp.task('html', function() {
  return gulp.src('src/pages/**/*.njk')
    .pipe(nunjucksRender({
      path: ['src/templates'] // Make sure your templates are in the correct path
    }))
    .pipe(gulp.dest('docs'))
    .on('end', function() {
      console.log('Gulp has completed processing HTML files!');
    });
});





// Allow them to be called individually
gulp.task(clear);
gulp.task(fetch);
gulp.task(format);



