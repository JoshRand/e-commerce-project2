import jwt from 'express-jwt';
import express from 'express';
import jsonwebtoken from 'jsonwebtoken';
import bodyParser from 'body-parser';
import UserDao from './dao/UserDao.js';
import cookieParser from 'cookie-parser';

var app = express();
const sKey = 'shhhhhhared-secret';
var userDao = new UserDao();
var userList = [];


app.get('/users', jwt({ 
    secret: sKey , algorithms: ['HS256'] }) ,function (req, res) {
    
    userDao.getUsers().then(function(rows) {
        res.send(rows);

    }).catch((err) => setImmediate(() => { throw err; }));

})
app.get('/user', jwt({ 
    secret: sKey , algorithms: ['HS256'] }) ,function (req, res) {
    userDao.findById(req.user.userId).then(function(user) {
        console.log(req.user.userId);
        res.send(user);

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

app.post('/login', function (req, res)
{   
    userDao.findUser(req.body.userName, req.body.password).then(function(user){
        console.log(user[0].userId);
        var token = jsonwebtoken.sign({userId: user[0].userId}, sKey, {expiresIn: '2h'});
        res.json({token,"user":user[0]});
    }).catch((err) => setImmediate(() => { throw err; }));

})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("listening at http://%s:%s", host, port)
})