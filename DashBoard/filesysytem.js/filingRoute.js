const routes= require ('express').Router();

const {file1, readFile1}=require ('./fileservice.js')




routes.post('/uploadfile' , async(req,res)=>{

const filesaved  = await file1(req,res);


})
routes.post('/readfile' , async(req,res)=>{

    const filesaved  = await readFile1(req,res);
    
    
    })

module.exports=routes;