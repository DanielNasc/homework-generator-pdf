require('dotenv').config()
const puppeteer = require('puppeteer')

const local = process.env.LOCAL

module.exports = {
    async makePDF(path){
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox','--disable-setuid-sandbox']
          })

        const page = await browser.newPage()

        console.log(local);
        if(local == 'localhost'){    

            await page.goto(`http://localhost:3000/result/${path}`,{
                waitUntil: "networkidle0"
            })

        }else{

            await page.goto(`https://wikipedia-to-pdf.herokuapp.com/result/${path}`,{
                waitUntil: "networkidle0"
            }) 
        }
        
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