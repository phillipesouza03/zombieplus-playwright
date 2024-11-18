const { test: base, expect } = require('@playwright/test');

const { LoginPage } = require('../pages/LoginPage');
const { LandingPage } = require('../pages/LandingPage');
const { MoviesPage } = require('../pages/MoviesPage');
const { Toast } = require('../pages/Components');

const test = base.extend({
	page: async({ page }, use) => {
		await use({
            ...page,
            login: new LoginPage(page),
            landing: new LandingPage(page),
            movies: new MoviesPage(page),
            toast: new Toast(page)
        });
	}
});

export { test, expect };
