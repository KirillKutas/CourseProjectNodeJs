const express = require("express");
const userManagerController = require("../Controllers/userManagerController.js");
const homeRouter = express.Router();
 
homeRouter.get("/", userManagerController.login);
homeRouter.use("/registrationApplicant", userManagerController.applicant);
homeRouter.use("/registrationEmployer", userManagerController.employer);
homeRouter.post("/SignIn", userManagerController.SignIn);
homeRouter.post("/SignUpEmployer",userManagerController.SignUpEmployer);
homeRouter.post("/SignUpUser", userManagerController.SignUpUser);
 
module.exports = homeRouter;