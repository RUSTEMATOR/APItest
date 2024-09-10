import { expect } from "playwright/test"


export default class AuthController {

    #GET_JWT_TOKEN_PATH = "/api/front/auth"
    #LOGIN_PATH = "/api/auth/login"
    #REGISTRATION_PATH = "/api/auth/fast-registration"

    constructor(request) {
        this.request = request
    }
    
    async getJwtToken() {
        const response = await this.request.get(this.#GET_JWT_TOKEN_PATH)
        const jwtToken = await response.json()

        // console.log(jwtToken.jwt)

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

        expect(loginResponse).toBeOK()

        const userInfo = await loginResponse.json()

        return userInfo
    }

    async regUser(JWT, randomEmail, userPassword) {
        const registrationResponse = await this.request.post(this.#REGISTRATION_PATH, {
            headers: {
                'Authorization': `Bearer ${JWT}`
            },

            data: {
                email: randomEmail,
                password:  userPassword,
                language: 'en'
            }
        })

        expect(registrationResponse).toBeOK()

        const regiterredUserInfo = await registrationResponse.json()

        return regiterredUserInfo
    }
}