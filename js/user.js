const express = require('express');

module.exports = function userModule(model) {
    const userRouter = express.Router();

    userRouter.get('/users', (req, res, next) => {
        model.User.findAll().then(user => {
            res.json(user);
        });
    });

    userRouter.get('/users/:id', (req, res, next) => {
        var id = req.params.id;
        model.User.findOne({
            where: {
                id: id
            }
        }).then(function (user) {
            if (user) {
                res.json(user);
            } else {
                res.status(404).json();
            }
        });
    });

    userRouter.post('/users', (req, res, next) => {
        var input = req.body;
        model.User.create(input).then(function (user) {
            res.json(user);
        });
    });

    userRouter.put('/users/:id', (req, res, next) => {
        var input = req.body;
        var id = req.params.id;
        model.User.update({
            name: input.name,
            password: input.password,
            email: input.email, 
            age: input.age
        }, {
                where: {
                    id: id
                }
            }).then(function (user) {
                res.json(user);
            });
    });

    userRouter.delete('/users/:id', (req, res, next) => {
        var id = req.params.id;
        model.User.destroy({
            where: {
                id: id
            }
        }).then(function (user) {
            res.json(user);
        });
    });

    return userRouter;
};
