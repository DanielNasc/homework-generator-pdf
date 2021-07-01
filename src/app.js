const express = require('express')
const app = express()
const path = require('path')
const resultController = require('./controllers/resultController')

const PORT = process.env.PORT || 3000
const htmlPath = path.join(__dirname,'../index.html')

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.set('view engine', 'ejs')

app.get('/', (req,res) => res.sendFile(htmlPath))
app.post('/', resultController.save)
app.get('/result', resultController.render)


app.listen(PORT)