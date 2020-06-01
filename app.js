const express = require("express");
const { createClient } = require('webdav')
const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 8080 })
const app = express();
const bodyParser = require("body-parser");
const loginRouter = require("./Routes/userManagerRouter.js");
const mainPage = require("./Routes/mainPageRouter.js");
const hbs = require("hbs");
var path = require('path');
const expressHbs = require("express-handlebars");
const cookieParser = require('cookie-parser');
const fs = require('fs');
const https = require('https');
const cert = {
    key: fs.readFileSync('./Cert/resourcePrivateKey.key', 'utf8'),
    cert: fs.readFileSync('./Cert/resourceCert.crt', 'utf8')
};


app.use(cookieParser('secret key'));
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/mainPage/partials");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'Public')));

wss.on('connection', (ws) => {
    ws.on('message',async (message) => {
        console.log(message);
    })
})

app.use("/", function (request, response, next) {
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
app.use("/mainPage", function (request, response, next) {
    app.engine("hbs", expressHbs(
        {
            layoutsDir: "views/mainPage/layouts",
            defaultLayout: "mainPageLayout",
            extname: "hbs"
        }
    ));
    next();
})
app.use("/mainPage", mainPage);

app.use(function (req, res, next) {
    res.status(404).send("Not Found");
});

const httpsServer = https.createServer(cert, app);
httpsServer.listen(3000, () => {
    console.log('Listening to https://localhost:3000/');
});