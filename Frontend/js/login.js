const express = require('express');

module.exports = function loginModule(model) {
    const loginRouter = express.Router();
    
    loginRouter.post('/login', (req, res, next) => {
        var input = req.body;
        model.User.findOne({
            where: {
                email: input.email,
                password: input.password
            }
        }).then(function (user) {
            if (user) {
                res.json(user);
            } else {
                res.status(404).json();
            }
        });
    });

    return loginRouter;
};