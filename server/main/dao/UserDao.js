
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
    getUsers()
    {
        return new Promise((resolve,reject)=>{

            con.query('select * from users',(err,rows) => {
                if(err)
                    throw err;
                console.log("data from db:");
               resolve(rows);
            });

         
     });
    }
    addUser(uname){
        var msg = 'insert users(username) value(\''+uname+'\')';
        con.query(msg,(err,rows) => {
            if(err)
                throw err;
            console.log("added to db");
         
        });
    }

}
export default UserDao;