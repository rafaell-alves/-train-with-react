const db = require('../../config/database.js')
const userModel = require('../models/UsersModels.js')

class TasksModels{

    async createTask(body){
        
        var id =  await userModel.searchUser(body);
       
        return await db('tasks').insert({
            id_users:id,
            username:body.username,
            task_name:body.taskname,
            task_description:body.description,
            task_date:body.date
 
        }).returning(["task_name"]);
    }

    async findTask(params){
        return await db('tasks')
        .where('username','like',`%${params.username}%`)
        .then((response)=>response)
    }
    
    async deleteTask(params){
        return await db("tasks").where({id_task:params.id})
        .del()
    }
}

module.exports = new TasksModels();