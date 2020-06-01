let db = require("../Models/Database.js")
const User = db.User;

exports.GetAllUsers = async function () {
  let result;
  await User.findAll({ raw: true }).then(users => {
    result =  users;
  }).catch(err => console.log(err));
  return result;
}
exports.GetSomeUser = async function (mail) {
  var userClass;
  await User.findAll({ where: { email: mail }, raw: true })
    .then(user => {
      if (user[0] == undefined) return;
      userClass = new SomeUser(user[0]);
    }).catch(err => console.log(err));
  return userClass;
}
exports.GetSomeUserId = async function (id) {
  
  var userClass;
  await User.findAll({ where: { id: id }, raw: true })
    .then(user => {
      if (user[0] == undefined) return;
      userClass = user[0]
    }).catch(err => console.log(err));
  return userClass;
}

exports.Create = function (data) {
  User.create({
    password: data.password,
    name: data.name,
    surname: data.surname,
    email: data.email,
    mobilePhone: data.mobilePhone,
    age: data.age
  }).then(res => {
    console.log(res);
  }).catch(err => console.log(err));
}
exports.Update = async function (id, data) {
  console.log(data);
  await User.update({
    name: data.name,
    surname: data.surname,
    email: data.email,
    mobilePhone: data.mobilePhone,
    age: data.age,
    description: data.description
  },{where:{
    id: id
  }}).then(result =>{console.log(result)});
}

class SomeUser {
  constructor(data) {
    this.email = data.email;
    this.password = data.password;
    this.id = data.id;
    this.name = data.name;
    this.surname = data.surname;
    this.age = data.age;
    this.description = data.description;
    this.mobileTelephone = data.mobilePhone;
  }
}
exports.User = SomeUser;