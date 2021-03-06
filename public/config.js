(function() {
    angular
        .module('WAM')
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider

            .when('/', {
                templateUrl: 'views/home/templates/home.html',
                controller: 'mainController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/savedPost', {
                templateUrl: 'views/post/templates/post-list-saved.view.client.html',
                controller: 'postListSavedController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/post/new', {
                templateUrl: 'views/post/templates/post-new.view.client.html',
                controller: 'postNewController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/post', {
                templateUrl: 'views/post/templates/post-list.view.client.html',
                controller: 'postListController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/post/:postId/edit', {
                templateUrl: 'views/post/templates/post-edit.view.client.html',
                controller: 'postEditController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/post/:postId/display', {
                templateUrl: 'views/post/templates/post-display.view.client.html',
                controller: 'postDisplayController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/userSearch', {
                templateUrl: 'views/search/templates/usersearch.view.client.html',
                controller: 'userSearchController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/publisher', {
                templateUrl: 'views/user/templates/publisher-list.view.client.html',
                controller: 'publisherListController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/reader', {
                templateUrl: 'views/user/templates/reader-list.view.client.html',
                controller: 'readerListController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/publisher/:publisherId/display', {
                templateUrl: 'views/post/templates/post-list-display.view.client.html',
                controller: 'postListDisplayController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when('/search', {
                templateUrl: 'views/search/templates/search.view.client.html',
                controller: 'searchController',
                controllerAs: 'model'
            })
            .when('/login', {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'model'
            })
            .when('/admin/user', {
                templateUrl: 'views/admin/templates/admin-user.view.client.html',
                controller: 'adminUserController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAdmin
                }
            })
            .when('/admin/user/new', {
                templateUrl: 'views/admin/templates/admin-user-new.view.client.html',
                controller: 'adminUserController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAdmin
                }
            })
            .when('/admin/post', {
                templateUrl: 'views/admin/templates/admin-post.view.client.html',
                controller: 'adminUserController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAdmin
                }
            })
            .when('/admin/comment', {
                templateUrl: 'views/admin/templates/admin-comment.view.client.html',
                controller: 'adminUserController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAdmin
                }
            })
            .when('/register', {
                templateUrl: 'views/user/templates/register.view.client.html',
                controller: 'registerController',
                controllerAs: 'model'
            })
            .when('/profile', {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/profile/edit', {
                templateUrl: 'views/user/templates/profile-edit.view.client.html',
                controller: 'profileEditController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            });
    }

        function checkLoggedIn(userService, $q, $location) {
            var deferred = $q.defer();

            userService
                .loggedIn()
                .then(function (user) {
                    if(user === '0') {
                        deferred.reject();
                        $location.url('/login');

                    } else {
                        deferred.resolve(user);
                    }
                });

            return deferred.promise;
        }
    function checkCurrentUser($q, $location, userService) {
        var deferred = $q.defer();
        userService
            .loggedIn()
            .then(function (currentUser) {
                if(currentUser === '0') {
                    deferred.resolve({});
                } else {
                    deferred.resolve(currentUser)
                }
            });
        return deferred.promise;
    }

    function checkAdmin($q, $location, userService) {
        var deferred = $q.defer();
        userService
            .checkAdmin()
            .then(function (currentUser) {
                if(currentUser === '0') {
                    deferred.resolve({});
                    $location.url('/');
                } else {
                    deferred.resolve(currentUser);
                }
            });
        return deferred.promise;
    }
})();
