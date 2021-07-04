const algorithmia = require('algorithmia')
const algorithmiaKey = require('../data/credentials.json').algorithmiaKey
const sanitizeFunction = require('./sanitizeContent')
const searchImg = require('./seachImages')

module.exports = {
    async searchInWikipedia(searchTerm, lang){

        const input = {
            'lang': lang,
            "articleName": searchTerm
        } 

        //GET WIKIPEDIA CONTENT==================================================================================

        const authenticedAlgorithmia = algorithmia.client(algorithmiaKey)
        const wikipediaParserApi = authenticedAlgorithmia.algo('web/WikipediaParser/0.1.2')
        const wikipediaContent = await wikipediaParserApi.pipe(input)

        if(!wikipediaContent.result) {console.log('> the Wikipedia content cannot be received'); return undefined}

        console.log('> wikipedia content received');

        //REMOVE BLANK LINES=====================================================================================

        const contentWithoutBlankLines = await sanitizeFunction.removeBlankLines(wikipediaContent.result.content)
        const wikipediaSummary = await sanitizeFunction.removeBlankLines(wikipediaContent.result.summary)

        console.log('> blank lines removed');

        //SUMMARIZER==============================================================================================

        const summarizer = authenticedAlgorithmia.algo('nlp/Summarizer/0.1.8')
        let summarizedContent = []
        await addSummarizedContent(contentWithoutBlankLines)
        console.log('> summarized content received');

        async function addSummarizedContent(content){
            for(const sentence of content){

                if(sentence == '== Notes ==' || sentence == '== Referências =='){
                    break;
                }

                if(sentence.startsWith('=')){
                    summarizedContent.push(sentence)
                    continue;
                }

                const summarized = await summarizeContent(sentence)
                summarizedContent.push(summarized.result)
            }
        }

        async function summarizeContent(sentence){
            const newSentence = await summarizer.pipe(sentence)
            return newSentence
        }

        //ORGANIZE CONTENT=========================================================================================
        
        const organizedContent = sanitizeFunction.organizeInArray(summarizedContent)
        console.log('> successfully organized content');

        //ADD IMAGES===============================================================================================
        organizedContent.forEach(async (element) => {
            const img = await searchImg.searchImages(searchTerm, element.title)
            element.img = img
        })


        return [organizedContent, wikipediaSummary]

    }
}