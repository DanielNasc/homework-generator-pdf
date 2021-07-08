require('dotenv').config();
const {google} = require('googleapis')
const customSearch = google.customsearch('v1')

const CSE_ID = process.env.GOOGLE_CUSTOM_SEARCH_ENGINE
const CUSTOM_SERACH_KEY = process.env.CUSTOM_SEARCH_API_KEY

module.exports = {
    async searchImages(searchTerm, content){

        const searchThis = content === undefined ? searchTerm: `${searchTerm} ${content}`

        const response = await customSearch.cse.list({
            auth: CUSTOM_SERACH_KEY,
            cx: CSE_ID,
            q: searchThis,
            searchType: 'image',
            num: 1,
            imgSize: 'medium'
        })
        .catch(err=> console.log('erro: ' + err))

        return response.data.items[0].link
    }
}