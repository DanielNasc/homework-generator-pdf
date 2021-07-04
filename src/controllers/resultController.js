const algorithmiaController = require('./algorithmiaController')
const customSearch = require('./seachImages')
const PdfMaker = require('./pdfMaker')

const wikicontent = {}
let lang = 'pt'

module.exports = { 
    async save(req, res){
        const body = req.body
        const searchTerm = body.searchTerm
        lang = body.lang

        wikicontent.title = searchTerm
        console.log('> Search term added')
        wikicontent.content = await algorithmiaController.searchInWikipedia(searchTerm, lang)

        if(!wikicontent.content) return res.redirect('/ops')
        
        console.log('> content loaded');
        wikicontent.img = await customSearch.searchImages(searchTerm)
        console.log('> img loaded');


        const pdf = await PdfMaker.makePDF()

        console.log('> pdf loaded');

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