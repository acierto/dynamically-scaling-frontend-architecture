const LOAD = 'custom-plugins/LOAD';
const SET = 'custom-plugins/SET';

export default {
    LOAD,
    load: () => ({type: LOAD}),
    SET,
    set: (extensions) => ({extensions, type: SET})
};
