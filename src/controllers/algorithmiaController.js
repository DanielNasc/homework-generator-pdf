const algorithmia = require('algorithmia')
const algorithmiaKey = require('../data/credentials.json').algorithmiaKey
const sanitizeFunction = require('./sanitizeContent')

module.exports = {
    async searchInWikipedia(searchTerm, lang){

        const input = {
            'lang': lang,
            "articleName": searchTerm
        }

        //GET WIKIPEDIA CONTENT
        const authenticedAlgorithmia = algorithmia.client(algorithmiaKey)
        const wikipediaParserApi = authenticedAlgorithmia.algo('web/WikipediaParser/0.1.2')
        const wikipediaContent = await wikipediaParserApi.pipe(input)

        if(!wikipediaContent.result) return undefined

        console.log('> wikipedia content received');

        //SANITIZE
        const sanitizedContent = await sanitizeFunction.sanitize(wikipediaContent.result)

        console.log('> sanitized content received');

        //SUMMARIZER
        const summarizer = authenticedAlgorithmia.algo('nlp/Summarizer/0.1.8')
        let summarizedContent = []
        await addSummarizedContent(sanitizedContent)

        console.log('> summarized content received');

        async function addSummarizedContent(content){
            for(const sentence of content){
            
                console.log(`> sentence ${content.indexOf(sentence)} of ${content.length} summarized`);

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

        return summarizedContent

    }
}