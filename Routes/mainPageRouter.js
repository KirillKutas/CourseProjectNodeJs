const express = require("express");
const mainPage = require("../Controllers/mainPageController.js");
const homeRouter = express.Router();
 
homeRouter.get("/mpA", mainPage.mpA);
homeRouter.get("/mpE", mainPage.mpE);
homeRouter.get("/chats",mainPage.chats);
homeRouter.get("/myAccE", mainPage.myAccE);
homeRouter.get("/myAccA", mainPage.myAccA);
homeRouter.get("/myResume", mainPage.myResume);
homeRouter.get("/myVacancies", mainPage.myVacancies);
homeRouter.post("/search", mainPage.search);

 
module.exports = homeRouter;