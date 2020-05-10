const Sequelize = require("sequelize");
const sequelize = new Sequelize("CourseProject", "kp", "1234", {
    dialect: "mssql",
    host: "localhost",
    port: "1433"
});
const Employer = sequelize.define("Employer", {
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
    companyName: {
    type: Sequelize.STRING,
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
sequelize.sync().then(result=>{
    console.log(result);
  })
  .catch(err=> console.log(err));

  exports.Create = function(company){
    Employer.create({
        password: company.password,
        companyName: company.companyName,
        email: company.email,
        mobilePhone: company.mobilePhone
      }).then(res=>{
        console.log(res);
      }).catch(err=>console.log(err));
  }
  exports.GetSomeEmployer = async function(mail){
    var empClass;
    await Employer.findAll({ where: { email: mail }, raw: true })
      .then(user => {
        if(user[0] == undefined) return;
        empClass = new SomeEmployer(user[0]);
      }).catch(err => console.log(err));
      return empClass;
  }

  class SomeEmployer{
      constructor(data){
          this.id = data.id;
          this.email = data.email;
          this.password = data.password;
          this.companyName = data.companyName;
          this.mobilePhone = data.mobilePhone;
      }
  }

  exports.Employer = SomeEmployer;