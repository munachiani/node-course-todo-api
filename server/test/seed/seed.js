const {
    ObjectID
} = require('mongodb');

const {
    Todo
} = require('./../../models/todo');

const jwt = require('jsonwebtoken');

const {
    User
} = require('./../../models/user');

const userOneID = new ObjectID();
const userTwoID = new ObjectID();

const users = [{
    _id: userOneID,
    email: 'test@test.com',
    password: 'userpass1',
    tokens: [{
        access: 'auth',
        token: jwt.sign({
            _id: userOneID,
            access: 'auth'
        }, 'abcd').toString()
    }]
}, {
    _id: userTwoID,
    email: 'test2@test.com',
    password: 'userpass2'
}]



const todos = [{
        _id: new ObjectID(),
        text: 'first test todo'
    },
    {
        _id: new ObjectID(),
        text: 'second test todo',
        completed: true,
        completedAt: 1542658959735
    }
];

const populateTodos = (done) => {
    Todo.deleteMany({}).then(() => {
        return Todo.insertMany(todos);

    }).then(() => {
        done();
    });
};

const popuateUsers = (done) => {
    User.deleteMany({}).then(() => {
        var user1 = new User(users[0]).save();
        var user2 = new User(users[1]).save();

        return Promise.all([user1, user2])
    }).then(() => {
        done();
    });
};

module.exports = {
    todos,
    populateTodos,
    users,
    popuateUsers
};