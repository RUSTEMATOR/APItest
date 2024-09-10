import test from "playwright/test";




test.describe.skip('babibuba', async () => {


    test('fasfa', async ({page}) => {

        await page.goto('https://www.kingbillycasino.com/')

        // await page.pause()

        await page.getByRole("link", {name: "Create account"}).click()

        await page.locator("#registration-dynamic-form__email").fill('awffawefawfwa@kingbilly.xyz')

        await page.locator("#registration-dynamic-form__password_single").fill('193786Az()')

        await page.locator("#sign-up label").filter({hasText: "I am 18 years old and I accept the Privacy Policy and Terms and Conditions *"})
                    .locator("span").first().click()
        
        await page.locator("#sign-up").getByRole("button", {name:"Create account"}).click()

        page.waitForTimeout(3)


        await page.locator("xpath=//div/div/button[contains(@class, 'modal__close-button')]").click()
        await page.locator("xpath=//div/div/button[contains(@class, 'modal__close-button')]").click()


    })
})