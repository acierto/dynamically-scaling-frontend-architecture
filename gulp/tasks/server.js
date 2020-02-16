import gulp from 'gulp';
import express from 'express';
import paths from '../utils/paths';

const app = express();

gulp.task('server:start', (cb) => {
    app.get('/', (req, res) => {
        res.sendFile(`${paths.distDir}/index.html`);
    });
    app.use(express.static(`${paths.projectDir}/dist`));
    app.use('/plugins', express.static(`${paths.projectDir}/plugins`));
    app.listen(3000, () => {
        console.log('DPA is started on port 3000!');
        cb();
    });
});
