const db = require('../../config/database.js')

class UsersModels{
 
   async createUser(body){
       console.log(body)
       if((body.username != null || body.username != undefined || body.username != "") && (body.password != null || body.password != undefined || body.password != "") && (body.email != null || body.email != undefined || body.email != "")){
            return await db('users').insert({
                username:body.username,
                passwords:body.password,
                email:body.email
    
            }).returning(["id_users"]);
       }
   }

   async searchUserExist(body){
        return await db('users').where({username:body.username})
        .orWhere({email:body.email})
        .first()
        .then((username)=>username);
   }

   async checkCredentials(body){
       console.log(body.username);
       try {
        return await db('users').where({username:body.username})
        .andWhere({passwords:body.password})
        .first()
        .then((response)=>response.username); 
       } catch (error) {
           return null
       }
      

   }
   async searchUser(body){
    return await db('users').where('username'  ,'like', `%${body.username}`)
    .first()
    .then((response)=>response.id_users);
}
   async findAll(){
    return await db('users');
   }
   async redefinePass(body){
        return await db("users").where({username:body.username})
        .orWhere({email:body.email})
        .update({passwords:body.password})
        .returning(['passwords'])
   }
   async deleteUser(body){
    await db("tasks").where({username:body.username})
    .del()
    return await db("users").where({username:body.username})
    .del()
   }
}
//Teste
module.exports =  new UsersModels();