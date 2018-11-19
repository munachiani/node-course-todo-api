// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);

// //  Desctruturing - make new variables from an object property

// var user = {name: 'Muna',age:25};
// var {name}  = user;

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {

    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }

    console.log('Connected to MongoDB server');

    const db = client.db('TodoApp');

    db.collection('todos').insertOne({
        text: 'Something to do',
        completed: false
    },(err,res) => {

        if(err) {
            console.log('Unable to insert todo', err);
        }

        console.log(JSON.stringify(res.ops,undefined,2));

    });

    db.collection('users').insertOne({
        name: 'Munachimso Ani',
        age: 25,
        location: '2351 Warwick Avenue Los Angeles CA 90032'
    }, (err, res) => {

        if (err) {
            return console.log('Unable to insert user', err);
        }

        console.log(JSON.stringify(res.ops, undefined, 2));

    });


    client.close();

});