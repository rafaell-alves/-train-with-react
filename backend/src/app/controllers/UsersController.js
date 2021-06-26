const userModels = require('../models/UsersModels.js')
const jwt = require('jsonwebtoken')
const dotenv = require( "dotenv");


dotenv.config()

class UsersControllers{

    
    async create(req,res){
        var user = await userModels.searchUserExist(req.body);
        if(!user){
             await userModels.createUser(req.body);
             var response = {sucesso:"Registrado com sucesso - Faça Login"}
             res.status(201)
        }else{
            var response = {
                "erro":"Usuario já Cadastrado"
            }
            res.status(400);
        }
      
        return res.json({response})
    }

    async login(req,res){
        var userCheck = await userModels.checkCredentials(req.body);
        if(userCheck != undefined ){
            var response = {
                "sucesso": "Logado com Sucesso Bem-Vindo "+userCheck,
                "token": jwt.sign(
                    {user:userCheck},
                    process.env.JWT_Secret,
                    {expiresIn:process.env.JWT_Time}
                    )

            }
            
            res.status(200);
        }else{
            var response = {
                "erro": "Usuario não Encontrado ou Senha não compativeis "
            }
           return res.status(404).json({response});
        }

        return res.json({response})

    }

    async findAll(req,res){
    
        return await res.json(await userModels.findAll())
    }
    async delete(req,res){
    
        return await res.status(200).json(await userModels.deleteUser(req.body));
    }
}

module.exports =  new UsersControllers();