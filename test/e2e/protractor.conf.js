var os = require('os');

var AsciiTable = require('ascii-table');
var R = require('ramda');
var ScreenShotReporter = require('protractor-screenshot-reporter');

var browserName = process.env.SELENIUM_TEST_BROWSER || 'chrome';
var platform = process.env.SELENIUM_TEST_PLATFORM || 'any';
var platformName = (process.env.SELENIUM_TEST_PLATFORM_NAME || 'any').toLowerCase();

var {
    browserHeight,
    browserWidth,
    defaultSpecTimeout
} = require('../../gulp/utils/defaults');

var seleniumVersions = require('../../gulp/tasks/selenium-versions.json');

var hostname = require('../../gulp/utils/hostname');
var {proxyPort} = require('../../gulp/utils/connection');

function logProtractorConfiguration() {
    var table = new AsciiTable('Protractor Configuration');
    table
        .addRow('Browser', R.propOr('Hasn\'t been defined. Using default.', 'SELENIUM_TEST_BROWSER', process.env))
        .addRow('Host', R.propOr('localhost', 'SELENIUM_TEST_ADDR', process.env))
        .addRow('Platform', R.propOr(`Hasn't been defined. Platform: (${os.platform()})`,
            'SELENIUM_TEST_PLATFORM', process.env));
    console.log(table.toString());
}

exports.config = {
    allScriptsTimeout: defaultSpecTimeout,
    baseUrl: 'http://' + hostname + ':' + proxyPort + '/',
    beforeLaunch: function () {
        logProtractorConfiguration();
    },
    capabilities: {
        browserName,
        platform,
        platformName,
        ...browserName === 'chrome' ?
            {chromeOptions: {args: ['--window-size=' + browserWidth + ',' + (browserHeight + 120)]}} : {},
        'se:ieOptions': {requireWindowFocus: true}
    },
    debug: true,
    framework: 'jasmine2',
    getPageTimeout: defaultSpecTimeout,
    jasmineNodeOpts: {
        defaultTimeoutInterval: defaultSpecTimeout,
        print: R.F,
        showColors: true
    },
    jvmArgs: [
        '-Dwebdriver.gecko.driver=./node_modules/webdriver-manager/selenium/geckodriver-' + seleniumVersions.gecko
    ],
    onCleanUp: function (exitCode) {
        var fs = require('fs');
        var q = require('q');
        var del = require('del');
        var deferred = q.defer();

        var reportsFolder = 'build/reports';
        var reportsFile = reportsFolder + '/console.log';
        var archiver = require('archiver');

        fs.access(reportsFile, fs.constants.F_OK, function (err) {
            if (err) {
                deferred.resolve(exitCode);
                return;
            }

            var archive = archiver.create('zip', {});

            var output = fs.createWriteStream(reportsFolder + '/console.zip');
            archive.pipe(output);

            output.on('close', function () {
                del([reportsFolder + '/*.txt'])
                    .then(function () {
                        deferred.resolve(exitCode);
                    });
            });

            archive.file(reportsFolder + '/console.log', {name: 'console.log'});
            archive.finalize();
        });

        return deferred.promise;
    },
    onPrepare: function () {
        require('@babel/register')({presets: ['@babel/preset-env']});

        var reporters = require('jasmine-reporters');
        var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
        var SpecReporter = require('jasmine-spec-reporter').SpecReporter;

        jasmine.getEnv()
            .addReporter(new reporters.JUnitXmlReporter({
                consolidateAll: false,
                savePath: 'build/test-results/protractor'
            }));

        jasmine.getEnv()
            .addReporter(new ScreenShotReporter({baseDirectory: 'build/screenshots'}));

        jasmine.getEnv()
            .addReporter(new Jasmine2HtmlReporter({
                savePath: 'build/reports/e2e/',
                takeScreenshots: true,
                takeScreenshotsOnlyOnFailures: true
            }));

        jasmine.getEnv()
            .addReporter(new SpecReporter({
                spec: {
                    displayDuration: true,
                    displayErrorMessages: true,
                    displayFailed: true,
                    displayPending: true,
                    displayStacktrace: true,
                    displaySuccessful: true
                },
                suite: {displayNumber: true}
            }));

        var failFast = require('jasmine-fail-fast');
        jasmine.getEnv()
            .addReporter(failFast.init());

        rmdir = require('rimraf');
        rmdir('build/reports', R.F);

        return browser.waitForAngularEnabled(false)
            .then(function () {
                if (browserName === 'firefox') {
                    return browser.manage()
                        .window()
                        .setSize(browserWidth, browserHeight);
                }

                if (browserName === 'internet explorer') {
                    return browser.executeScript(function () {
                        window.resizeTo(browserWidth, browserHeight);
                    });
                }
            })
            .then(function () {
                return browser.driver.get(`http://${hostname}:${proxyPort}/`);
            })
            .then(function () {
                return browser.manage()
                    .timeouts()
                    .setScriptTimeout(defaultSpecTimeout);
            });
    },
    params: {
        propertiesFn: function () {
            return {
                browser: browserName,
                os: platform
            };
        }
    },
    rootElement: 'body',
    seleniumAddress: process.env.SELENIUM_TEST_ADDR || null,
    specs: ['./scenario/**/*.*js'],
    suites: {users: './scenario/users-scenario.js'},
    troubleshoot: true
};
