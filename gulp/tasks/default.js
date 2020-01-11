import gulp from 'gulp';

gulp.task('build-all', gulp.parallel('webpack-app', 'webpack-about', 'webpack-profile'));

gulp.task('server', gulp.parallel('server:start', 'watch'));

gulp.task('default', gulp.series('clean', 'build-all', 'server'));
