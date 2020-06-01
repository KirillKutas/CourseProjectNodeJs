let db = require("../Models/Database.js")
const Resume = db.Resume;
const User = db.User;
const Languages = db.Languages;
const Skills = db.Skills;

exports.CreateResume = async function (id, data) {
    let resumeId;
    await User.findByPk(id).then(async user => {
        if (!user) return;
        await Resume.create({
            position: data.position,
            education: data.education
        }).then(async resume => {
            resumeId = resume.id;
            user.setResume(resume).catch(err => console.log(err));
        })
    })
    await Resume.findByPk(resumeId).then(resume => {
        data.languages.forEach(element => {
            Languages.create({ language: element, ResumeId: resumeId }).then(lang => {
            })
        });

    })
    await Resume.findByPk(resumeId).then(resume => {
        data.skills.forEach(element => {
            Skills.create({ skill: element, ResumeId: resumeId }).then(sk => {
            })
        })

    })
}
exports.GetResume = async function (id) {
    let result = {};
    await User.findByPk(id).then(async user => {
        if (!user) return;
        result[0] = user;
        await user.getResume().then(async resume => {
            if (!resume) return;
            result[1] = resume;
        });
    });
    if (result[1] != undefined) {
        await Skills.findAll({ where: { ResumeId: result[1].id }, raw: true }).then(skills => {
            result[2] = skills;
        })
        await Languages.findAll({ where: { ResumeId: result[1].id }, raw: true }).then(languages => {
            result[3] = languages;
        })
    }
    return result;
}
exports.deleteResume = async function (deleteId) {
    await Resume.destroy({ where: { UserId: deleteId } })
}
exports.updateResume = async function (id, data) {
    let resumeId;
    await Resume.update({
        position: data.position,
        education: data.education
    }, { where: { UserId: id } }).then(res => {

    });
    await User.findByPk(id).then(async user => {
        if (!user) return;
        await user.getResume().then(async resume => {
            if (!resume) return;
            resumeId = resume.id;
        });
    });
    await Skills.destroy({ where: { ResumeId: resumeId } })
    await Languages.destroy({ where: { ResumeId: resumeId } })
    data.languages.forEach(element => {
        Languages.create({ language: element, ResumeId: resumeId }).then(lang => {
        })
    });
    data.skills.forEach(element => {
        Skills.create({ skill: element, ResumeId: resumeId }).then(sk => {
        })
    })
}
exports.GetAllResume = async function(){
    let result;
    await Resume.findAll({raw: true,order:[ ['updatedAt', 'DESC']]}).then(resumes => {
        result = resumes;
    })
    return result;
}
exports.GetAllSkills = async function(){
    let result;
    await Skills.findAll({raw: true}).then(skills =>{
        result = skills;
    })
    return result;
}