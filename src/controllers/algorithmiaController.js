const algorithmia = require('algorithmia')
const algorithmiaKey = require('../data/credentials.json').algorithmiaKey

module.exports = {
    async searchInWikipedia(searchTerm){

        const input = {
            "articleName": searchTerm
        }

        const authenticedAlgorithmia = algorithmia.client(algorithmiaKey)
        const wikipediaParserApi = authenticedAlgorithmia.algo('web/WikipediaParser/0.1.2')
        const wikipediaContent = await wikipediaParserApi.pipe(input)

        return wikipediaContent
    }
}