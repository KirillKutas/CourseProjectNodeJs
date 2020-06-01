let db = require("../Models/Database.js")
const Employer = db.Employer;

exports.Create = function (company) {
  Employer.create({
    password: company.password,
    companyName: company.companyName,
    email: company.email,
    mobilePhone: company.mobilePhone
  }).then(res => {
  }).catch(err => console.log(err));
}
exports.GetSomeEmployer = async function (mail) {
  var empClass;
  await Employer.findAll({ where: { email: mail }, raw: true })
    .then(user => {
      if (user[0] == undefined) return;
      empClass = new SomeEmployer(user[0]);
    }).catch(err => console.log(err));
  return empClass;
}

exports.GetEmployerById = async function (id) {
  let result;
  await Employer.findByPk(id).then(res => {
    result = res;
  })
  return result;
}
exports.UpdateEmployerById = async function (id, data) {
  await Employer.update({
    companyName: data.companyName,
    email: data.email,
    mobilePhone: data.mobilePhone,
    description: data.description
  }, { where: { id: id } })
}

exports.GetAllEmployers = async function(){
  let result;
  await Employer.findAll({raw: true}).then(res =>{
    result = res;
  })
  return result;
}

class SomeEmployer {
  constructor(data) {
    this.id = data.id;
    this.email = data.email;
    this.password = data.password;
    this.companyName = data.companyName;
    this.mobilePhone = data.mobilePhone;
  }
}

exports.Employer = SomeEmployer;