const Sequelize = require("sequelize");
const sequelize = new Sequelize("CourseProject", "kp", "1234", {
    dialect: "mssql",
    host: "localhost",
    port: "1433"
});
const Employer = sequelize.define("Resume", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  }
});
sequelize.sync().then(result=>{
    console.log(result);
  })
  .catch(err=> console.log(err));

 