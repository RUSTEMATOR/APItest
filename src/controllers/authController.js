export default class AuthController {

    #GET_JWT_TOKEN_PATH = "/api/front/auth"
    #LOGIN_PATH = "/api/auth/login"

    constructor(request) {
        this.request = request
    }
    
    async getJwtToken() {
        const response = await this.request.get(this.#GET_JWT_TOKEN_PATH)
        const jwtToken = await response.json()

        console.log(jwtToken.jwt)

        return jwtToken.jwt

    }

    async logIn(JWT, userEmail, userPassword ) {
        const loginResponse = await this.request.post(this.#LOGIN_PATH, {
            headers: {
                'Authorization': `Bearer ${JWT}`
            },

            data: {
                email: userEmail,
                password: userPassword, 
                language: 'en'
            }
        })

        const userInfo = await loginResponse.json()

        console.log(userInfo)

        return userInfo
    }
}