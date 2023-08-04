module.exports.profile = function(request, respond){
    // return respond.end('<h1>User Profile Placement cell APP</h1>');

    return respond.render('user_profile', {
        title: "user_profile"
    });
}

// render the sign up page
module.exports.signUp = function(request, respond){
    return respond.render('user_sign_up', {
        title: "Placement Cell | Sign Up"
    })
}

// render the sign in page
module.exports.signIn = function(request, respond){
    return respond.render('user_sign_in',{
        title: "Placement Cell | Sign In"
    })
}

// get the signUp data
module.exports.create = function(request, respond){
    // TODO Later
}

// get the signIn data
module.exports.createSession = function(request, respond){
    // TODO Later
}