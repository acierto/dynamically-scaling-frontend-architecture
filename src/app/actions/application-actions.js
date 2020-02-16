const BOOTSTRAP = 'application/BOOTSTRAP';
const BOOTSTRAP_PLUGINS = 'application/plugins/BOOTSTRAP';
const BOOTSTRAPPED = 'application/BOOTSTRAPPED';
const PLUGIN_BOOTSTRAPPED = 'application/plugin/BOOTSTRAPPED';

export default {
    BOOTSTRAP,
    bootstrap: () => ({type: BOOTSTRAP}),
    BOOTSTRAP_PLUGINS,
    BOOTSTRAPPED,
    bootstrapped: () => ({type: BOOTSTRAPPED}),
    bootstrapPlugins: () => ({type: BOOTSTRAP_PLUGINS}),
    PLUGIN_BOOTSTRAPPED,
    pluginBootstrapped: (plugin) => ({plugin, type: PLUGIN_BOOTSTRAPPED})
};

