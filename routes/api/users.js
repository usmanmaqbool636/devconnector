const express = require('express');
const router=express.Router();
const User=require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');


router.get('/test',(req,res)=>res.json({msg:'user works successfull'}));

router.post('/register',(req,res)=>{
    User.findOne({email:req.body.email})
    .then(user=>{
        if(user){
            return res.status(400).json({email:'already exit'});
        }
        else{
            const avatar=gravatar.url(req.body.email,{
                s:'200',
                r:'pg',
                d:'mm'
            });
            const newuser= new User(
                {
                    name:req.body.name,
                    email:req.body.email,
                    avatar,
                    password:req.body.password
                }
            );
            bcrypt.genSalt(10,(err,salt)=>{
                bcrypt.hash(newuser.password,salt,(err, hash)=>{
                    if(err) throw err;
                    newuser.password=hash;
                    newuser
                        .save()
                        .then(user=>res.json(user))
                        .catch(err=>console.log(err))
                })
            })
        }
    })
});


router.post('/login',(req,res)=>{
    const email=req.body.email;
    const password =req.body.password;

    User.findOne({email})
        .then(user =>{
            if(!user){
                return res.status(404).json({email:'email not found'});
            }
            bcrypt.compare(password,user.password)
                .then(isMatch=>{
                    if(isMatch){
                        return res.json({msg : 'loged in'});
                    }else{
                        return res.status(404).json({password:"password incorrect"});
                    }
                })
        } )
})
module.exports = router;