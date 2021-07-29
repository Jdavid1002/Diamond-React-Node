import React from 'react';
import {
    HashRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import { useSelector } from 'react-redux';
import Login from '../views/Login';
import Dashboard from '../views/User/Dashboard';
import Register from '../views/Register';

const Rutas = () => {

    const User = useSelector(state => state.user)

    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/Login">
                        { !User ?  <Login />  : <Dashboard /> }
                    </Route>
                    <Route path="/Register">
                        { !User ?  <Register />  : <Dashboard /> }
                    </Route>
                    <Route path="/">
                        { !User ?  <Login />  : <Dashboard /> }
                    </Route>

                </Switch>
            </Router>
        </div>
    );
}
 
export default Rutas;