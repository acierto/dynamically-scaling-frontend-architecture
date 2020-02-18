const REMOVE = 'admin/user/REMOVE';
const STAGE = 'admin/user/STAGE';

export default {
    REMOVE,
    remove: () => ({type: REMOVE}),
    STAGE,
    stage: (user) => ({type: STAGE, user})
};
