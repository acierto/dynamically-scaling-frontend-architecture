import {serverPort} from '../utils/connection';

const target = `http://localhost:${serverPort}`;

export default [{
    changeOrigin: true,
    context: ['/'],
    target
}];
