import gulp from 'gulp';
import paths from '../utils/paths';
import {pluginNames} from '../utils/plugins';

const extensions = '(css|js|less)';

gulp.task('watch', () => {
    gulp.watch(`${paths.appSrcDir}/**/*.less`, gulp.series('lint-all'));
    gulp.watch(`${paths.appSrcDir}/**/*.${extensions}`, gulp.series('webpack-app'));

    for (const pluginName of pluginNames) {
        gulp.watch(`${paths.pluginsSrcDir}/${pluginName}/*.${extensions}`, gulp.series([`webpack-${pluginName}`]));
    }
});
