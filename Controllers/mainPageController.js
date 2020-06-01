const Resume = require("../Models/Resume.js");
const User = require("../Models/Users.js");
const Employer = require("../Models/Employer.js");
const Vacancy = require("../Models/Vacancies.js");
const Chats = require("../Models/Chats.js");

exports.mpA = async function (request, response) {
    let vacancies = await Vacancy.GetAllVacancies();
    let skills = await Vacancy.GetSkill();
    let employers = await Employer.GetAllEmployers();
    let result = [];

    vacancies.forEach(element => {
        let skillsStr = "";
        skills.forEach(res => {
            if (element.id == res.VacancyId) {
                skillsStr += res.skill + " ";
            }
        })
        let companyName;
        employers.forEach(res => {
            if (element.EmployerId == res.id) {
                companyName = res.companyName;
            }
        })
        let forResult = {
            id: element.id,
            skills: skillsStr,
            position: element.position,
            name: companyName
        }
        result.push(forResult);
    })

    response.render("mainPage/mainPageApplicant.hbs", {
        User: true,
        Empl: false,
        data: result
    });
}
exports.filter = async function(request,response){
    let exp = request.body.Experience1;
    let from = request.body.From1;
    let to = request.body.To1;
    let vacancies = await Vacancy.filter(exp,from,to);
    let skills = await Vacancy.GetSkill();
    let employers = await Employer.GetAllEmployers();
    let result = [];
    console.log(exp);
    vacancies.forEach(element => {
        let skillsStr = "";
        skills.forEach(res => {
            if (element.id == res.VacancyId) {
                skillsStr += res.skill + " ";
            }
        })
        let companyName;
        employers.forEach(res => {
            if (element.EmployerId == res.id) {
                companyName = res.companyName;
            }
        })
        let forResult = {
            id: element.id,
            skills: skillsStr,
            position: element.position,
            name: companyName
        }
        
        result.push(forResult);
    })
    response.render("mainPage/mainPageApplicant.hbs", {
        User: true,
        Empl: false,
        data: result
    });
}
exports.mpE = async function (request, response) {
    let resume = await Resume.GetAllResume();
    let users = await User.GetAllUsers();
    let skills = await Resume.GetAllSkills();

    let skillsResult = [];
    let userNames = [];
    let positions = [];
    let userId = [];
    let interviewersId = []

    resume.forEach(element => {
        let skillstr = "";
        skills.forEach(skill => {
            if (skill.ResumeId == element.id) {
                skillstr = skillstr + skill.skill + " ";
            }
        })
        skillsResult.push(skillstr);
        positions.push(element.position);
        userId.push(element.UserId);
        interviewersId.push(element.UserId);
    })
    userId.forEach(element => {
        users.forEach(us => {
            if (us.id == element) {
                userNames.push(us.name + " " + us.surname);
                return;
            }
        })
    })
    let result = [];

    for (let a = 0; a < userNames.length; a++) {
        let oneResume = {
            skills: skillsResult[a],
            name: userNames[a],
            position: positions[a],
            id: userId[a]
        }
        result.push(oneResume);
    }
    response.render("mainPage/mainPageEmployer.hbs", {
        User: false,
        Empl: true,
        data: result
    });
}
exports.chatsA = async function (request, response) {
    let chats = await Chats.GetChatsUser(request.cookies.id);
    let employer = await Employer.GetAllEmployers();
    let data = [];
    chats.forEach(element => {
        employer.forEach(res => {
            if (element.EmployerId == res.id) {
                let forData = {
                    companyName: res.companyName,
                    chatId: element.ChatId
                }
                data.push(forData);
            }
        })
    })
    response.render("mainPage/chatsA.hbs", {
        User: true,
        Empl: false,
        data: data
    })
}
exports.chatsE = async function (request, response) {
    let chats = await Chats.GetChatsEmployer(request.cookies.id);
    let person = await User.GetAllUsers();
    let data = [];
    chats.forEach(element => {
        person.forEach(res => {
            if (element.UserId == res.id) {
                let forData = {
                    PersonName: res.name + " " + res.surname,
                    chatId: element.ChatId
                }
                data.push(forData);
            }
        })
    })
    response.render("mainPage/chatsE.hbs", {
        User: false,
        Empl: true,
        data: data
    })
}
exports.myAccA = async function (request, response) {
    let user = await User.GetSomeUserId(request.cookies.id);
    let descnull;
    if (user.description == null)
        descnull = true;
    else
        descnull = false;
    response.render("mainPage/myAccountApplicant.hbs", {
        User: true,
        Empl: false,
        personName: user.surname + " " + user.name,
        age: user.age,
        email: user.email,
        mobileTelephone: user.mobilePhone,
        description: user.description,
        descNull: descnull
    })
}
exports.myAccE = async function (request, response) {
    let emp = await Employer.GetEmployerById(request.cookies.id);
    let descnull;
    if (emp.description == null)
        descnull = true;
    else
        descnull = false;
    response.render("mainPage/myAccountEmployer.hbs", {
        User: false,
        Empl: true,
        descNull: descnull,
        email: emp.email,
        mobileTelephone: emp.mobilePhone,
        description: emp.description,
        companyName: emp.companyName
    })
}
exports.myResume = async function (request, response) {
    const result = await Resume.GetResume(request.cookies.id);
    if (result[2] != undefined) {
        response.render("mainPage/myResume.hbs", {
            User: true,
            Empl: false,
            resume: true,
            PersonName: result[0].name + " " + result[0].surname,
            age: result[0].age,
            telephone: result[0].mobilePhone,
            mail: result[0].email,
            position: result[1].position,
            education: result[1].education,
            skills: result[2],
            Languages: result[3]
        });
    }
    else {
        response.render("mainPage/myResume.hbs", {
            User: true,
            Empl: false,
            resume: false
        });
    }

}
exports.myVacancies = async function (request, response) {
    let vacancies = await Vacancy.GetVacancies(request.cookies.id);
    let skill = await Vacancy.GetSkill();
    let result = [];
    if (vacancies != false) {
        vacancies.forEach(element => {
            let skillsStr = "";
            skill.forEach(res => {
                if (res.VacancyId == element.id) {
                    skillsStr += res.skill + " ";
                }
            })
            let forResult = {
                id: element.id,
                position: element.position,
                skills: skillsStr
            };
            result.push(forResult);
        })
    }

    response.render("mainPage/myVacancies.hbs", {
        User: false,
        Empl: true,
        data: result
    });
}
exports.searchA = async function (request, response) {
    let seacrhStr = request.body.search;
    let vacancies = await Vacancy.Search(seacrhStr);
    let skills = await Vacancy.GetSkill();
    let employers = await Employer.GetAllEmployers();
    let result = [];
    vacancies.forEach(element => {
        let skillsStr = "";
        skills.forEach(res => {
            if (element.id == res.VacancyId) {
                skillsStr += res.skill + " ";
            }
        })
        let companyName;
        employers.forEach(res => {
            if (element.EmployerId == res.id) {
                companyName = res.companyName;
            }
        })
        let forResult = {
            id: element.id,
            skills: skillsStr,
            position: element.position,
            name: companyName
        }
        result.push(forResult);
    })
    response.render("mainPage/searchA.hbs", {
        User: true,
        Empl: false,
        data: result
    });
}
exports.searchE = function (request, response) {
    response.render("mainPage/searchE.hbs", {
        User: false,
        Empl: true
    });
}
exports.logout = function (request, response) {
    response.redirect("/");
}
exports.clickCreateResume = function (request, response) {
    response.render("mainPage/CreateForm/Resume.hbs", {
        change: false,
    });
}
exports.saveResume = async function (request, response) {
    let data = {
        position: request.body.Position,
        education: request.body.Education,
        skills: request.body.Skills.split(';'),
        languages: request.body.Languages.split(';')
    }
    await Resume.CreateResume(request.cookies.id, data);
    const result = await Resume.GetResume(request.cookies.id);
    response.render("mainPage/myResume.hbs", {
        User: true,
        Empl: false,
        resume: true,
        PersonName: result[0].name + " " + result[0].surname,
        age: result[0].age,
        telephone: result[0].mobilePhone,
        mail: result[0].email,
        position: result[1].position,
        education: result[1].education,
        skills: result[2],
        Languages: result[3]
    });
}
exports.deleteResume = function (request, response) {
    Resume.deleteResume(request.cookies.id);
    response.render("mainPage/myResume.hbs", {
        User: true,
        Empl: false,
        resume: false
    });
}
exports.changeResume = async function (request, response) {
    const result = await Resume.GetResume(request.cookies.id);
    let skill = "";
    let language = "";
    result[2].forEach(element => {
        skill = skill + element.skill + ";"
    });
    skill = skill.slice(0, skill.length - 1);
    result[3].forEach(element => {
        language = language + element.language + ";"
    });
    language = language.slice(0, language.length - 1);
    response.render("mainPage/CreateForm/Resume.hbs", {
        User: true,
        Empl: false,
        change: true,
        position: result[1].position,
        education: result[1].education,
        skills: skill,
        Languages: language
    });
}
exports.UpdateResume = async function (request, response) {
    let data = {
        position: request.body.Position,
        education: request.body.Education,
        skills: request.body.Skills.split(';'),
        languages: request.body.Languages.split(';')
    }
    await Resume.updateResume(request.cookies.id, data);
    const result = await Resume.GetResume(request.cookies.id);
    response.render("mainPage/myResume.hbs", {
        User: true,
        Empl: false,
        resume: true,
        PersonName: result[0].name + " " + result[0].surname,
        age: result[0].age,
        telephone: result[0].mobilePhone,
        mail: result[0].email,
        position: result[1].position,
        education: result[1].education,
        skills: result[2],
        Languages: result[3]
    });
}
exports.EditAF = async function (request, response) {
    let user = await User.GetSomeUserId(request.cookies.id);

    response.render("mainPage/CreateForm/AccountInformation.hbs", {
        User: true,
        Empl: false,
        surname: user.surname,
        name: user.name,
        age: user.age,
        email: user.email,
        mobileTelephone: user.mobilePhone,
        description: user.description
    });
}
exports.EditAInf = async function (request, response) {
    let information = {
        name: request.body.Name,
        surname: request.body.Surname,
        email: request.body.Email,
        mobilePhone: request.body.MobileTelephone,
        age: request.body.Age,
        description: request.body.Description
    }
    await User.Update(request.cookies.id, information);
    response.redirect('/mainPage/myAccA');
}
exports.checkSomeResume = async function (request, response) {
    let result = await Resume.GetResume(request.body.id);

    response.render("mainPage/resume.hbs", {
        User: false,
        Empl: true,
        PersonName: result[0].name + " " + result[0].surname,
        age: result[0].age,
        telephone: result[0].mobilePhone,
        mail: result[0].email,
        position: result[1].position,
        education: result[1].education,
        skills: result[2],
        Languages: result[3],
        interviewersId: result[0].id
    })
}
exports.checkSomeVacancy = async function (request, response) {
    let vacancy = await Vacancy.GetVacanciesById(request.body.id);
    let skills = await Vacancy.GetSkillById(request.body.id);
    let languages = await Vacancy.GetLanguagesById(request.body.id);

    response.render("mainPage/someVacancy.hbs", {
        User: true,
        Empl: false,
        Position: vacancy[0].position,
        Salary: vacancy[0].salary,
        Experience: vacancy[0].experience,
        Skills: skills,
        Languages: languages,
        interviewersId: vacancy[0].EmployerId,
        Description: vacancy[0].description
    })
}
exports.editCompanyInformation = async function (request, response) {
    let emp = await Employer.GetEmployerById(request.cookies.id);
    response.render("mainPage/CreateForm/EAI.hbs", {
        User: false,
        Empl: true,
        companyName: emp.companyName,
        email: emp.email,
        mobileTelephone: emp.mobilePhone,
        description: emp.description
    });
}
exports.saveCompanyInformation = async function (request, response) {
    let data = {
        companyName: request.body.CompanyName,
        email: request.body.Email,
        mobilePhone: request.body.MobileTelephone,
        description: request.body.Description
    }
    await Employer.UpdateEmployerById(request.cookies.id, data);
    response.redirect("/mainPage/myAccE");
}
exports.CreateVacancie = async function (request, response) {
    response.render("mainPage/CreateForm/Vacancie.hbs", {
        User: false,
        Empl: true,
        change: false
    })
}
exports.SaveVacancie = async function (request, response) {
    let data = {
        position: request.body.Position,
        salary: request.body.Salary,
        experience: request.body.Experience,
        description: request.body.Description,
        skills: request.body.Skills.split(';'),
        languages: request.body.Languages.split(';')
    }
    await Vacancy.CreateVacancies(request.cookies.id, data);
    response.redirect("/mainPage/myVacancies");
}
exports.Vacancy = async function (request, response) {
    let id = request.body.currentId;
    let vacancies = await Vacancy.GetVacancies(request.cookies.id);
    let skill = await Vacancy.GetSkill();
    let language = await Vacancy.GetLanguages();
    if (vacancies != false) {
        vacancies.forEach(element => {
            if (element.id == id) {
                let skillsStr = "";
                let languageStr = "";
                skill.forEach(res => {
                    if (res.VacancyId == element.id) {
                        skillsStr += res.skill + " ";
                    }
                })
                language.forEach(res => {
                    if (res.VacancyId == element.id) {
                        languageStr += res.language + " ";
                    }
                })
                response.render("mainPage/Vacancy.hbs", {
                    User: false,
                    Empl: true,
                    Position: element.position,
                    Salary: element.salary,
                    Experience: element.experience,
                    Description: element.description,
                    Languages: languageStr,
                    Skills: skillsStr,
                    id: element.id
                })
            }
        })
    }
}
exports.EditVacancy = async function (request, response) {
    let id = request.body.id;
    console.log(id);
    let vacancies = await Vacancy.GetVacancies(request.cookies.id);
    let skill = await Vacancy.GetSkill();
    let language = await Vacancy.GetLanguages();
    if (vacancies != false) {
        vacancies.forEach(element => {
            if (element.id == id) {
                let skillsStr = "";
                let languageStr = "";
                skill.forEach(res => {
                    if (res.VacancyId == element.id) {
                        skillsStr += res.skill + ";";
                    }
                })
                skillsStr = skillsStr.slice(0, skillsStr.length - 1);
                language.forEach(res => {
                    if (res.VacancyId == element.id) {
                        languageStr += res.language + ";";
                    }
                })
                languageStr = languageStr.slice(0, languageStr.length - 1);
                response.render("mainPage/CreateForm/Vacancie", {
                    User: false,
                    Empl: true,
                    position: element.position,
                    salary: element.salary,
                    description: element.description,
                    languages: languageStr,
                    skills: skillsStr,
                    change: true,
                    id: element.id
                })
            }
        })
    }
}
exports.UpdateVacancy = async function (request, response) {
    let data = {
        id: request.body.id,
        position: request.body.Position,
        salary: request.body.Salary,
        experience: request.body.Experience,
        description: request.body.Description,
        skills: request.body.Skills.split(';'),
        languages: request.body.Languages.split(';')
    }
    await Vacancy.UpdateVanacy(request.cookies.id, data);
    response.redirect("/mainPage/myVacancies");
}
exports.DeleteVacancy = async function (request, response) {
    let id = request.body.id;
    await Vacancy.Delete(id);
    response.redirect("/mainPage/myVacancies");
}
exports.CreateChat = async function (request, response) {
    let interviewersId = request.body.interviewersId;
    let user = request.body.user
    await Chats.CreateChat(interviewersId, request.cookies.id, user);
    if (user == "false") {
        response.redirect("/mainPage/chatsE");
    }
    else {
        response.redirect("/mainPage/chatsA");
    }

}
exports.OpenChat = async function (request, response) {
    let chatId = request.body.id;
    let id = await Chats.GetID(chatId, request.body.user)
    if (request.body.user == "false") {
        response.render("mainPage/chat.hbs", {
            User: false,
            Empl: true,
            employer: request.cookies.id,
            user: id,
            chatId: chatId,
            i: request.cookies.id,
            eou: request.body.user
        })
    }
    else {
        response.render("mainPage/chat.hbs", {
            User: true,
            Empl: false,
            employer: id,
            user: request.cookies.id,
            chatId: chatId,
            i: request.cookies.id,
            eou: request.body.user
        })
    }

}
exports.Messages = async function (request, response) {
    await Chats.CreateMessage(request.body.chatId, request.body.employer, request.body.user, request.body.message, request.body.i, request.body.eou);
}
exports.GetMessages = async function (request, response) {
    let data = await Chats.GetMessages(request.body.chatId);
    let name = await Chats.GetUserName(request.body.user);
    let companyName = await Chats.GetCompanyName(request.body.employer);
    let result = [];
    data.forEach(element => {
        if (element.userId == null) {
            let forResult = {
                who: companyName + ": ",
                message: element.message
            }
            result.push(forResult);
        }
        else {
            let forResult = {
                who: name + ": ",
                message: element.message
            }
            result.push(forResult);
        }

    })
    response.contentType = 'application/json;charset=utf-8';
    response.end(JSON.stringify(result));
}
exports.deleteChat = async function (request, response) {
    await Chats.DeleteChat(request.body.id);
    if (request.body.user == "false") {
        response.redirect("/mainPage/chatsE");
    }
    else {
        response.redirect("/mainPage/chatsA");
    }
}