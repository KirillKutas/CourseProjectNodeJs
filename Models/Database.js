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
  mobilePhone: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true
  }
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
  mobilePhone: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

const Resume = sequelize.define("Resume", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  position: {
    type: Sequelize.STRING,
    allowNull: false
  },
  education: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

const Languages = sequelize.define("Languages", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  language: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

const Skills = sequelize.define("Skills", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  skill: {
    type: Sequelize.STRING,
    allowNull: false
  }
});
const Vacancies = sequelize.define("Vacancies", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  position: {
    type: Sequelize.STRING,
    allowNull: false
  },
  salary: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  experience: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  }
})
const LanguagesForVacancies = sequelize.define("LanguagesForVacancies", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  language: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

const SkillsForVacancies = sequelize.define("SkillsForVacancies", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  skill: {
    type: Sequelize.STRING,
    allowNull: false
  }
});
const Chats = sequelize.define("Chats", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  message: {
    type: Sequelize.STRING,
    allowNull: false
  },
  employerId: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  chatId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})
const Enrolment = sequelize.define("Enrolment",{
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  ChatId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

User.hasOne(Resume, { onDelete: "cascade" });
User.hasOne(Enrolment, { onDelete: "cascade" });
Employer.hasOne(Vacancies, { onDelete: "cascade" });
Employer.hasOne(Enrolment, { onDelete: "cascade" });
Resume.hasOne(Languages, { onDelete: "cascade" });
Resume.hasOne(Skills, { onDelete: "cascade" });
Vacancies.hasOne(LanguagesForVacancies, { onDelete: "cascade" });
Vacancies.hasOne(SkillsForVacancies, { onDelete: "cascade" });



exports.User = User;
exports.Employer = Employer;
exports.Resume = Resume;
exports.Languages = Languages;
exports.Skills = Skills;
exports.Vacancies = Vacancies;
exports.LanguagesForVacancies = LanguagesForVacancies;
exports.SkillsForVacancies = SkillsForVacancies;
exports.Chats = Chats;
exports.Enrolment = Enrolment;

sequelize.sync().then(result => {
  console.log(result);
})
  .catch(err => console.log(err));