const { test, expect } = require('../support');
const { faker } = require('@faker-js/faker');

test('deve cadastrar um lead na fila de espera', async ({ page }) => {
	const leadName = faker.person.fullName();
	const leadEmail = faker.internet.email();

	await page.landing.visit();
	await page.landing.openLeadModal();
	await page.landing.submitLeadForm(leadName, leadEmail);
	await page.toast.containText('Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!');
});

test('não deve cadastrar quando o email já existe', async ({ page, request }) => {
	const leadName = faker.person.fullName();
	const leadEmail = faker.internet.email();

	const newLead = await request.post('http://localhost:3333/leads', {
		data: {
			name: leadName,
			email: leadEmail
		}
	});

	expect(newLead.ok()).toBeTruthy();

	await page.landing.visit();
	await page.landing.openLeadModal();
	await page.landing.submitLeadForm(leadName, leadEmail);

	await page.toast.containText('O endereço de e-mail fornecido já está registrado em nossa fila de espera.');
});

test('não deve cadastrar com email incorreto', async ({ page }) => {
	await page.landing.visit();
	await page.landing.openLeadModal();
	await page.landing.submitLeadForm('Phillipe', 'phillipebol.com');

	await page.landing.alertHaveText('Email incorreto');
});

test('não deve cadastrar quando o nome não é preenchido', async ({ page }) => {
	await page.landing.visit()
	await page.landing.visit();
	await page.landing.openLeadModal();
	await page.landing.submitLeadForm('', 'phillipe@bol.com');

	await page.landing.alertHaveText('Campo obrigatório');
});

test('não deve cadastrar quando o email não é preenchido', async ({ page }) => {
	await page.landing.visit();
	await page.landing.openLeadModal();
	await page.landing.submitLeadForm('Phillipe', '');

	await page.landing.alertHaveText('Campo obrigatório');
});

test('não deve cadastrar quando nenhum campo é preenchido', async ({ page }) => {
	await page.landing.visit();
	await page.landing.openLeadModal();
	await page.landing.submitLeadForm('', '');

	await page.landing.alertHaveText(['Campo obrigatório', 'Campo obrigatório']);
});

// ANTES DO PAGE OBJECTS
//
// test('deve cadastrar um lead na fila de espera', async ({ page }) => {
//   await page.goto('http://localhost:3000/')

//   //  await page.click('//button[text()="Aperte o play... se tiver coragem"]')
//   //  await page.getByRole('button', { name: 'Aperte o play... se tiver coragem' }).click()
//   await page.getByRole('button', { name: /Aperte o play/ }).click()

//   await expect(
//     page.getByTestId('modal').getByRole('heading')
//   ).toHaveText('Fila de espera')

//   // await page.locator('#name').fill('Phillipe')
//   // await page.locator('input[name="Informe seu nome"]').fill('Phillipe')
//   // await page.locator('input[placeholder="Informe seu nome"]').fill('Phillipe')
//   await page.getByPlaceholder('Informe seu nome').fill('Phillipe')
//   await page.getByPlaceholder('Informe seu email').fill('phillipe@bol.com')

//   // await page.getByTestId('modal')
//   //     .getByText('Quero entrar na fila!').click()
//   await page.getByText('Quero entrar na fila!').click()

//   // await page.getByText('seus dados conosco').click()
//   // const content = await page.content()
//   // console.log(content)
//   const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
//   await expect(page.locator('.toast')).toHaveText(message)
//   await expect(page.locator('.toast')).toBeHidden({ timeout: 5000 })
// });

// test('não deve cadastrar com email incorreto', async ({ page }) => {
//   await page.goto('http://localhost:3000/')

//   await page.getByRole('button', { name: /Aperte o play/ }).click()

//   await expect(
//     page.getByTestId('modal').getByRole('heading')
//   ).toHaveText('Fila de espera')

//   await page.getByPlaceholder('Informe seu nome').fill('Phillipe')

//   await page.getByPlaceholder('Informe seu email').fill('phillipebol.com')

//   await page.getByText('Quero entrar na fila!').click()

//   await expect(page.locator('.alert')).toHaveText('Email incorreto')

// });

// test('não deve cadastrar quando o nome não é preenchido', async ({ page }) => {
//   await page.goto('http://localhost:3000/')

//   await page.getByRole('button', { name: /Aperte o play/ }).click()

//   await expect(
//     page.getByTestId('modal').getByRole('heading')
//   ).toHaveText('Fila de espera')

//   await page.getByPlaceholder('Informe seu email').fill('phillipe@bol.com')

//   await page.getByText('Quero entrar na fila!').click()

//   await expect(page.locator('.alert')).toHaveText('Campo obrigatório')

// });

// test('não deve cadastrar quando o email não é preenchido', async ({ page }) => {
//   await page.goto('http://localhost:3000/')

//   await page.getByRole('button', { name: /Aperte o play/ }).click()

//   await expect(
//     page.getByTestId('modal').getByRole('heading')
//   ).toHaveText('Fila de espera')

//   await page.getByPlaceholder('Informe seu nome').fill('Phillipe')

//   await page.getByText('Quero entrar na fila!').click()

//   await expect(page.locator('.alert')).toHaveText('Campo obrigatório')

// });

// test('não deve cadastrar quando nenhum campo é preenchido', async ({ page }) => {
//   await page.goto('http://localhost:3000/')

//   await page.getByRole('button', { name: /Aperte o play/ }).click()

//   await expect(
//     page.getByTestId('modal').getByRole('heading')
//   ).toHaveText('Fila de espera')

//   await page.getByText('Quero entrar na fila!').click()

//   await expect(page.locator('.alert')).toHaveText([
//     'Campo obrigatório',
//     'Campo obrigatório'
//   ])

// });
