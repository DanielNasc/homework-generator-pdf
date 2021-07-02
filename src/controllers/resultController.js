const algorithmiaController = require('./algorithmiaController')
const customSearch = require('./seachImages')
const PdfMaker = require('./pdfMaker')

let wikicontent = {title: '', content: [], img: ''}
let lang = 'pt'

module.exports = { 
    async save(req, res){
        const body = req.body
        const searchTerm = body.searchTerm
        lang = body.lang

        wikicontent.title = searchTerm
        wikicontent.content = await algorithmiaController.searchInWikipedia(searchTerm, lang)
        wikicontent.img = await customSearch.searchImages(searchTerm)

        if(!wikicontent.content) return res.redirect('/ops')

        const pdf = await PdfMaker.makePDF()

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