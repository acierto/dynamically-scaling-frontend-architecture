const SHOW = 'toastr/SHOW';

export const TOASTR_TYPE = {
    error: 'error',
    info: 'info',
    success: 'success',
    warning: 'warning'
};

export default {
    SHOW,
    show: (title, message, toastrType) => ({message, title, toastrType, type: SHOW})
};

