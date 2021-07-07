const puppeteer = require('puppeteer')

module.exports = {
    async makePDF(path){
        const browser = await puppeteer.launch()
        const page = await browser.newPage()

        await page.goto(`http://localhost:3000/result/${path}`,{
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

        return pdf
    }
}