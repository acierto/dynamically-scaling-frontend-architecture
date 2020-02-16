import gulp from 'gulp';
import paths from '../utils/paths';

const extensions = '(css|js|less)';

gulp.task('watch', (cb) => {
    gulp.watch(`${paths.appSrcDir}/**/*.${extensions}`, gulp.series('webpack-app'));
    gulp.watch(`${paths.pluginsSrcDir}/about/*.${extensions}`, gulp.series(['webpack-about']));
    gulp.watch(`${paths.pluginsSrcDir}/profile/*.${extensions}`, gulp.series('webpack-profile'));
});