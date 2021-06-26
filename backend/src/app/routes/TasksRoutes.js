const express = require('express')
const dotenv = require('dotenv');
const tasksController = require( '../controllers/TasksController.js');
const router = express.Router();
const auth = require('../../middleware/auth')
dotenv.config()

router.post('/create-tasks',auth,(req,res)=>{
 
    tasksController.create(req,res);
})

router.get('/list-tasks/:username',auth,(req,res)=>{
    
    tasksController.findTask(req,res);
})
router.delete("/delete-task/:id",auth,(req,res)=>{
    tasksController.delete(req,res)
})


module.exports = router