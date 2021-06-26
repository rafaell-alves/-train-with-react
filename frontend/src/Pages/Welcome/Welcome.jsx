import React,{useEffect,useState} from 'react'
import NavSide from '../../Components/Nav'
import { useHistory } from 'react-router';
import './Welcome.css'
import tela1 from '../../Assets/Img/tela1.png';
import tela2 from '../../Assets/Img/tela2.png';

import jwt from 'jsonwebtoken'

export default function Welcome() {
    const history = useHistory();
   
   


    useEffect(()=>{
     
    jwt.verify(localStorage.getItem('token') ,'segredo',(err,decode)=>{
     
         if(err){
            localStorage.removeItem('username');
            localStorage.removeItem('token');
            history.push({pathname:'/'})
         }
     })

       
    },[])
    return (
        <div className="content">
            <div className="content-div">
                <NavSide name="welcome"></NavSide>
                <main className="main-welcome">
                    <h1>Bem vindo usuario {localStorage.getItem('username')}</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce facilisis volutpat dictum. Aliquam luctus eget leo nec vulputate. Cras non erat dignissim, maximus augue ut, facilisis odio. Pellentesque eu euismod risus. </p>
                    <div className="div-image">
                        <div className="image">
                            <img src={tela2} alt="Tela de Usuarios"  />
                            <img src={tela1} alt="Tela de Criação de Task" />
                        </div>
       
                    </div>
              
                </main>
                
            </div>
            
        </div>
    )
}
