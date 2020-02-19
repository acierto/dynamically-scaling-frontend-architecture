import {httpRequest} from '../services/http-service';

export const getPluginsMetadata = () => httpRequest('GET', 'plugins/plugins-metadata.json');

export const addUser = (user) => httpRequest('POST', 'api/user/add', {data: user});

export const removeUser = (id) => httpRequest('DELETE', 'api/user/remove', {params: {id}});

export const listUsers = (query, page) => httpRequest('GET', 'api/user/find', {data: {page, query}});
