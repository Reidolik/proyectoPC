const express = require('express');
var call = express();
var bodyParser = require('body-parser');
call.use(bodyParser.urlencoded({ extended: false }));
call.use(bodyParser.json());


var app = angular.module('loginApp', []);
app.controller('logController', function ($scope) {
    $scope.log = function(){
        var result = call.use('/', require('../js/login')(model));
        $scope.email = document.getElementById("inputEmail").value;
        $scope.pass = document.getElementById("inputPassword").value;
        if (result.email === $scope.email) {
            $window.location.href= "products/product.html";
        } else {
            console.log('No jalo');
        }
    };
});