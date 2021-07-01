let wikicontent
const algorithmiaController = require('./algorithmiaController')
const puppeteer = require('puppeteer')

module.exports = {
    async save(req, res){
        const searchTerm = req.body.searchTerm
        wikicontent = await algorithmiaController.searchInWikipedia(searchTerm)

        const browser = await puppeteer.launch()
        const page = await browser.newPage()

        await page.goto('http://localhost:3000/result',{
            waitUntil: "networkidle0"
        })

        const pdf = await page.pdf({
            format: 'letter',
            printBackground: true,
            margin: {
                top: '2mm',
                bottom: '10mm'
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