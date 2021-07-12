# Homework-generator-pdf
Um projeto onde irei tentar fazer uma aplicação que gera um pdf automaticamente a partir de uma pesquisa na wikipedia

## Techs
<div align='center'>
    <img src='https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white'>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <img src='https://img.shields.io/badge/Express.js-404D59?style=for-the-badge'>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <img src='https://img.shields.io/badge/-Algorithmia-blueviolet?style=for-the-badge'>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <img src='https://img.shields.io/badge/Google_Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white'>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <img src='https://img.shields.io/badge/-Puppeteer-informational?style=for-the-badge'>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <img src='https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white'>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

</div>

## Credentials
**⚠️Crie um arquivo .env com suas credenciais neste formato:** <br>
**⚠️Create an .env file with your credentials in this format:**
```
    ALGORITHMIA_KEY= ...
    GOOGLE_CUSTOM_SEARCH_ENGINE = CSE Id
    CUSTOM_SEARCH_API_KEY = ...
    MONGO_USER = your mongoDb Cluster username
    MONGO_PASSWORD= your mongoDb Cluster password
    CLUSTER = ...
    LOCAL = localhost
```

## APIs
### Algorithmia
- Wikipedia Parser: <a href='https://algorithmia.com/algorithms/web/WikipediaParser'>Click</a>
- Summarizer: <a href='https://algorithmia.com/algorithms/nlp/Summarizer'>Click</a>

### Google
- Google Custom Search: <a href='https://developers.google.com/custom-search/v1/overview'>Click</a>

## Dependencies
- algorithmia
- ejs
- express
- puppeteer
- googleapis
- dotenv
- cookie-parser

## DevDependencies
- nodemon
- electron
