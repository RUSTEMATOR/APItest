export default class GameController {
    #GET_GAME_PATH = (category) => `/api/games/category/${category}`
    #GET_PROVIDERS_path = "/api/content/all-providers"

    constructor(request) {
        this.request = request
        
    }

    async getGamesByCategory(JWT, category, currency) {
        console.log(`Games of the ${category} category:`)

        const responseGames = await this.request.get(this.#GET_GAME_PATH(category), {
            headers: {
                'Authorization': `Bearer ${JWT}`
            },

            params: {
                'currency': currency || 'EUR',
                'platform_id': 1,
                'per_page': 100000
            }

            
        })

        const games = await responseGames.json()

        return games
    }

    async getProviders(JWT, currency) {
        console.log('Getting all providers')

        const responseProviders = await this.request.get(this.#GET_PROVIDERS_path, {
            headers: {
                'Authorization': `Bearer ${JWT}`
            },

            params: {
                'currency': currency || 'EUR',
                'platform_id': 1
            }
        })
        const providers = await responseProviders.json()
            
        return providers

    }

}

