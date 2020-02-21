const LOAD = 'custom-modules/LOAD';
const SET = 'custom-modules/SET';

export default {
    LOAD,
    load: () => ({type: LOAD}),
    SET,
    set: (modules) => ({modules, type: SET})
};
