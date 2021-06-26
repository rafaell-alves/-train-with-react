import React from 'react';
import './Nav.css'
const Nav = props => {
    function logout(e) {
        console.log(e);
        if(e != null){
            if( localStorage.getItem('username')!= null || localStorage.getItem('username')!= undefined){
                localStorage.removeItem('username')
                localStorage.removeItem('token')
                window.location.reload();
            }

        }
       
    }
    return (
        <div className="side-bar">
            <nav className="nav-bar">
                <div className="logo">
                    
                </div>
                <h5>{localStorage.getItem("username")}</h5>
                <ul>
                <li> <button className="logout" onClick={(e)=>logout(e)}><i class="fa fa-sign-out" aria-hidden="true"></i> logout</button></li>
                   <li className={props.name == "welcome" ? "active" : ""}><a href="/welcome"><i class="fa fa-home" aria-hidden="true"></i> Home</a></li>
                   <li className={props.name == "page-user" ? "active" : ""}><a href="/page-users"><i class="fa fa-user" aria-hidden="true"></i> Users</a></li>
                   <li className={props.name == "page-task" ? "active" : ""}><a href="/page-task"> <i class="fa fa-tasks" aria-hidden="true"></i>Tasks</a></li>
                   
                </ul>
            </nav>
            
        </div>
    );
}

export default Nav;
