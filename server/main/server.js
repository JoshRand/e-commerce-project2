import express from 'express';
import bodyParser from 'body-parser';
import UserDao from './dao/UserDao.js';
var app = express();
var userDao = new UserDao();
var userList = [];
var paramss;

app.get('/users', function (req, res) {
    
    userDao.getUsers().then(function(rows) {
        res.send(rows);
        console.log(rows);
        console.log(rows[0].username);
    }).catch((err) => setImmediate(() => { throw err; }));
    
})
app.use(bodyParser.json());
app.post('/user',function (req, res) {
    userDao.addUser(req.body.username);
    res.send(req.body)
  })

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})

console.log("hi");