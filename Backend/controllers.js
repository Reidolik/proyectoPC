angular.module('myNameApp')
    .controller('nameController', function ($scope, $http, $window) {
        $scope.tempUser = {};
        $scope.getUser = function () {
            $http.post('http://localhost:4001/login', {
                email: $scope.tempUser.email,
                password: $scope.tempUser.password
            })
                .then((data, status, headers, config) => {
                    console.log(data);
                    $window.location.href = '#!/products';
                    $scope.tempUser = {};
                })
                .catch((error, status, headers, config) => {
                    console.log(error);
                });
        };
    })
    .controller('productController', function ($scope, $http) {
        //obtener productos de la BD
        $scope.id = -1;
        $scope.products = [];
        $http.get('http://localhost:4001/product')
            .then(function (data) {
                console.log(data);
                $scope.products = data.data;
                console.log($scope.products);
            }).catch(err => {
                console.log(err);
            });
        //Obtener datos de categoria para mostrar en tabla
        $scope.categories = [];
        $http.get('http://localhost:4001/category')
            .then(function (data) {
                console.log(data);
                $scope.categories = data.data;
                console.log($scope.categories);
            }).catch(err => {
                console.log(err);
            });
        //actualizar datos de tabla
        function updateTable() {
            $http.get('http://localhost:4001/product')
                .then(function (data) {
                    console.log(data);
                    $scope.products = data.data;
                    console.log($scope.products);
                }).catch(err => {
                    console.log(err);
                });
        }
        //Agregar nuevo producto a la BD
        $scope.newProduct = {};
        $scope.addNewProduct = function () {
            $http.post('http://localhost:4001/product', {
                title: $scope.newProduct.title,
                price: $scope.newProduct.price,
                quantity: $scope.newProduct.quantity,
                categoryId: $scope.newProduct.categoryId
            })
                .then((data, status, headers, config) => {
                    console.log(data);
                    $scope.products.push($scope.newProduct);
                    $scope.newProduct = {};
                    updateTable();
                })
                .catch((error, status, headers, config) => {
                    console.log(error);
                });
        };
        $scope.modProduct = function () {
            $http.put('http://localhost:4001/product/' + $scope.id, {
                title: $scope.newProduct.title,
                price: $scope.newProduct.price,
                quantity: $scope.newProduct.quantity,
                categoryId: $scope.newProduct.categoryId
            })
                .then((data, status, headers, config) => {
                    console.log(data);
                    updateTable();
                    $scope.newProduct = {};
                    $scope.id = -1;
                })
                .catch((error, status, headers, config) => {
                    console.log(error);
                });
        };
        $scope.deleteProduct = function () {
            $http.delete('http://localhost:4001/product/' + $scope.id)
                .then((data, status, headers, config) => {
                    console.log(data);
                    updateTable();
                    $scope.newProduct = {};
                    $scope.id = -1;
                })
                .catch((error, status, headers, config) => {
                    console.log(error);
                });
        };
    })
    .controller('categoryController', function ($scope, $http) {
        $scope.id;
        $scope.categories = [];
        //obtener productos de la BD
        $http.get('http://localhost:4001/category')
            .then(function (data) {
                console.log(data);
                $scope.categories = data.data;
                console.log($scope.categories);
            }).catch(err => {
                console.log(err);
            });
        //actualizar datos de tabla
        function updateTable() {
            $http.get('http://localhost:4001/category')
                .then(function (data) {
                    console.log(data);
                    $scope.categories = data.data;
                    console.log($scope.categories);
                }).catch(err => {
                    console.log(err);
                });
        }
        //Agregar nuevo producto a la BD
        $scope.newCategory = {};
        $scope.addNewCategory = function () {
            $http.post('http://localhost:4001/category', {
                title: $scope.newCategory.title
            })
                .then((data, status, headers, config) => {
                    console.log(data);
                    $scope.categories.push($scope.newCategory);
                    $scope.newCategory = {};
                    updateTable();
                })
                .catch((error, status, headers, config) => {
                    console.log(error);
                });
        };
        $scope.modCategory = function () {
            $http.put('http://localhost:4001/category/' + $scope.id, {
                title: $scope.newCategory.title
            })
                .then((data, status, headers, config) => {
                    console.log(data);
                    console.log($scope.id);
                    updateTable();
                    $scope.newCategory = {};
                    $scope.id = -1;
                })
                .catch((error, status, headers, config) => {
                    console.log(error);
                });
        };
        $scope.deleteCategory = function () {
            $http.delete('http://localhost:4001/category/' + $scope.id)
                .then((data, status, headers, config) => {
                    console.log(data);
                    updateTable();
                    $scope.newCategory = {};
                    $scope.id = -1;
                })
                .catch((error, status, headers, config) => {
                    console.log(error);
                });
        };
    });