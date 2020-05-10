const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const loginRouter = require("./Routes/userManagerRouter.js");
const mainPage = require("./Routes/mainPageRouter.js");
const hbs = require("hbs");
var path = require('path');
const expressHbs = require("express-handlebars");


app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/mainPage/partials");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'Public')));

app.use("/",function(request, response, next){
    app.engine("hbs", expressHbs(
        {
            layoutsDir: "views/mainPage/layouts", 
            defaultLayout: "loginLayout",
            extname: "hbs"
        }
    ));
    next();
})
app.use("/", loginRouter);
app.use("/mainPage",function(request, response, next){
    app.engine("hbs", expressHbs(
        {
            layoutsDir: "views/mainPage/layouts", 
            defaultLayout: "mainPageLayout",
            extname: "hbs"
        }
    ));
    next();
})
app.use("/mainPage",mainPage);

app.use(function (req, res, next) {
    res.status(404).send("Not Found");
});

app.listen(3000);