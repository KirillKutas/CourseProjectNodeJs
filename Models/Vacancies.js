const db = require("../Models/Database.js");
const Vacancies = db.Vacancies;
const Skills = db.SkillsForVacancies;
const Languages = db.LanguagesForVacancies;
const { Op } = require("sequelize");

exports.CreateVacancies = async function (id, data) {
    let VacancieId;
    await Vacancies.create({
        position: data.position,
        salary: data.salary,
        experience: data.experience,
        description: data.description,
        EmployerId: id
    }).then(res => { VacancieId = res.id });
    await CreateSkills(VacancieId, data);
    await CreateLanguages(VacancieId, data);
}
async function CreateSkills(id, data) {
    data.skills.forEach(async element => {
        await Skills.create({
            skill: element,
            VacancyId: id
        })
    })
}
async function CreateLanguages(id, data) {
    data.languages.forEach(async element => {
        await Languages.create({
            language: element,
            VacancyId: id
        })
    })
}

exports.GetVacancies = async function (id) {
    let result;
    result = await Vacancies.findAll({ raw: true, where: { EmployerId: id } });
    return result;
}
exports.GetVacanciesById = async function (id) {
    let result;
    result = await Vacancies.findAll({ raw: true, where: { id: id } });
    return result;
}
exports.GetSkill = async function () {
    let result;
    result = await Skills.findAll({ raw: true });
    return result;
}
exports.GetLanguages = async function () {
    let result;
    result = await Languages.findAll({ raw: true });
    return result;
}
exports.UpdateVanacy = async function (id, data) {
    await Vacancies.update({
        position: data.position,
        salary: data.salary,
        experience: data.experience,
        description: data.description
    }, { where: { id: data.id } }).then(res => {

    })
    await Skills.destroy({ where: { VacancyId: data.id } })
    await Languages.destroy({ where: { VacancyId: data.id } })
    data.languages.forEach(element => {
        Languages.create({ language: element, VacancyId: data.id }).then(lang => {
        })
    });
    data.skills.forEach(element => {
        Skills.create({ skill: element, VacancyId: data.id }).then(sk => {
        })
    })
}
exports.Delete = async function (id) {
    await Vacancies.destroy({ where: { id: id } });
}
exports.GetAllVacancies = async function () {
    let result;
    await Vacancies.findAll({ raw: true }).then(res => {
        result = res;
    })
    return result;
}
exports.GetSkillById = async function (id) {
    let result;
    result = await Skills.findAll({ raw: true, where: { VacancyId: id } });
    return result;
}
exports.GetLanguagesById = async function (id) {
    let result;
    result = await Languages.findAll({ raw: true, where: { VacancyId: id } });
    return result;
}
exports.Search = async function (str) {
    let result;
    await Vacancies.findAll({
        where: {
            position: {
                [Op.substring]: str
            }
        }
    }).then(res => {
        result = res;
    })
    return result;
}
exports.filter = async function (exp, from, to) {
    let result;
    if (exp == "Not use" && from == "") {
        await Vacancies.findAll({
            raw: true, where: {
                salary: {
                    [Op.lte]: Number(to)
                }
            }
        }).then(res => {
            result = res;
        })
        return result;
    }
    if (exp == "Not use" && to == "") {
        await Vacancies.findAll({
            raw: true, where: {
                salary: {
                    [Op.gt]: Number(from)
                }
            }
        }).then(res => {
            result = res;
        })
        return result;
    }
    if (exp == "Not use") {
        await Vacancies.findAll({
            raw: true, where: {
                salary: {
                    [Op.between]: [Number(from), Number(to)]
                }
            }
        }).then(res => {
            result = res;
        })
        return result;
    }
    if (exp != "Not use" && from != "" && to != "") {
        await Vacancies.findAll({
            raw: true, where: {
                salary: {
                    [Op.between]: [Number(from), Number(to)]
                },
                experience: exp
            }
        }).then(res => {
            result = res;
        })
        return result;
    }
    if (exp != "Not use" && to == "") {
        await Vacancies.findAll({
            raw: true, where: {
                salary: {
                    [Op.gt]: Number(from)
                },
                experience: exp
            }
        }).then(res => {
            result = res;
        })
        return result;
    }
    if (exp != "Not use" && from == "") {
        await Vacancies.findAll({
            raw: true, where: {
                salary: {
                    [Op.lte]: Number(to)
                },
                experience: exp
            }
        }).then(res => {
            result = res;
        })
        return result;
    }
    if (from == "" && to == "" && exp != "Not use") {
        await Vacancies.findAll({
            raw: true, where: {
                experience: exp
            }
        }).then(res => {
            result = res;
        })
        return result;
    }
    if(exp == "Not use" && from == "" && to == ""){
        await Vacancies.findAll({
            raw: true
        }).then(res => {
            result = res;
        })
        return result;
    }
}