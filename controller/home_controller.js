module.exports.home = function(request, respond){
    // return respond.end('<h1>Express is up for PlacementCell APP!</h1>');

    console.log(request.cookie);
    respond.cookie('user_id', 25);
    
    return respond.render('home', {
        title: "home"
    });
}