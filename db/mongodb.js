var MongoClient = require('mongodb').MongoClient
var config = require('../config/development.js')
var ObjectId = require('mongodb').ObjectID
var url = 'mongodb://127.0.0.1:27017/test'
var songCollection = config.collections.songCollection
var userCollection = config.collections.userCollection
var connection

function mongoWrapper() {
    if (!connection) {
        MongoClient.connect(url, function(err, db) {
            if (err) {
                throw new Error("Did not connect to DB")
            } else {
                console.log("Connection to DB successful")
                this.db = db
            }
        })
    } else {
        console.log('connection to db successful')
        this.db = connection
    }
}


mongoWrapper.prototype.findOne = function(collection, data, callback) {
    db.collection(collection).findOne(data, function handleResult(err, result) {

        if (err || result === null) {
            return callback("no record found", null)
        }
        callback(null, result)

    })
}

mongoWrapper.prototype.findLimit = function(collection, data, maxlimit, callback) {
    var cursor = db.collection(collection).find(data).limit(1).toArray(function(err, docs) {
        if(err) {
            console.log("error in findAll mongodb", err)
            return callback(err, null)
        } 
        callback(null, docs)
    })
}

mongoWrapper.prototype.post = function(collection, data, callback) {
    db.collection(collection).insertOne(data, function handleResult(err, result) {
        if (err) {
            console.log(err)
            return callback(err, null)
        }
        callback(null ,true)
    })
}

// mongoWrapper.prototype.updateUserInfo = function(collection, data,callback) {
//     db.collection(userCollection).update({
//         _id: data.username
//     }, data , { upsert: true }, function(){})
// }

mongoWrapper.prototype.update = function(collection, data, callback) {
    db.collection(collection).update(data.key, data.query , { upsert: true }, function(err, res){
        callback(err, res)
    })
}




module.exports = mongoWrapper