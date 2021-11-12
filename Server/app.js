// const, let, var
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();

global.secretKey = "KcEZJZYhpwVY79ZjZvJX6puc5HDonUel";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// wwwroot
app.use('/images', express.static('images'));

const login = require("./services/login");
app.use('/api/login', login);

app.use((req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader)
        return res.sendStatus(404);

    const token = authHeader.split(' ')[1];
    jwt.verify(token, global.secretKey, (err, user) => {
        if(err) 
            return res.sendStatus(404);

        req.user = user;
        next();
    });
});

app.get('/verify', (req, res) => {
    const token = jwt.sign({ Name : req.user.Name , Surname : req.user.Surname }, global.secretKey, {
        expiresIn : '1h'
    });

    res.json({
        user : req.user,
        token : token
    });
});

app.get('/test', (req, res) => {
    res.send("test");
});

app.get('/', (req, res) => {
    const { Name, Surname} = req.user;
    res.send(`Selam ${Name} ${Surname}`);
});

app.listen(5001, () => {
    console.log("5001 portu dinlemeye başlandı");
});