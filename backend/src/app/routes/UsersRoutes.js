const  express =require("express")
const dotenv = require('dotenv')
const UsersControllers = require('../controllers/UsersController.js')
dotenv.config()

const router = express.Router();


/*
* Rota Para Criação de usuarios no Banco de Dados.
*/
router.post('/create-user',(req,res)=>{
   console.log(req);
   UsersControllers.create(req,res);
})

router.post('/login',(req,res)=>{
    UsersControllers.login(req,res);
})

/***/
/*
*  Rota para Listar Usuarios que estão Cadastrados no banco
*/
router.get('/list-users',(req,res)=>{
    UsersControllers.findAll(req,res);
})
/*
*  Rota Para Redefinição de senha do usuario 
*/
router.put('/redefinir-pass',(req,res)=>{
    UsersControllers.update(req,res);
})
/*
* Rota para deletar usuario no banco
*/
router.delete('/delete-user',(req,res)=>{
    UsersControllers.delete(req,res);
})

module.exports = router;