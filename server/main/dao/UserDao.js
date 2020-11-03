import fs from 'fs';
import mysql from 'mysql';
import { resolve } from 'path';
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'ecommerce',
    insecureAuth : true
});
con.connect((err) => {
    if(err)
    {
        console.log('error thrown while connecting');
        console.log(err);
    }
    else
        console.log('connected!');
})
class UserDao
{
    constructor()
    {

    }
    testFunction()
    {
        console.log("heyya");
    }
    getProfilePic(userId)
    { 
        return new Promise((resolve,reject)=>{
            try {
                con.query('select * from users where userId=\''+userId+'\';',(err,users) => {
                    var path = "../main/assets/"+users[0].profilePicture;
                    console.log(users[0].profilePicture);
                    console.log(path);
                    fs.readFile(path,'base64',function(err,result){
                        //console.log(result);
                        resolve(result);

                    });
                   
                })
            }catch(error){

            }
        });
    
    }
    savePicture(userId,data)
    {
        console.log("Data from picture = " + data);
        var pictureName = "profile_pic_user_"+userId+".jpg"
        var path = "../main/assets/"+pictureName;
        const dataPic = data.replace(/^data:.*,/,'');
        console.log(dataPic);
        fs.writeFile(path,dataPic,'base64', function(err,result){
            if(err)
            {
                console.log(err);
            }
            else
            {

            }
        });
        var msg = 'update users set profilePicture=\''+pictureName+'\' where userId=\''+userId+'\';';
        con.query(msg,(err,rows) => {
            if(err)
                console.log("error updating user");
            else
                console.log("successfully updated user");
        });
    }

    userLogin(userName, password)
    {
        return new Promise((resolve,reject)=>{
            try {
                con.query('select * from users where userName=\''+userName+'\' and password=\''+password+'\';',(err,user) => {
                    if(err)
                        console.log("User Doesn't Exist");
                    console.log("data successfully found from db:");
                    resolve(user);
                });
            } catch (error) {
                
            }
        });
    }

    findById(userId)
    {
        return new Promise((resolve,reject)=>{
            try {
                con.query('select * from users where userId=\''+userId+'\';',(err,user) => {
                    if(err)
                        console.log("User Doesn't Exist");
                    console.log("data successfully found from db:");
                    resolve(user);
                });
            } catch (error) {
                
            }
            

     });
    }

    getUsers()
    {
       
        return new Promise((resolve,reject)=>{
            try {
                con.query('select * from users',(err,rows) => {
                    // if(err)
                    //     throw err;
                    console.log("data successfully found from db:");
                   resolve(rows);
                });
            } catch (error) {
                
            }
            

     });
    }
    addUser(username,password){
        let user="user";
        var msg = 'insert users(username,password,role,profilepicture) value(\''+username+'\',\''+password+'\', \''+user+'\', \''+"defaultProfilePic.jpg"+'\')';
       try {
        con.query(msg,(err,rows) => {
            
            //     throw err;
            if(err)
                console.log("duplicate username or error");
            else
                console.log("added to db");
         
        });
       } catch (error) {
           
       }
    }
    addUserAdmin(username,password,role){
        var msg = 'insert users(username,password,role,profilepicture) value(\''+username+'\',\''+password+'\',\''+role+'\', \''+"defaultProfilePic.jpg"+'\')';
       try {
        con.query(msg,(err,rows) => {
            
            //     throw err;
            if(err)
                console.log("duplicate username or error");
            else
                console.log("added to db");
         
        });
       } catch (error) {
           
       }
    }
 deleteUser(deleteId)
    {
        try {
            con.query('delete from users where userId=\''+deleteId+'\';',(err,user) => {
                if(err)
                    console.log("User Doesn't Exist");
                console.log("data successfully deleted from db:");
                
            });
        } catch (error) {
            
        }
    }
    updateUser(userId, userName, password, repassword){
        try {
            con.query('select * from users where userId=\''+userId+'\';',(err,rows) => {
                console.log("data successfully found from db:");
                var uname;
                var pass;
                if(userName === "" || userName === rows[0].userName)
                {
                    uname = rows[0].userName;
                }
                else
                    uname = userName;
                if(password === "" || password === rows[0].password)
                {
                    pass = rows[0].password;
                }
                else
                    pass = password;
               
                if(password === repassword)
                {
                
                    var msg = 'update users set userName=\''+uname+'\', password=\''+pass+'\' where userId=\''+userId+'\';';
                    con.query(msg,(err,rows) => {
                        if(err)
                            console.log("error updating user");
                        else
                            console.log("successfully updated user");
                    });
                }
                else
                {
                    console.log("a user with this name exists");
                }
                
        
            });
        } catch (error) {
            
        }
        
    }
}
export default UserDao;