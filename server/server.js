// Library imports
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');


var {ObjectID} = require('mongodb');

// Local imports
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

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
        res.status(200).send({
            todo
        });
    }).catch((err) => {
        res.status(400).send();
    })
});

// update todo
app.patch('/todo/:id', (req, res) => {

    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {
        $set: body
    }, {
        new: true
    }).then((todo) => {
        if (!todo) {
            res.status(400).send();
        }
        res.send({
            todo
        });

    }).catch((err) => {
        res.status(400).send();
    })


});

// Create User

app.post('/users',(req,res) => {

    var body = _.pick(req.body,['email','password']);

    // var user = new User({
    //     email:req.body.email,
    //     password:req.body.password
    // });

    var user = new User({body});

    user.save().then((user) => {
        res.send(user);
    }).catch((err) => {
        res.status(400).send();
    });

});



app.listen(port, () => {
    console.log(`Starting up at port  ${port}`);
});


module.exports = {
    app
}