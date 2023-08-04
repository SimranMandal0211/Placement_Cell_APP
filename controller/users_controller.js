module.exports.profile = function(request, respond){
    // return respond.end('<h1>User Profile Placement cell APP</h1>');

    return respond.render('user_profile', {
        title: "user_profile"
    });
}