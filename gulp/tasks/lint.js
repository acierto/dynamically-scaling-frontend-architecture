import eslint from 'gulp-eslint';
import gulp from 'gulp';
import lesshint from 'gulp-lesshint';
import paths from '../utils/paths';

const lesshintSteam = (stream) => stream
    .pipe(lesshint({maxWarnings: 0}))
    .pipe(lesshint.reporter())
    .pipe(lesshint.failOnError())
    .pipe(lesshint.failOnWarning());

const lintStream = (stream) => stream
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());

gulp.task('lint-less', () => lesshintSteam(gulp.src(`${paths.srcDir}/**/*.less`)));

gulp.task('lint-sources', () => lintStream(gulp.src(`${paths.srcDir}/**/*.js`)));

gulp.task('lint-all', gulp.series('lint-less', 'lint-sources'));
