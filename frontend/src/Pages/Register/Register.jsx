import React,{useState} from 'react'
import './Register.css'
import {useHistory} from 'react-router'
import InputText from '../../Components/InputType'
import { toast } from "react-toastify";
import ButtonCustom from '../../Components/ButtonCustom'
import axios from 'axios'
export default function Register() {
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const history = useHistory();

    const submitHandle = e =>{
        e.preventDefault();
        Register();
    }

    function handleError(error) {
        toast.error(error);
    }
    function handleSuccess(success) {
        toast.success(success);
    }


    function Register(){
        const options = {
            method: 'POST',
            url: 'http://localhost:8080/users/create-user',
            data: {username: username,email:email, password: password}
          };
          
          axios.request(options).then(function (response) {
            
            if(response.status === 201){
                handleSuccess(response.data.response.sucesso)
                setTimeout(() => {
                    history.push({pathname:'/'})
                }, 1500);
                
            }
          }).catch(function (error) {
              handleError(error.response.data.response.erro)
          });
    }

    return (
        <div className="main-content">
            <form className="form-styleR" onSubmit={submitHandle}>
                <h4>Welcome The NotForget</h4>
                <div className="div-input">
                    <label htmlFor="username">Username</label>
                    <div className="InputStyle">   
                        <i class="fa fa-user" aria-hidden="true"></i> <input required onChange={(e)=> setUsername(e.target.value)} name="username"type="text" placeholder="Your Username"/>
                    </div>
                    <label htmlFor="email">Email</label>
                    <div className="InputStyleEmail">
                        <i class="fa fa-envelope" aria-hidden="true"></i><input name="email" onChange={(e)=> setEmail(e.target.value)}  type="text" placeholder="Your Email"></input>
                    </div>
                    <label htmlFor="password">Password</label>
                    <div className="InputStylePass">
                        <i class="fa fa-lock" aria-hidden="true"></i><input required onChange={(e)=> setPassword(e.target.value)} name="password"  type="password" placeholder="Your Password"></input>
                    </div>
                </div>
                <div className="options">
                    <a href="/login">Já Tem Conta?</a>
                </div>
                <ButtonCustom value="Registrar"></ButtonCustom>
                <div className="icons">
                    <h3><i className="fa fa-twitter"></i></h3>
                    <h3><i class="fa fa-instagram" aria-hidden="true"></i></h3>
                </div>
            </form>
        </div>
    )
}
