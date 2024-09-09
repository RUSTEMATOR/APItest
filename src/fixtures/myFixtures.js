import { test as base, request, expect as baseExpect } from "@playwright/test";
import AuthController from "../controllers/authController";
import GameController from "../controllers/gameController";



export const test = base.extend({

    apiRequest: async ({}, use) => {
        const ctx = await request.newContext()

        await use(ctx)

        await ctx.dispose()
    },

    authController: async ({apiRequest}, use) => {
        await use(new AuthController(apiRequest))
    },

    gamesController: async ({apiRequest}, use) => {
        await use(new GameController(apiRequest))
    },
    

})


export const expect = baseExpect 

