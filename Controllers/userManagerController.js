const Users = require("../Models/Users.js");
const Employers = require("../Models/Employer.js");
const argon2 = require("argon2");

exports.login = function (request, response) {
    response.render("userManager/login.hbs");
};
exports.applicant = function (request, response) {
    response.render("userManager/registrationApplicant.hbs");
};
exports.employer = function (request, response) {
    response.render("userManager/registrationEmployer.hbs");
};
function errorLogin(response) {
    response.render("userManager/login.hbs", {
        Error: "Wrong email or password"
    });
}
exports.SignIn = async function (request, response) {
    const userMail = request.body.mail;
    const userPassword = request.body.password;

    var user = await Users.GetSomeUser(userMail);
    if (user == undefined) {
        var employer = await Employers.GetSomeEmployer(userMail);
        if (employer == undefined) {
            errorLogin(response);
        }
        else {
            if (await argon2.verify(employer.password, userPassword)) {
                response.cookie('id', employer.id);
                response.cookie('user', false);
                response.redirect("/mainPage/mpE");
            }
            else {
                errorLogin(response);
            }
        }
    }
    else {
        if (await argon2.verify(user.password, userPassword)) {
            response.cookie('id', user.id);
            response.cookie('user', true);
            response.redirect("/mainPage/mpA");
        }
        else {
            errorLogin(response);
        }
    }
}
exports.SignUpEmployer = async function (request, response) {
    const companyName = request.body.companyName;
    const mobilePhone = request.body.mobilePhone;
    const companyMail = request.body.mail;
    const companyPassword = await argon2.hash(request.body.password);

    const newEmployer = {
        mobilePhone: mobilePhone,
        password: companyPassword,
        companyName: companyName,
        email: companyMail
    }
    if (newEmployer.password == "" || newEmployer.companyName == "" || newEmployer.email == "" || newEmployer.mobilePhone == "") {
        response.render("userManager/registrationEmployer.hbs", {
            Error: "All fields must be filled in"
        })
    }
    else {
        let us = await Employers.GetAllEmployers();
        let flag = true;
        us.forEach(elemnt => {
            if (elemnt.email == newEmployer.email) {
                flag = false;
            }
        })
        if (flag) {
            Employers.Create(newEmployer);

            response.redirect("/");
        }
        else {
            response.render("userManager/registrationEmployer.hbs", {
                Error: "This user already exists"
            })
        }

    }

}
exports.SignUpUser = async function (request, response) {
    const name = request.body.name;
    const surname = request.body.surname;
    const age = request.body.age;
    const mobilePhone = request.body.mobilePhone;
    const email = request.body.mail;
    const password = await argon2.hash(request.body.password);

    const newUser = {
        password: password,
        name: name,
        surname: surname,
        email: email,
        mobilePhone: mobilePhone,
        age: age
    }
    if (newUser.password == "" || newUser.name == "" || newUser.surname == "" || newUser.email == "" || newUser.mobilePhone == "" || newUser.age == "") {
        response.render("userManager/registrationApplicant.hbs", {
            Error: "All fields must be filled in"
        })
    }
    else {
        let us = await Users.GetAllUsers();
        let flag = true;
        us.forEach(elemnt => {
            if (elemnt.email == newUser.email) {
                flag = false;
            }
        })
        if (flag) {
            Users.Create(newUser);

            response.redirect("/");
        }
        else {
            response.render("userManager/registrationApplicant.hbs", {
                Error: "This user already exists"
            })
        }

    }

}