import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './PageTask.css'
import NavSide from '../../Components/Nav'
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import jwt from 'jsonwebtoken'

export default function PageTask() {
    const [data,setData] = useState("");
    const [active,setActive] = useState("");
    const [taskname,setTaskName] = useState("");
    const [taskdescription,setTaskDescription] = useState();
    const [date,setDate] = useState();
    const history = useHistory();

    useEffect(()=> {
        jwt.verify(localStorage.getItem('token') ,'segredo',(err,decode)=>{
         if(err){
            localStorage.removeItem('username');
            localStorage.removeItem('token');
            history.push({pathname:'/'})
         }
     })
     if(localStorage.getItem('username') == undefined || localStorage.getItem('username') == null){

        history.push({pathname:'/'})
    }
    return listTask()

    },[data == true])
    async function listTask(search="") {
		const options = {
            method: 'GET',
            url: 'http://localhost:8080/tasks/list-tasks/'+localStorage.getItem('username'),
            headers: {
              authorization: 'Bearer '+localStorage.getItem("token")
            }
          };

		var response = await axios.request(options).then(function (response) {
           return response.data
			
		}).catch(function (error) {
		});
        if(response != undefined){
            setData(response.response);
        }else{
            setData(undefined)
        }

	}

    function showToggle(e){
        e.preventDefault()
        if(active != true){
            
            setActive(true);
        }
        if(active == true){
            setActive(false);

        }
    }
    
    function handleError(error) {
        toast.error(error);
    }
    function handleSuccess(success) {
        toast.success(success);
    }
    const submitHandle = e =>{
        e.preventDefault();
        createTask();
    }
    
    async function createTask(){
      
        const options = {
          method: 'POST',
          url: 'http://localhost:8080/tasks/create-tasks',
          headers: {
            'Content-Type': 'application/json',
            authorization: 'Bearer '+ localStorage.getItem('token')
          },
          data: {
            username: localStorage.getItem('username'),
            taskname: taskname,
            description:taskdescription,
            date: date
          }
        };
        
        axios.request(options).then(function (response) {
            handleSuccess("Tarefa Criada com sucesso")
        }).catch(function (error) {
            handleError("Não foi conseguido criar essa tarefa")
        });
        setActive(false);
        setData(true);
    }
    
    function deleteTask(id){
        const options = {
            method: 'DELETE',
            url: 'http://localhost:8080/tasks/delete-task/'+id,
            headers: {
              authorization: 'Bearer '+ localStorage.getItem('token')
            }
          };
        axios.request(options).then(function (response) {
            handleSuccess("Tarefa deletada com sucesso")
        }).catch(function (error) {
            handleError("Não foi possivel deletar essa tarefa")
        });
        listTask()
    }

    return (
        <div className="content">
               <div className={active == false ?"div-task" :"active div-task" }>
                    <form  className="form-task" onSubmit={submitHandle} >
                        <div className="div-close"><button onClick={ e =>showToggle(e)}><i class="fa fa-times-circle" aria-hidden="true"></i></button></div>
                        <input required name="task-name" onChange={e=>setTaskName(e.target.value)} placeholder="Nome da Atividade"/>
                        <input name="task-description" onChange={e=>setTaskDescription(e.target.value)} placeholder="Descrição da atividade"/> 
                        <input required name="task-date" type="date" onChange={e=>setDate(e.target.value)} placeholder="Insira a data"/>
                        <input type="submit" value="Criar Task" />
                    </form>
                </div>
        <div className={active == false ?"content-div" :"popup-active content-div"}>
            <NavSide name="page-task"></NavSide>
         
            <main className="main-task" >
                <h2>Tabela de Atividades</h2>
                <div className="filter-div">
                    <button className="btn-add btn btn-light" onClick={e=>showToggle(e)}>Adicionar Atividade</button>
                </div>
               
                {
                data == undefined ?
                (<h5>Não foi possivel Listar</h5> ) :
                data.length > 0 ? (
                        <table className="table">
                        <thead className="table-head">
                            <tr>
                                <th>Id</th>

                                <th>Nome atividade</th>

                                <th>Descrição</th>

                                <th>Data Final</th>
                            
                                <th>Ações</th>
                                
                            </tr>
                        </thead>
                    <tbody className="class-tbody">
                        
                        {data.map(res =>
                 
                        <tr>
                            <td>{res.id_task}</td>
                            <td>{res.task_name}</td>
                            <td>{res.task_description}</td>
                            <td>{res.task_date}</td>
                            <td><button className="btn btn-light" onClick={()=>deleteTask(res.id_task)} ><i className="fa fa-trash"></i></button></td>
                        </tr>)}
                    </tbody>
                </table>
                ) :  <div class="d-flex justify-content-center">
                <div class="spinner-border" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
                </div>
              }
              
            
            </main>
        </div>
       
    </div>
    )
}
