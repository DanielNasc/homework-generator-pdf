const algorithmiaController = require('./algorithmiaController')
const customSearch = require('./seachImages')
const PdfMaker = require('./pdfMaker')

const wikicontent = {}
let lang = 'pt'

module.exports = { 
    async save(req, res){

        //VARIABLES==================================================================================

        const body = req.body
        const searchTerm = body.searchTerm
        lang = body.lang

        //ADD PROPERTIES=============================================================================

        wikicontent.title = searchTerm
        console.log('> Search term added')

        const algorithmiaResponse = await algorithmiaController.searchInWikipedia(searchTerm, lang)
        
        if(!algorithmiaResponse) return res.redirect('/ops')

        wikicontent.content = algorithmiaResponse[0]
        wikicontent.summary = algorithmiaResponse[1]
        console.log('> content loaded');


        wikicontent.img = await customSearch.searchImages(searchTerm)
        console.log('> img loaded'); 

        //GENERATE PDF===============================================================================
        
        const pdf = await PdfMaker.makePDF()
        console.log('> pdf loaded');

        //RESPONSE===================================================================================

        res.contentType('application/pdf')

        return res.send(pdf)
    },
    render(req, res){
        res.render('wikipedia-result', {wikicontent})
    },
    erro(req,res){
        const alert = lang == 'pt'? 'Pagina não encontrada :( tente pesquisar termos semelhantes': 'Page not found :( try searching for more specific terms'
        return res.render('ops',{alert} )
    }
}