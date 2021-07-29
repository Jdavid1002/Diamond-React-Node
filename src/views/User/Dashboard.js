import React from 'react';
import Navbar from './Navbar';
import User from './User';
import { useSelector } from 'react-redux';
import News from './News';
import Perfil from './Perfil';

const Dashboard = () => {
    const number = useSelector(state => state.number)

    return (
        <div>
            <Navbar />
            {number === 2 ? <User /> : null}
            {number === 1 ? <News /> : null}
            {number === 5 ? <Perfil /> : null}
        </div>
    );
}
 
export default Dashboard;