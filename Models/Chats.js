const db = require("../Models/Database.js");
const Chats = db.Chats;
const Enrolment = db.Enrolment;
const User = db.User;
const Employer = db.Employer;

exports.CreateChat = async function (interviewersId, id, user) {
    let chatId;
    let exist;
    if (user == "false") {
        await Enrolment.findAll({
            where: {
                UserId: interviewersId,
                EmployerId: id
            }, raw: true
        }).then(res => {

            if (res[0] == undefined)
                exist = false;
            else
                exist = true;
        })
    }
    else {
        await Enrolment.findAll({
            where: {
                UserId: id,
                EmployerId: interviewersId
            }, raw: true
        }).then(res => {
            if (res[0] == undefined)
                exist = false;
            else
                exist = true;
        })
    }
    if (!exist) {
        await Enrolment.findAll({ raw: true }).then(result => {
            if (result[0] == undefined) {
                chatId = 1;
            }
            else {
                chatId = result[result.length - 1].ChatId + 1;
            }
        })
        if (user == "false") {
            await Enrolment.create({
                ChatId: chatId,
                UserId: interviewersId,
                EmployerId: id
            }).then(res => { })
        }
        else {
            await Enrolment.create({
                ChatId: chatId,
                UserId: id,
                EmployerId: interviewersId
            }).then(res => { })
        }
    }
}
exports.GetChatsEmployer = async function(id){
    let result;
    await Enrolment.findAll({where:{
        EmployerId: id
    }, raw: true}).then(res =>{
        result = res;
    })
    return result;
}
exports.GetChatsUser = async function(id){
    let result;
    await Enrolment.findAll({where:{
        UserId: id
    }, raw: true}).then(res =>{
        result = res;
    })
    return result;
}
exports.GetUser = async function(id){
    let result;
    await User.findByPk(id).then(res=>{
        result=res;
    })
    return result;
}
exports.GetID = async function(chatID, user){
    let result;
    await Enrolment.findAll({where: {
        ChatId: chatID
    }, raw: true}).then(res =>{
        if(user == "false"){
            result = res[0].UserId;
        }
        else{
            result = res[0].EmployerId;
        }
    })
    return result;
}
exports.CreateMessage = async function(chatID, employer, user, message, i, eou){
    console.log(eou);
    if(eou == "false"){
        await Chats.create({
            chatId: chatID,
            message: message,
            employerId: employer
        })
    }
    else{
        await Chats.create({
            chatId: chatID,
            message: message,
            userId: user
        })
    }
}
exports.GetMessages = async function(chatID){
    let result;
    await Chats.findAll({where: {
        chatId: chatID
    }, raw: true}).then(res =>{
        result = res;
    })
    return result;
}
exports.GetUserName = async function(id){
    let result;
    await User.findByPk(id).then(res=>{
        result = res.name + " " + res.surname;
    })
    return result;
}
exports.GetCompanyName = async function(id){
    let result;
    await Employer.findByPk(id).then(res=>{
        result = res.companyName;
    })
    return result;
}
exports.DeleteChat = async function(id){
    await Chats.destroy({where: { chatId: id}});
    await Enrolment.destroy({where: {ChatId: id}})
}
