exports.mpA = function(request, response){
    response.render("mainPage/mainPageApplicant.hbs",{
        User: true,
        Empl: false
    });
}
exports.mpE = function(request, response){
    response.render("mainPage/mainPageEmployer.hbs",{
        User: false,
        Empl: true
    });
}
exports.chats = function(request,response){
    response.render("mainPage/chats.hbs",{
        User: false,
        Empl: true
    })
}
exports.myAccA = function(request,response){
    response.render("mainPage/myAccountApplicant.hbs",{
        User: false,
        Empl: true
    })
}
exports.myAccE = function(request, response){
    response.render("mainPage/myAccountEmployer.hbs",{
        User: false,
        Empl: true
    })
}
exports.myResume = function(request, response){
    response.render("mainPage/myResume.hbs",{
        User: false,
        Empl: true
    });
}
exports.myVacancies = function(request,response){
    response.render("mainPage/myVacancies.hbs",{
        User: false,
        Empl: true
    });
}
exports.search = function(request,response){
    response.render("mainPage/search.hbs",{
        User: false,
        Empl: true
    });
}