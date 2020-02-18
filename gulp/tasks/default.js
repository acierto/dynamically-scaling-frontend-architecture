import gulp from 'gulp';
import R from 'ramda';
import {pluginNames} from '../utils/plugins';

gulp.task('build-all', gulp.parallel(...['webpack-app', ...R.map((name) => `webpack-${name}`, pluginNames)]));

gulp.task('server', gulp.parallel('server:start', 'watch'));

gulp.task('default', gulp.series('clean', 'lint-all', 'build-all', 'server'));
