import gulp from 'gulp';
import paths from '../utils/paths';
import {moduleNames} from '../utils/modules';

const extensions = '(css|js|less)';

gulp.task('watch', () => {
    gulp.watch(`${paths.appSrcDir}/**/*.less`, gulp.series('lint-all'));
    gulp.watch(`${paths.appSrcDir}/**/*.${extensions}`, gulp.series('webpack-app'));

    for (const pluginName of moduleNames) {
        gulp.watch(`${paths.modulesSrcDir}/${pluginName}/*.${extensions}`, gulp.series([`webpack-${pluginName}`]));
    }
});
