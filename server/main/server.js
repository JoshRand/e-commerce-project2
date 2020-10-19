import express from 'express';
import bodyParser from 'body-parser';
import UserDao from './dao/UserDao.js';
import session from 'express-session';
import cookieParser from 'cookie-parser';
var app = express();
var userDao = new UserDao();
var userList = [];

app.use(cookieParser());
app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));
app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');        
    }
    next();
});

app.get('/users', function (req, res) {
    
    userDao.getUsers().then(function(rows) {
        res.send(rows);

    }).catch((err) => setImmediate(() => { throw err; }));

})

app.use(bodyParser.json());
app.post('/user',function (req, res) {
    userDao.addUser(req.body.username, req.body.password, req.body.role);
    res.send(req.body)
  })
app.patch('/user',function (req, res)
{   
    userDao.updateUser(req.body.userId, req.body.userName, req.body.password,req.body.repassword, req.body.role);
    res.send(req.body);
})

app.post('/login')

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})

console.log("hi");