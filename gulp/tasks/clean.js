import gulp from 'gulp';
import del from 'del';
import R from 'ramda';
import paths from '../utils/paths';
import {pluginNames} from '../utils/plugins';

gulp.task('clean', (cb) => {
    del.sync([paths.distDir,
        ...R.map((pluginName) => `${paths.pluginsDistDir}/${pluginName}`,
            pluginNames)], {force: true});
    cb();
});
