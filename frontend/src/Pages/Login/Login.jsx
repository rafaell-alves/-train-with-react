import {React, useState ,useEffect} from 'react'
import './Login.css'
import InputText from '../../Components/InputType'
import { useHistory } from 'react-router';
import axios from 'axios';
import { toast } from 'react-toastify';
export default function Login() {

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const history = useHistory();

   
    useEffect(()=>{
        if(localStorage.getItem('username') != undefined || localStorage.getItem('username') != null){
            history.push({pathname:'/welcome'})
        }
    },[])

    const submitHandle = e =>{
        e.preventDefault();
        Login();
    }

    function handleError(error) {
        toast.error(error);
    }
    function handleSuccess(success) {
        toast.success(success);
    }
    

     function Login(){
        const options = {
            method: 'POST',
            url: 'http://localhost:8080/users/login',
            headers: {'Content-Type': 'application/json'},
            data: {username: username, password: password}
          };
          
          axios.request(options).then(function (response) {
            if(response.status === 200){
           
                localStorage.setItem('username',username);
                localStorage.setItem('token',response.data.response.token);
                handleSuccess(response.data.response.sucesso)
                setTimeout(() => {
                    history.push({pathname:'/welcome'})
                }, 1500);
                
            }
          }).catch(function (error) {
              handleError(error.response.data.response.erro)
          });
    }
    return (
        <div className="main-content">
            <form className="form-style" onSubmit={submitHandle}>
                <h4>Welcome The NotForget</h4>
                <div className="div-input">
                    <label htmlFor="username">Username</label>
                    <div className="InputStyle">   
                        <i class="fa fa-user" aria-hidden="true"></i> <input required onChange={(e)=> setUsername(e.target.value)} name="username"type="text" placeholder="Your Username"/>
                    </div>
                    <label htmlFor="password">Password</label>
                    <div className="InputStylePass">
                        <i class="fa fa-lock" aria-hidden="true"></i><input required onChange={(e)=> setPassword(e.target.value)} name="password"  type="password" placeholder="Your Password"></input>
                    </div>
                    
                </div>
                <div className="options">
                    <a href="/sign-in">Criar Minha Conta</a>
                </div>
                <div className="div-button">
                    <button type="submit">Entrar</button>                    
                </div>
                <div className="icons">
                    <h3><i className="fa fa-twitter"></i></h3>
                    <h3><i class="fa fa-instagram" aria-hidden="true"></i></h3>

                </div>
            </form>
        </div>
    )
}
