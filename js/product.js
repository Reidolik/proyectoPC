const express = require('express');

module.exports = function productModule(model) {
    const productRouter = express.Router();

    productRouter.get('/product', (req, res, next) => {
        model.Product.findAll().then(product => {
            res.json(product);
        });
    });

    productRouter.get('/product/:id', (req, res, next) => {
        var id = req.params.id;
        model.Product.findOne({
            where: {
                id: id
            }
        }).then(product => {
            if (product) {
                res.json(product);
            } else {
                res.status(404).json();
            }
        });
    });

    productRouter.post('/product', (req, res, next) => {
        var input = req.body;
        model.Product.create(input).then(product => {
            res.json(product);
        });
    });

    productRouter.put('/product/:id', (req, res, next) => {
        var input = req.body;
        var id = req.params.id;
        model.Product.update({
            title: input.title,
            price: input.price,
            quantity: input.quantity,
            categoryId: input.categoryId
        }, {
                where: {
                    id: id
                }
            }).then(product => {
                res.json(product);
            });
    });

    productRouter.delete('/product/:id', (req, res, next) => {
        var id = req.params.id;
        model.Product.destroy({
            where: {
                id: id
            }
        }).then(product => {
            res.json(product);
        });
    });

    return productRouter;
};