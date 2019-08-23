const express = require('express');

module.exports = function categoryModule(model) {
    const categoryRouter = express.Router();

    categoryRouter.get('/category', (req, res, next) => {
        model.Category.findAll().then(category => {
            res.json(category);
        });
    })

    categoryRouter.get('/category/:id', (req, res, next) => {
        var id = req.params.id;
        model.Category.findOne({
            where: {
                id: id
            }
        }).then(category => {
            if (category) {
                res.json(category);
            } else {
                res.status(404).json();
            }
        });
    });

    categoryRouter.post('/category', (req, res, next) => {
        var input = req.body;
        model.Category.create(input).then(category => {
            res.json(category);
        });
    });

    categoryRouter.put('/category/:id', (req, res, next) => {
        var input = req.body;
        var id = req.params.id;
        model.Category.update({
            title: input.title
        }, {
                where: {
                    id: id
                }
            }).then(category => {
                res.json(category);
            });
    });

    categoryRouter.delete('/category/:id', (req, res, next) => {
        var id = req.params.id;
        model.Category.destroy({
            where: {
                id: id
            }
        }).then(category => {
            res.json(category);
        });
    });

    return categoryRouter;
};