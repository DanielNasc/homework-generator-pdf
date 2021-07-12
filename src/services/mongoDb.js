require('dotenv').config()
const { MongoClient } = require('mongodb')

const user = process.env.MONGO_USER 
const password = process.env.MONGO_PASSWORD
const cluster = process.env.CLUSTER

const uri = `mongodb+srv://${user}:${password}@${cluster}.vwyfw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

module.exports = {
    async insert(summary){
        try {
            const client = new MongoClient(uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })

            await client.connect()

            const db = client.db('wikipedia')
            const summaries = db.collection('summaries')

            await summaries.insertOne(summary)
            console.log('> Added to MongoDb');

            await client.close()

        } catch (err) {
            console.log(err)
        }
    },
    async find(id){
        const client = new MongoClient(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        try {
            
            await client.connect()

            const db = client.db('wikipedia')
            const summaries = db.collection('summaries')

            const summary = await summaries.findOne({_id: id})

            return summary

        } finally {
            await client.close()
        }
    }
}