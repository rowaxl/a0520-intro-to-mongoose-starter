const MongoClient = require('mongodb').MongoClient;

let db;
//url
const URL = 'mongodb://127.0.0.1:27017/'
//dbname
const dbName = 'myproject';

exports.mongoConnect = (callback) => {
    MongoClient.connect(URL)
    .then(client => {
        console.log('Connected Successfully to Server');
        db = client.db(dbName);
        callback();
    })
    .catch(err => console.log("Error in mongoConnect: ", err))
}

exports.getDB = () => {
    if(db){
        return db;
    }else{
        throw err;
    }
}