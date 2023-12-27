const routes= require ('express').Router();

const Routes = require('twilio/lib/rest/Routes.js');
const {CreateFileHandler,ReadFile, Copyfile, grid}=require ('./fileservice.js')




routes.post('/file/:id' , async(req,res)=>{

const filesaved  = await CreateFileHandler(req,res);


})
routes.get('/readfile' , async(req,res)=>{
    const filesaved  = await ReadFile(req,res);
    
    
    })
    routes.post('/copyfile' , async(req,res)=>{
        const filesaved  = await Copyfile(req,res);
        
        
        })
        routes.post('/grid' , async(req,res)=>{
            const filesaved  = await grid(req,res);
            
            
            })

module.exports=routes;