import Datastore from 'nedb';
import log from 'loglevel';
import paths from '../utils/paths';

const db = new Datastore({filename: `${paths.projectDir}/db-store/datafile.db`});
db.loadDatabase((err) => {
    if (err) {
        log.error('Database could not load data', err);
    }
});

export default db;
