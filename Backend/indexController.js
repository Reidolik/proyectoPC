angular.module('myNameApp', ['ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider
        .when('/',{
            controller: "nameController",
            templateUrl: "templates/log.html"
        })
        .when('/products', {
            controller: "productController",
            templateUrl: "templates/product.html"
        })
        .when('/categories', {
            controller: "categoryController",
            templateUrl: "templates/category.html"
        })
    });

    //21/08 - 7 horas
    //20/08 - 4 horas
    //19/08 - 2 horas
    //extras - 2 horas
