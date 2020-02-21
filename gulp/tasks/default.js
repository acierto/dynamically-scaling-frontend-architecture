import gulp from 'gulp';
import R from 'ramda';
import {moduleNames} from '../utils/modules';

gulp.task('build-all', gulp.parallel(...['webpack-app', ...R.map((name) => `webpack-${name}`, moduleNames)]));

gulp.task('server', gulp.parallel('server:start', 'watch'));

gulp.task('default', gulp.series('clean', 'lint-all', 'build-all', 'server:start', 'dev-server:start'));
