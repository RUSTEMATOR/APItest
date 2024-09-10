import { test } from "../src/fixtures/myFixtures"
import { USERS } from "../src/data/users"
import { expect } from "playwright/test"
import ExpectedResponse from "../src/data/expectedResponses"
import { generatedEmail, userPassword } from "../src/data/constants"
import Arrays from "../src/data/arrays"

test.describe('Check API logging in', async () => {
    const email = USERS.USER1.email
    const password = USERS.USER1.password
    const expectedResponse = new ExpectedResponse
    let JWT
    

    test.beforeEach(async ({authController}) => {
        JWT = await authController.getJwtToken()
    })

    test('Check API logging', async ({authController}) => {
        

        const loggedUser1 = await authController.logIn(JWT, email, password)

        delete loggedUser1.messaging__token
        delete loggedUser1.sessionUuid
        
        expect(loggedUser1).toEqual(expectedResponse.ofUser1);
        
    })
})




test.describe('API check games availability by categories', async () => {
    let JWT
    const arrays = new Arrays

    test.beforeEach(async ({authController}) => {
        JWT = await authController.getJwtToken()
    })

    for(const category of arrays.categories) {
        for(const currency of arrays.currencies) {
        test(`Check games availability by category: ${category} with ${currency}`, async ({gamesController}) => {

            const games = await gamesController.getGamesByCategory(JWT, category, currency )

            const numberOfGames = games.data.length

            console.log(numberOfGames)
            
            expect(numberOfGames).toBeGreaterThan(10)
        })
    }
    }    
})


test.describe('API check game providers', async () => {
    let JWT
    const arrays = new Arrays

    test.beforeEach(async ({authController}) => {
        JWT = await authController.getJwtToken()
    })

    for(const currency of arrays.currencies) {
        test(`Check game providers by ${currency}`, async ({gamesController}) => {

            const providers = await gamesController.getProviders(JWT, currency)

            const numberOfProviders = providers.data.length

            console.log(numberOfProviders)

            expect(numberOfProviders).toBeGreaterThan(1)
        })
    }
})

test.describe('API check registration', async () => {
    let JWT
    const email = generatedEmail
    const password = userPassword


    test.beforeEach(async ({authController}) => {
        JWT = await authController.getJwtToken()
    })

    test('Register user', async ({authController}) => {

        const registeredUserInfo = await authController.regUser(JWT, email, password)
        const userID = await registeredUserInfo.userId

        const userInfo = await authController.logIn(JWT, email, password)
        const loggedUserID = await userInfo.userId

        expect(userID).toEqual(loggedUserID)
        expect(registeredUserInfo.messaging__login).toEqual(userInfo.messaging__login)
    })
})


test.describe('API get banners', async () => {
    let JWT
    
    test.beforeEach(async ({authController}) => {
        JWT = await authController.getJwtToken()
    })


    test('Get banners on the main page', async ({promoController}) => {
        const banners = await promoController.getMainPageBanners(JWT)

        const numberOfBanners = banners.childs.length

        console.log(numberOfBanners)

        expect(numberOfBanners).toBeGreaterThan(1)
    })
})

