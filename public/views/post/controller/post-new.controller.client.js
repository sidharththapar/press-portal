(function () {
    angular
        .module('WAM')
        .controller('postNewController', postNewController);

    function postNewController($location, currentUser, postService) {

        var model = this;

        model.username = currentUser.firstName;
        model.userId = currentUser._id;
        // model.getArticlesForUser = getArticlesForUser;

        function init() {
            userService
                .findPostsById(model.userId)
                .then(renderUser, userError);

            renderUser(currentUser);
        }
        init();



        // function getArticlesForUser(userId) {
        //     userService
        //         .getArticles(userId)
        //         .then(renderArticles);
        // }
        //
        // function renderArticles(articles) {
        //     model.articles = articles;
        // }


        function renderUser (user) {
            model.user = user;
        }

        function userError(error) {
            model.error = "User not found";
        }

    }
})();