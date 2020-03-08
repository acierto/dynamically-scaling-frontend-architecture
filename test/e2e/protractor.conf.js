var R = require('ramda');

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

exports.config = {
    allScriptsTimeout: defaultSpecTimeout,
    baseUrl: 'http://' + hostname + ':' + proxyPort + '/',
    beforeLaunch: function () {
        require('./utils/on-cleanup');
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
    onCleanUp: require('./utils/on-cleanup'),
    onPrepare: require('./utils/on-prepare'),
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
