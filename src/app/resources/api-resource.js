import {httpRequest} from '../services/http-service';

export const getPluginsMetadata = () => httpRequest('GET', 'plugins/plugins-metadata.json');
