import React from 'react'
import {Switch,Route,Redirect} from 'react-router'
import Login from '../Pages/Login/Login.jsx'
import PageTask from '../Pages/PageTasks/PageTask.jsx'
import Register from '../Pages/Register/Register.jsx'
import Welcome from '../Pages/Welcome/Welcome.jsx'
import PageUsers from '../Pages/PageUsers/PageUsers.jsx'

export default function Routes() {
    return (
        <Switch>
                <Route path='/login' component={Login}></Route>
                <Route path='/page-task' component={PageTask}></Route>
                <Route path='/page-users' component={PageUsers}></Route>
                <Route path='/sign-in' component={Register}></Route>
                
                <Route path='/sign-in' component={Register}></Route>
                <Route path="/welcome" component={Welcome}></Route>
                <Redirect from='*' to='/login'></Redirect>
        </Switch>
    )
}

