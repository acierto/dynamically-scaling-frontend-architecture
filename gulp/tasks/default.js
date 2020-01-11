import gulp from 'gulp';

gulp.task('build-all', gulp.parallel('webpack-app', 'webpack-about', 'webpack-profile'));

gulp.task('default', gulp.series('clean', 'build-all', 'server:start'));
