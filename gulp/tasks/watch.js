import gulp from 'gulp';
import paths from '../utils/paths';

gulp.task('watch', (cb) => {
    gulp.watch(`${paths.appSrcDir}/**/*.js`, gulp.series('webpack-app'));
    gulp.watch(`${paths.pluginsSrcDir}/about/*.js`, gulp.series(['webpack-about']));
    gulp.watch(`${paths.pluginsSrcDir}/profile/*.js`, gulp.series('webpack-profile'));
});
