import Layout from '../dsl/layout';

describe('Should be able to manage users', () => {
    it('should display expected layout of the page', () => {
        Layout.homeButtonVisible();
        Layout.usersButtonVisible();
        Layout.adminButtonVisible();
        Layout.settingsButtonVisible();
    });
});
