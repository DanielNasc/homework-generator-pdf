let wikicontent
const algorithmiaController = require('./algorithmiaController')

module.exports = {
    async save(req, res){
        const searchTerm = req.body.searchTerm
        wikicontent = await algorithmiaController.searchInWikipedia(searchTerm)
        return res.redirect('/result')
    },
    render(req, res){
        res.render('wikipedia-result', {wikicontent})
    }
}