import gulp from 'gulp';
import express from 'express';
import log from 'loglevel';
import paths from '../utils/paths';
import db from './db';

const app = express();

const jsonResponse = (response) => (error, payload) => {
    if (error) {
        response.status(500).json({error});
    } else {
        response.json({payload});
    }
};

const registerDatabaseApi = () => {
    app.post('/api/user/add', (req, res) => {
        db.insert(req.body, jsonResponse(res));
    });
    app.get('/api/user/find', (req, res) => {
        const {query = {}, page} = req.body;
        if (page) {
            db.find(query, jsonResponse(res))
                .skip(page.pageSize * page.page)
                .limit(page.pageSize)
                .exec(jsonResponse(res));
        } else {
            db.find(query, jsonResponse(res));
        }
    });
    app.get('/api/user/remove', (req, res) => {
        const {id} = req.body;
        db.remove({_id: id}, {multi: true}, jsonResponse(res));
    });
};

gulp.task('server:start', (cb) => {
    app.use(express.json());
    app.get('/', (req, res) => {
        res.sendFile(`${paths.distDir}/index.html`);
    });
    registerDatabaseApi();
    app.use(express.static(`${paths.projectDir}/dist`));
    app.use('/plugins', express.static(`${paths.projectDir}/plugins`));
    app.listen(2020, () => {
        log.info('DPFA is started on port 2020!');
        cb();
    });
});
