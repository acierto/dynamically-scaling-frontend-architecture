import gulp from 'gulp';
import del from 'del';
import R from 'ramda';
import paths from '../utils/paths';
import {moduleNames} from '../utils/modules';

gulp.task('clean', (cb) => {
    del.sync([paths.distDir,
        ...R.map((pluginName) => `${paths.modulesDistDir}/${pluginName}`,
            moduleNames)], {force: true});
    cb();
});
