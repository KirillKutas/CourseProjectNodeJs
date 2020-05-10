const Sequelize = require("sequelize");
const sequelize = new Sequelize("CourseProject", "kp", "1234", {
  dialect: "mssql",
  host: "localhost",
  port: "1433"
});
const User = sequelize.define("Users", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  surname: {
    type: Sequelize.STRING,
    allowNull: false
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  mobilePhone:{
    type: Sequelize.STRING,
    allowNull: false
}
});
sequelize.sync().then(result => {
  console.log(result);
})
  .catch(err => console.log(err));

exports.GetAllUsers = function () {
  User.findAll({ raw: true }).then(users => {
    console.log(users);
    return users;
  }).catch(err => console.log(err));
}
exports.GetSomeUser = async function (mail) {
  var userClass;
  await User.findAll({ where: { email: mail }, raw: true })
    .then(user => {
      if(user[0] == undefined) return;
      userClass = new SomeUser(user[0]);
    }).catch(err => console.log(err));
    return userClass;
}

exports.Create = function(data){
  User.create({
      password: data.password,
      name: data.name,
      surname: data.surname,
      email: data.email,
      mobilePhone: data.mobilePhone,
      age: data.age
    }).then(res=>{
      console.log(res);
    }).catch(err=>console.log(err));
}

class SomeUser{
  constructor(data){
    this.email = data.email;
    this.password = data.password;
    this.id = data.id;
    this.name = data.name;
    this.surname = data.surname;
    this.age = data.age;
  }
}
exports.User = SomeUser;