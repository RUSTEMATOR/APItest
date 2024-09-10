export default class PromoController {

    #GET_MAIN_PAGE_BANNERS_PATH = '/api/content/pages/main_sliders'


    constructor(request){
        this.request = request
    }

    async getMainPageBanners(JWT) {
        const response = await this.request.get(this.#GET_MAIN_PAGE_BANNERS_PATH, {
            headers: {
                'Authorization': `Bearer ${JWT}`
            }
        })

        const banners = await response.json()

        return banners
    }

}