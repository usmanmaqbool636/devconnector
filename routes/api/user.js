const express = require('express');
const router=express.Router();

router.get('/test',(req,res)=>res.json({msg:'user works successfull'}));

module.exports = router;