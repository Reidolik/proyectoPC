const express = require('express');
var bodyParser = require('body-parser');
var app = express();
const Sequelize = require('sequelize');
const sequelize = new Sequelize('products_category', 'root', '', {
    dialect: 'mysql'
});

const PORT = process.env.PORT || 4001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


var model = {};
model.sequelize = sequelize;

model.User = sequelize.define('user', {
    name: { type: Sequelize.STRING, allowNull: false },
    password: { type: Sequelize.STRING, allowNull: false },
    email: { type: Sequelize.STRING, allowNull: false },
    age: { type: Sequelize.STRING, allowNull: false }
});

model.Product = sequelize.define('product', {
    title: { type: Sequelize.STRING, allowNull: false },
    price: { type: Sequelize.INTEGER, allowNull: false },
    quantity: { type: Sequelize.INTEGER, allowNull: false },
});

model.Category = sequelize.define('category', {
    title: { type: Sequelize.STRING, allowNull: false }
});

model.Category.hasMany(model.Product);
model.Product.belongsTo(model.Category);

sequelize.sync();

app.use('/', require('./js/product')(model));
app.use('/', require('./js/category')(model));
app.use('/', require('./js/user')(model));
app.use('/', require('./js/login')(model));


app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});