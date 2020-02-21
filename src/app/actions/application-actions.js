const BOOTSTRAP = 'application/BOOTSTRAP';
const BOOTSTRAP_MODULES = 'application/modules/BOOTSTRAP';
const BOOTSTRAPPED = 'application/BOOTSTRAPPED';
const MODULE_BOOTSTRAPPED = 'application/module/BOOTSTRAPPED';

export default {
    BOOTSTRAP,
    bootstrap: () => ({type: BOOTSTRAP}),
    BOOTSTRAP_MODULES,
    bootstrapModules: () => ({type: BOOTSTRAP_MODULES}),
    BOOTSTRAPPED,
    bootstrapped: () => ({type: BOOTSTRAPPED}),
    MODULE_BOOTSTRAPPED,
    moduleBootstrapped: (module) => ({module, type: MODULE_BOOTSTRAPPED})
};

