var R = require('ramda');
var os = require('os');
var AsciiTable = require('ascii-table');

module.exports = function logProtractorConfiguration() {
    var table = new AsciiTable('Protractor Configuration');
    table
        .addRow('Browser', R.propOr('Hasn\'t been defined.', 'SELENIUM_TEST_BROWSER', process.env))
        .addRow('Host', R.propOr('localhost', 'SELENIUM_TEST_ADDR', process.env))
        .addRow('Platform', R.propOr(`Hasn't been defined. Platform: (${os.platform()})`,
            'SELENIUM_TEST_PLATFORM', process.env));
    console.log(table.toString());
};
