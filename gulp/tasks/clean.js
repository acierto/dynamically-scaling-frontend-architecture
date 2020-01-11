import gulp from 'gulp';
import del from 'del';
import paths from '../utils/paths';

gulp.task('clean', (cb) => {
    del.sync([paths.distDir,
        `${paths.pluginsDistDir}/about`,
        `${paths.pluginsDistDir}/profile`], {force: true});
    cb();
});
