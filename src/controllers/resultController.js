const algorithmiaController = require('./algorithmiaController')
const customSearch = require('./seachImages')
const PdfMaker = require('./pdfMaker')

const temporaryJSON = {
    searchs: []
}
let lang = 'pt'

module.exports = { 
    async save(req, res){

        //VARIABLES==================================================================================

        const wikicontent = {}
        const body = req.body
        const searchTerm = body.searchTerm
        const searchTermTrimmed = searchTerm.replace(/ /g, '_')
        lang = body.lang

        //ADD PROPERTIES=============================================================================

        wikicontent.title = searchTerm
        wikicontent.id = `${searchTermTrimmed}_${lang}`
        console.log('> Search term added')

        const algorithmiaResponse = await algorithmiaController.searchInWikipedia(searchTerm, lang)
        
        if(!algorithmiaResponse) return res.redirect('/ops')

        wikicontent.content = algorithmiaResponse[0]
        wikicontent.summary = algorithmiaResponse[1]
        console.log('> content loaded');


        wikicontent.img = await customSearch.searchImages(searchTerm) //if u "Quota exceeded for quota metric 'Queries' and limit 'Queries per day'"" use this 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Mallard2.jpg/1200px-Mallard2.jpg'
        console.log('> img loaded'); 

        temporaryJSON.searchs.push({...wikicontent})

        //return res.redirect('/result/'+wikicontent.id)

        //GENERATE PDF===============================================================================
        
        const pdf = await PdfMaker.makePDF(wikicontent.id);
        console.log('> pdf loaded');

        //RESPONSE===================================================================================

        res.contentType('application/pdf')

        return res.send(pdf)
    },
    render(req, res){
        const searchTerm = req.params.path
        const wikicontent = temporaryJSON.searchs.find(summary=> summary.id == searchTerm)

        if(!wikicontent) return res.send('404')

        return res.render('wikipedia-result', {wikicontent})
    },
    erro(req,res){
        const alert = lang == 'pt'? 'Pagina não encontrada :( tente pesquisar termos semelhantes': 'Page not found :( try searching for more specific terms'
        return res.render('ops',{alert} )
    }
}