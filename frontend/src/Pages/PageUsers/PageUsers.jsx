import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './PageUsers.css'
import NavSide from '../../Components/Nav'
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import jwt from 'jsonwebtoken'
export default function PageUsers() {
	const [data, setData] = useState("");
	const history = useHistory();
	useEffect(() => {
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
		listUsers()
	}, [])


	async function listUsers(search="") {
		const options = {
			method: 'GET',
			url: 'http://localhost:8080/users/list-users',
		};

		var response = await axios.request(options).then(function (response) {
			return response.data
		}).catch(function (error) {
		});
		setData(response);
	}
	function handleError(error) {
        toast.error(error);
    }
    function handleSuccess(success) {
        toast.success(success);
    }

	function deleteUser(username){
		if(localStorage.getItem('username') != username){
			const options = {
				method: 'DELETE',
				url: 'http://localhost:8080/users/delete-user',
				data:{username:username}
			};
			
			var response = axios.request(options).then(function (response) {
			
				if(response.status === 200){
					handleSuccess("Usuario Deletado Com Sucesso");
					setTimeout(() => {				
						window.location.reload()
					}, 1500);
				}
			}).catch(function (error) {
			});
		}else{
			handleError("Você tá logado com esse usuario")
		}
	}
	return (
		<div className="content">
            <div className="content-div">
                <NavSide name="page-user"></NavSide>
             
				<main className="table-main">
					<h2>Tabela de usuarios</h2>
				
						{data.length > 0 ? (
								<table className="table">
								<thead className="table-head">
									<tr>
										<th>Id</th>
		
										<th>Username</th>
		
										<th>Email</th>
									
										<th>Ações</th>
										
									</tr>
								</thead>
							<tbody className="class-tbody">
								
								{data.map(res => <tr>
									<td>{res.id_users}</td>
									<td>{res.username}</td>
									<td>{res.email}</td>
									<td><button className="btn btn-light" onClick={()=>deleteUser(res.username)}><i className="fa fa-trash"></i></button></td>
								</tr>)}
							</tbody>
						</table>
						) : 
						<div class="d-flex justify-content-center">
						<div class="spinner-border" role="status">
						  <span class="sr-only">Loading...</span>
						</div>
					  </div>}
					  
					
					
				</main>
            </div>
           
        </div>
	)
}
