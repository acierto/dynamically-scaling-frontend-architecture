import gulp from 'gulp';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import plumber from 'gulp-plumber';
import paths from '../../utils/paths';
import webpackAppConfig from './webpack.config.app';
import {buildConfig} from './webpack.config.plugin.common';

gulp.task('webpack-app', () =>
    gulp
        .src(`${paths.appSrcDir}/**/*.js`)
        .pipe(plumber())
        .pipe(webpackStream(webpackAppConfig, webpack))
        .pipe(gulp.dest(paths.distDir))
);

for(const pluginName of ['about', 'profile']) {
    gulp.task(`webpack-${pluginName}`, () =>
        gulp
            .src(`${paths.pluginsSrcDir}/${pluginName}/**/*.js`)
            .pipe(plumber())
            .pipe(webpackStream(buildConfig(pluginName), webpack))
            .pipe(gulp.dest(`${paths.pluginsDistDir}/${pluginName}`))
    );
}
