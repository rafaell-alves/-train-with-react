const tasksModel = require('../models/TasksModels.js')


class TasksController{
    async create(req,res){
    
        try {
            await tasksModel.createTask(req.body);
            var response = {
                success : `Task Criada Com Sucesso`
            }
            return res.status(201).json({response})
          } catch (err) {
            var response = {
                error : "Erro na Criação da Task"
            }
            return res.status(500).json({response})
          }
        
    }
     async findTask(req,res){
       
        try{
        var response = await tasksModel.findTask(req.params);
        return res.status(200).json({response})
       }catch(err){
            var response = {
                error : "Erro na Busca dessa Task"
            }
            return res.status(500).json({response})
       }
    }
    async update(req,res){
        try{
            await tasksModel.updateTask(req.body);
            var response = {
                success:"Task Atualizada com Sucesso"
            }
            return res.status(200).json({response})
           }catch(err){
                var response = {
                    error : "Erro na Atualização dessa Task"
                }
                return res.status(500).json({response})
           }
    }
    async delete(req,res){
        try{
            await tasksModel.deleteTask(req.params);
            var response = {
                success:"Task Deletada com Sucesso"
            }
            return res.status(200).json({response})
           }catch(err){
                var response = {
                    error : "Erro na Hora de Deletar dessa Task"
                }
                return res.status(500).json({response})
           }
    }
}

module.exports = new TasksController();
