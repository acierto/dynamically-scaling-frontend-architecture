const ADD = 'user/ADD';
const LIST = 'user/LIST';
const LOAD = 'user/LOAD';
const REMOVE = 'user/REMOVE';
const SET = 'user/SET';

export default {
    ADD,
    add: (user) => ({type: ADD, user}),
    LIST,
    list: (page) => ({page, type: LIST}),
    LOAD,
    load: () => ({type: LOAD}),
    REMOVE,
    remove: (id) => ({id, type: REMOVE}),
    SET,
    set: (users) => ({type: SET, users})
};

