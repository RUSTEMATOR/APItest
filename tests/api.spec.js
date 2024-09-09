import { test } from "../src/fixtures/myFixtures"
import { USERS } from "../src/data/users"
import { expect } from "playwright/test"
import ExpectedResponse from "../src/data/expectedResponses"
import Arrays from "../src/data/arrays"
import fs from 'fs'

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


test.describe('API check promo and tournaments unlogged', async () => {
    let JWT

    test.beforeEach(async ({authController}) => {
        JWT = await authController.getJwtToken()
    })

        
    test('Get all games', async ({request}) => {

        const responseGames = await request.get('/api/games/category/slots', {
            headers: {
                            'Authorization': `Bearer ${JWT}`
                        },
            
                        params: {
                            'currency': 'EUR',
                            'platform_id': 1,
                            'per_page': 10
                        }
        })

        const games = await responseGames.json()

        const total = await games.totalCount

        // expect(total).toEqual(173)

        console.log(games)

        // fs.writeFileSync('games.json', JSON.stringify(games, null, 2))
      
    })


    test('Get all providers', async ({request}) => {
        const responseProviders = await request.get('/api/content/all-providers', {
            headers: {
                            'Authorization': `Bearer ${JWT}`
                        },

            params: {
                'currency': 'EUR',
                'platform_id': 1
            }
        })

        const providers = await responseProviders.json()

        console.log(providers)

        fs.writeFileSync('providers.json', JSON.stringify(providers, null, 2))
    })

    test('Fast reg user', async ({request}) => {
        const requestFastReg = await request.post('/api/auth/fast-registration', {
            headers: {
                'Authorization': `Bearer ${JWT}`
            },

            data: {
                'email': 'apoko-ross@kingbilly.xyz',
                'password': '193786Az()',
            }
        })

        const response = await requestFastReg.json()

        console.log(response)
        
    
    })
})

