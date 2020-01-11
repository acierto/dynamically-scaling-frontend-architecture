import gulp from 'gulp';
import express from 'express';
import paths from '../utils/paths';

const app = express();

gulp.task('server:start', (cb) => {
    app.get('/', function (req, res) {
        res.sendFile(`${paths.distDir}/index.html`);
    });
    app.use(express.static(`${paths.projectDir}/dist`));
    app.listen(3000, function () {
        console.log('Example app listening on port 3000!');
        cb();
    });
});
