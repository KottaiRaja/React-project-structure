const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const mysql = require('mysql');
const fileupload = require('express-fileupload');
const e = require('express');
const { response } = require('express');

const app = express();
app.use(cors());
app.use(bodyparser.json());
app.use(express.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(fileupload());

var c = mysql.createConnection({
    host : "localhost",
    user:"root",
    password : "Kgisl@2022",
    database : "res"
});

c.connect(function(err){
    if(err){console.log(err);}
    else{console.log('Database Connected');}
})

app.post('/Signup',(request,response)=>{
    let name = request.body.name;
    let email = request.body.email;
    let phone = request.body.phone;
    let password = request.body.password;
    let role = request.body.role;

    let sql = 'insert into signup(username,password,name,email,phone,role,status) values (?,?,?,?,?,?,?)';

    c.query(sql,[email,password,name,email,phone,role,0],(error,result)=>{
        if(error){
            let s = {"status":"error"};
            response.send(s);
        }
        else{
            let s = {"status":"Inserted"};
            response.send(s);
        }
    })
   
});

app.post('/Signin',(request,response)=>{
    let username = request.body.username;
    let password = request.body.password;

    let sql = 'select * from signup where username=?';

    c.query(sql,[username],(error,result)=>{
        if(error){
            let s = {"status":"Query_Error"};
            response.send(s);
        }
        else if(result.length > 0){
            let username1 = result[0].username;
            let password1 = result[0].password;
            let id = result[0].id;
            let role = result[0].role;

            if(username1 == username && password1 == password){
                let s = {"status":"Success","id":id,"role":role};
                response.send(s);
            }
            else{
                let s = {"status":"Invalid_Login"};
                response.send(s);
            }
        }
        else{
            let s = {"status":"Invalid_Login"};
            response.send(s);
        }
    })

})

app.post('/Userdetails',(request,response)=>{
    let userid = request.body.userid;

    let sql = 'select * from signup where id=?';

    c.query(sql,[userid],(err,res)=>{
        if(err){
            let s = {"status":"error"};
            response.send(s);
        }
        else{
            let name = res[0].name;
            let s = {"status":name};
            response.send(s);
        }
    })

});

app.post('/Productadd',(request,response)=>{
    let userid = request.body.userid;
    let name = request.body.name;
    let descr = request.body.descr;
    let img_file = request.files.img_file;

    let upload_path = '../client/public/images/'+img_file.name;
    let img_name=  img_file.name;
    let img_path = 'images';

    img_file.mv(upload_path,function(err){

        let sql = 'insert into product(userid,name,descr,img_path,img_name,status) values (?,?,?,?,?,?)';

        c.query(sql,[userid,name,descr,img_path,img_name,0],(err1,res)=>{
            if(err1){let s = {"status":"error"};response.send(s);}
        })

        if(err){
            let s = {"status":"error"};
            response.send(s);
        }
        else{
            let s = {"status":"Inserted"};
            response.send(s);
        }

    })
    

})

app.post('/Productdetails',(request,response)=>{
    let userid = request.body.userid;
    let sql = 'select * from product where userid=?';

    c.query(sql,[userid],(err,res)=>{
        if(err){response.send(err);}
        else{
            response.send(res);
        }
    })

})


app.listen(3004);