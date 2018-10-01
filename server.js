const express =require('express');
const app = express();
const mongoose =require('mongoose');
const db = require('./config/keys').MongoUrl;
const posts=require('./routes/api/posts');
const profile=require('./routes/api/profile');
const user=require('./routes/api/user');
mongoose.connect(db)
    .then(()=>{
        console.log('mongo DataBase connect');
    })
    .catch((err)=>{
        console.log(err);
    })

app.get('/',(req,res)=>res.send('hello world'));
app.use('/api/posts',posts);
app.use('/api/profile',profile);
app.use('/api/user',user);
const port = process.env.port || 5000;
app.listen(port,()=>console.log(`server is runnig on port number ${port}`));

//this is just testing purporses