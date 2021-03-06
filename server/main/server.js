import jwt from 'express-jwt';
import express from 'express';
import jsonwebtoken from 'jsonwebtoken';
import bodyParser from 'body-parser';
import UserDao from './dao/UserDao.js';
import cors from 'cors';
var app = express();
const sKey = 'shhhhhhared-secret';
var userDao = new UserDao();
var userList = [];
app.use(cors({
    origin:'http://localhost:4200'
  }));
  
app.use(bodyParser.json());

app.post('/login', function (req, res)
{   
    console.log("hi");
    console.log(req.body.data.userName);
    console.log(JSON.stringify(req.body));
    console.log(req.body.data.userName+ " " +req.body.data.password);
    userDao.userLogin(req.body.data.userName, req.body.data.password).then(function(user){
        console.log(user);
        console.log(user);
        if(user.length != 0)
        {
            console.log(user[0].userId);
            var token = jsonwebtoken.sign({userId: user[0].userId}, sKey, {expiresIn: '2h'});
            console.log(token);
            res.json({token,"user":user[0]});
        }else
        {
            res.status(400).send("");
        }
    }).catch((err) => setImmediate(() => { console.log(err); }));

})

app.get('/admin', jwt({ 
    secret: sKey , algorithms: ['HS256'] }) ,function (req, res) {
    userDao.findById(req.user.userId).then(function(user){
        if(user[0].role == "admin")
        {
            userDao.getUsers().then(function(rows) {
        
                res.status(200).send(rows);
    
            }).catch((err) => setImmediate(() => { throw err; }));
        }
        else
        {
            res.status(400).send("Not an admin");
        }

    })
})
app.get('/user', jwt({
    secret: sKey , algorithms: ['HS256'] }) ,function (req, res) {
    userDao.findById(req.user.userId).then(function(user) {
        console.log(req.user.userId);
        res.send(user);

    }).catch((err) => setImmediate(() => { throw err; }));

})

app.post('/admin',function (req, res) {
    userDao.addUserAdmin(req.body.data.userName, req.body.data.password, req.body.data.role);
    res.send(req.body);
  })
app.post('/user',function (req, res) {
    userDao.addUser(req.body.data.userName, req.body.data.password);
    res.send();
  })
app.patch('/user',jwt({
    secret: sKey , algorithms: ['HS256'] }) ,function (req, res) {
        console.log(req.user.userId, req.body.userName);
    userDao.findById(req.user.userId).then(function(user) {
        userDao.updateUser(req.user.userId, req.body.userName, req.body.password,req.body.repassword);
        res.send(user);

    }).catch((err) => setImmediate(() => { throw err; }));

})
app.patch('/admin',jwt({
    secret: sKey , algorithms: ['HS256'] }) ,function (req, res) {
        console.log(req.user.userId + req.body.userName);
    // userDao.findById(req.user.userId).then(function(user) {
       
    //     userDao.updateUser(req.user.userId, req.body.userName, req.body.password,req.body.repassword, req.body.role);
    //     res.send(user);

    // }).catch((err) => setImmediate(() => { throw err; }));

})

app.delete('/user',jwt({
    secret: sKey , algorithms: ['HS256'] }) ,function (req, res) {
        console.log("entering delete")
        userDao.findById(req.user.userId).then(function(user){
           
            userDao.findById(req.body.deleteId).then(function(user){
               
                    userDao.deleteUser(req.body.deleteId);
                    res.send(req.body);
                   
                }).catch((err) => setImmediate(() => { throw err; }));
        
    }).catch((err) => setImmediate(() => { throw err; }));
})

app.delete('/admin',jwt({
    secret: sKey , algorithms: ['HS256'] }) ,function (req, res) {
        console.log("entering delete")
        userDao.findById(req.user.userId).then(function(user){
            if(user[0].role == "admin")
            {
                userDao.findById(req.body.deleteId).then(function(user){
                    if(user[0].role == "admin")
                    {
                        res.status(400).send("Can't delete an Admin");
                    }
                    else 
                    {
                        userDao.deleteUser(req.body.deleteId);
                        res.status(200).send("Deleted");
                       
                    }
                    
                 }).catch((err) => setImmediate(() => { throw err; }));
            }
            else
            {
                res.status(400).send("Not an admin");
            }
    }).catch((err) => setImmediate(() => { throw err; }));
})


var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("listening at http://%s:%s", host, port)
})