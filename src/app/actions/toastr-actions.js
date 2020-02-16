const SHOW = 'toastr/SHOW';

export default {
    SHOW,
    show: (title, message) => ({message, title, type: SHOW})
};

