import { test } from "../src/fixtures/myFixtures"
import { request } from "playwright/test"
import { USERS } from "../src/data/users"
import { expect } from "playwright/test"
import ExpectedResponse from "../src/data/expectedResponses"
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


test.describe('API check promo and tournaments unlogged', async () => {
    let JWT

    test.beforeEach(async ({authController}) => {
        JWT = await authController.getJwtToken()
    })

    // test('get all banners', async ({request}) => {
    //     const responseTournamnets = await request.get('/api/tournaments/provider-tournaments', {
    //         headers: {
    //             'Authorization': `Bearer ${JWT}`
    //         },

    //         params: {
    //             'currency': 'EUR',
    //             'tournaments_page_code': 'tournaments',
    //             'platform_id': 1
    //         }
    //     })

    //     const tournaments = await responseTournamnets.json()

    //     console.log(tournaments)

        
    test('Get all games', async ({request}) => {

        const responseGames = await request.get('/api/games/category/new', {
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
})