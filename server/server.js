// Library imports
var express = require('express');
var bodyParser = require('body-parser');
var {
    ObjectID
} = require('mongodb');

// Local imports
var {
    mongoose
} = require('./db/mongoose');
var {
    Todo
} = require('./models/todo');
var {
    User
} = require('./models/user');

var port = process.env.PORT || 3000;


var app = express();

app.use(bodyParser.json());

// Create Todos
app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    });


});

// Get Todos
app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({
            todos
        })
    }, (err) => {
        res.status(400).send(err);
    });
});

// Get todo
app.get('/todo/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findById(id).then((todo) => {
        if (!todo) {
            res.status(400).send();
        }
        res.send({
            todo
        });


    }).catch((err) => {
        res.status(400).send();
    });
});

// Delete todo
app.delete('/todo/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findByIdAndDelete(id).then((todo) => {
        if (!todo) {
            res.status(400).send();
        }
        res.status(200).send(todo);
    }).catch((err) => {
        res.status(400).send();
    })
});

app.listen(port, () => {
    console.log(`Starting up at port  ${port}`);
});


module.exports = {
    app
}