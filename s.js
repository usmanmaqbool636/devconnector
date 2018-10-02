const express =require('express');
const app = express();
const mongoose =require('mongoose');
const bodyparser= require('body-parser');

const db = require('./config/keys').MongoUrl;
const posts=require('./routes/api/posts');
const profile=require('./routes/api/profile');
const users=require('./routes/api/users');
var urlencodedParser = bodyparser.urlencoded({extended:false});


// app.use(bodyparser.urlencoded({extended:false}));
// app.use(bodyparser.json())



//loacal mongodb

const Users = require('./models/User');
var data=[];


const mongoClient=require('mongodb').MongoClient;

const bcrypt=require('bcryptjs');
const gravatar = require('gravatar');
var murl="mongodb://localhost:27017/mydb1";


    app.post('/api/register',urlencodedParser,(req,res)=>{
        mongoClient.connect(murl,(err ,db)=>{
    
            var dbo=db.db('mydb1');
        dbo.collection('users').findOne({email : req.body.email},(err,result)=>{
            if(result){
                return res.send("email exist");
            }
            else{
                console.log(req.body);
                var newuser= {
                        name:req.body.name,
                        email:req.body.email,
                        password:req.body.password
                    }
                bcrypt.genSalt(10,(err,salt)=>{
                    bcrypt.hash(newuser.password,salt,(err, hash)=>{
                        if(err) throw err;
                        newuser.password = hash;
                        console.log("   " , hash)
                        newuser
                            .save()
                            .then(user=>res.json(user))
                            .catch(err=>console.log(err))
                    })

                })
                dbo.collection('users').insertOne(newuser,(err,rs)=>{
                    console.log("document inserted ===> ");
                    res.send("documents inserted");
                });
                console.log(' password ', newuser.password)
            }
        })
            db.close();
        });
        })




const port = process.env.port || 3000;
app.listen(port,()=>console.log(`server is runnig on port number ${port}`));