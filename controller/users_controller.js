const User = require('../models/user');


module.exports.profile = async function(request, respond){
    // return respond.end('<h1>User Profile Placement cell APP</h1>');

    return respond.render('user_profile', {
        title: "user_profile"
    });

    // try {
    //     if (request.cookies.user_id) {
    //         let user = await User.findById(request.cookies.user_id).exec();
    //         if (user) {
    //             return respond.render('user_profile', {
    //                 title: "User profile",
    //                 user: user
    //             });
    //         } else {
    //             return respond.redirect('/users/sign-in');
    //         }
    //     } else {
    //         return respond.redirect('/users/sign-in');
    //     }
    // } catch (err) {
    //     console.log('Error in finding user in profile:', err);
    //     return respond.status(500).send('Internal Server Error');
    // }
}

// render the sign up page
module.exports.signUp = function(request, respond){
    if(request.isAuthenticated()){
        return respond.redirect('/users/profile');
    }
    
    return respond.render('user_sign_up', {
        title: "Placement Cell | Sign Up"
    })
}

// render the sign in page
module.exports.signIn = function(request, respond){
    if(request.isAuthenticated()){
        return respond.redirect('/users/profile');
    }
    
    return respond.render('user_sign_in',{
        title: "Placement Cell | Sign In"
    })
}

// get the signUp data
module.exports.create = async function(request, respond) {
    try {
        // Check if password and confirm_password match
        if (request.body.password !== request.body.confirm_password) {
            return respond.redirect('back');
        }

        // Check if a user with the given email exists
        const existingUser = await User.findOne({ email: request.body.email });

        if (!existingUser) {
            // Create a new user
            const newUser = await User.create(request.body);
            return respond.redirect('/users/sign-in');
        } else {
            return respond.redirect('back'); // User already exists, redirect back
        }
    } catch (err) {
        console.log('Error:', err);
        return respond.redirect('back'); // Handle errors by redirecting back
    }
};

// get the signIn data
module.exports.createSession = async function (request, respond) {
    return respond.redirect('/');

    // try {
    //    let user = await User.findOne({ email: request.body.email });

    //     if (user) {
    //         if (user.password === request.body.password) {
    //             // Create a session by setting a user_id cookie
    //             respond.cookie('user_id', user.id);
    //             return respond.redirect('/users/profile');
    //         } else {
    //             return respond.redirect('back'); // Passwords don't match
    //         }
    //     } else {
    //         return respond.redirect('back'); // User not found
    //     }
    // } catch (err) {
    //     console.log('Error:', err);
    //     return respond.redirect('back'); // Handle errors by redirecting back
    // }
};

module.exports.destroySession = function(request, respond){
    request.logout(function(err) {
        if (err) {
            console.error('Error destroying session:', err);
        }
        return respond.redirect('/');
    });
};