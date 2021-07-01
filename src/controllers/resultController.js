let wikicontent = {title: '', content: ''}
const algorithmiaController = require('./algorithmiaController')
const puppeteer = require('puppeteer')

module.exports = {
    async save(req, res){
        const body = req.body
        const searchTerm = body.searchTerm
        const lang = body.lang
        wikicontent.title = searchTerm
        wikicontent.content = await algorithmiaController.searchInWikipedia(searchTerm, lang)

        const browser = await puppeteer.launch()
        const page = await browser.newPage()

        await page.goto('http://localhost:3000/result',{
            waitUntil: "networkidle0"
        })

        const pdf = await page.pdf({
            format: 'letter',
            printBackground: true,
            margin: {
                top: '10mm',
                bottom: '10mm',
                left: '5mm',
                right: '5mm'
            }
        })

        await browser.close()

        res.contentType('application/pdf')

        return res.send(pdf)
    },
    render(req, res){
        res.render('wikipedia-result', {wikicontent})
    }
}