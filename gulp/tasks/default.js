import gulp from 'gulp';

gulp.task('default', gulp.series('clean', 'webpack-development', 'server:start'));
