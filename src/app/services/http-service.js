import R from 'ramda';
import axios from 'axios';

const instance = axios.create();

const toAxiosRequest = (method, url, config, accept) => ({
    ...config,
    headers: {
        'Accept': accept,
        'Accept-Type': accept,
        ...R.path(['headers'], config)
    },
    method,
    url
});

export const httpRequest = (method, url, config, accept = 'application/json') => {
    const request = toAxiosRequest(method, url, config, accept);
    return instance.request(request);
};

