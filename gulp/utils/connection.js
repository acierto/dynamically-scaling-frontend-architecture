const yargs = require('yargs');

module.exports = {
    proxyPort: yargs.argv.proxyPort || 2021,
    serverPort: 2020
};
