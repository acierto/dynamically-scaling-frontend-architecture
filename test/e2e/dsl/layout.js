import {Expectation, XPath} from 'protractor-base-dsl';

const buttonSelector = (buttonLabel) => XPath.withLinkContains('.dsfaApp .nav', buttonLabel);

const adminButtonVisible = () => Expectation.displayed(buttonSelector('Admin'));
const homeButtonVisible = () => Expectation.displayed(buttonSelector('Home'));
const settingsButtonVisible = () => Expectation.displayed(buttonSelector('Settings'));
const usersButtonVisible = () => Expectation.displayed(buttonSelector('Users'));

export default {
    adminButtonVisible,
    homeButtonVisible,
    settingsButtonVisible,
    usersButtonVisible
};
