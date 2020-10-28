
import mysql from 'mysql';
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
        var msg = 'insert users(username,password,role) value(\''+username+'\',\''+password+'\',\'user\')';
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
    addUser(username,password,role){
        var msg = 'insert users(username,password,role) value(\''+username+'\',\''+password+'\',\''+role+'\')';
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