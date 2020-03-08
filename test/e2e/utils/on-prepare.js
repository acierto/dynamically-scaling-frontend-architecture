var R = require('ramda');
var browserName = process.env.SELENIUM_TEST_BROWSER || 'chrome';
var {
    browserHeight,
    browserWidth,
    defaultSpecTimeout
} = require('../../../gulp/utils/defaults');
var hostname = require('../../../gulp/utils/hostname');
var {proxyPort} = require('../../../gulp/utils/connection');
var ScreenShotReporter = require('protractor-screenshot-reporter');

module.exports = function () {
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

    var rmdir = require('rimraf');
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
};
