// const MongoClient = require('mongodb').MongoClient;
const {
    MongoClient,
    ObjectID
} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);

// //  Desctruturing - make new variables from an object property

// var user = {name: 'Muna',age:25};
// var {name}  = user;

MongoClient.connect('mongodb://localhost:27017/TodoApp', {
    useNewUrlParser: true
}, (err, client) => {

    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }

    console.log('Connected to MongoDB server');

    const db = client.db('TodoApp');

    db.collection('todos').find().toArray().then((docs) => {
        console.log('Todos');
        console.log(JSON.stringify(docs, undefined, 3));
    }, (err) => {
        console.log('Unable to fetch todos', err);
    });

    db.collection('todos').find({
        completed: false
    }).toArray().then((docs) => {
        console.log('Uncompleted Todos');
        console.log(JSON.stringify(docs, undefined, 3));
    }, (err) => {
        console.log('Unable to fetch todos', err);
    });

    db.collection('todos').find({
        _id: new ObjectID('5bf210449aef2b5a4df593f1')
    }).toArray().then((docs) => {
        console.log('Todo by ID');
        console.log(JSON.stringify(docs, undefined, 3));
    }, (err) => {
        console.log('Unable to fetch todos', err);
    });

    db.collection('todos').find().count().then((res) => {
        console.log(`Count Todos: ${res}`);
    }, (err) => {
        console.log('Unable to fetch todos', err);
    });



    client.close();

});