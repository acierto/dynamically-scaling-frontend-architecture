import gulp from 'gulp';
import express from 'express';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import log from 'loglevel';
import paths from '../utils/paths';
import {devServerPort, serverPort} from '../utils/connection';
import proxy from './proxy';
import webpackConfigApp from './webpack/webpack.config.app';
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
    app.delete('/api/user/remove', (req, res) => {
        db.remove({_id: req.query.id}, {multi: true}, jsonResponse(res));
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
    app.listen(serverPort, () => {
        log.info(`DSFA is started on port ${serverPort}!`);
        cb();
    });
});

gulp.task('dev-server:start', () => {
    webpackConfigApp
        .entry.main.unshift(`webpack-dev-server/client?http://localhost:${devServerPort}/`, 'webpack/hot/dev-server');
    const compiler = webpack(webpackConfigApp);
    webpackConfigApp.devServer = {
        contentBase: '/dist',
        hot: true,
        port: devServerPort,
        publicPath: ''
    };
    // console.log('webpackConfigApp', webpackConfigApp);
    // compiler.hooks.done.tap('done', cb);
    const server = new WebpackDevServer(compiler, {
        disableHostCheck: true,
        hot: true,
        lazy: false,
        noInfo: false,
        proxy,
        publicPath: webpackConfigApp.output.publicPath,
        quiet: false,
        stats: {colors: true}
    });
    server.listen(devServerPort);
});
