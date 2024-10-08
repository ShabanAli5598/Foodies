let MongoClient = require('mongodb').MongoClient;
let url = 'mongodb://muahmmadshoban:shoban@ac-9hj8e7j-shard-00-00.ygo1y0o.mongodb.net:27017,ac-9hj8e7j-shard-00-01.ygo1y0o.mongodb.net:27017,ac-9hj8e7j-shard-00-02.ygo1y0o.mongodb.net:27017/?ssl=true&replicaSet=atlas-xw8u7e-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0';
let Client = new MongoClient(url);
let database = 'Foodies';

 async function bussinessReg() {
    let result = await Client.connect();
    let db = result.db(database);
    return db.collection('Bussiness Registration');
}

module.exports = bussinessReg;