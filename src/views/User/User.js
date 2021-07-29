import React,{useState} from 'react';
import { useSelector} from 'react-redux';
import URL from '../../Config/URL';
import EditUser from './editUser';
import Info from './Info';
import TwitsUser from './twitsUser';


const User = () => {
    const user = useSelector(state => state.user)    
    const followers = useSelector(state => state.followers)
    const follows = useSelector(state => state.follows)

    const [Validacion, setValidacion] = useState(true)

    const cambiarInterfaz = () => {
        Validacion? setValidacion(false) : setValidacion(true)
    }

    return (
        <div className="container-dashboard" >
            <div>
                <img src={`${URL}static/${user.background.substr(53, 1000)}`} className="background-img" alt="" />
            </div>
            <div className="d-flex-center" >
                <img src={`${URL}static/${user.perfil.substr(53, 1000)}`} className="perfil-img" alt="" />
            </div>
            
            <div className="grid-3 containter-bottom-img" >
                <div className="d-flex-center" >
                    <div className="pointer">
                        <div className="d-flex-center" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-people" viewBox="0 0 16 16">
                                <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
                            </svg>
                        </div>
                        <h5 className="text-center" > Seguidores {followers.length} </h5>
                    </div>
                    <div className="pointer ml-4">
                        <div className="d-flex-center" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16">
                                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                <path fillRule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"/>
                                <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
                            </svg>
                        </div>
                        <h5 className="text-center" > Seguidos {follows.length}  </h5>
                    </div>
                </div>

                <div>
                    <h2 className="text-center" > {user.name} </h2>
                    <h4 className="text-center mt-2" > {user.description} </h4>
                    <h4 className="text-center mt-2" > {user.date} </h4>
                </div>

                <div className="d-flex-center mt-2" >
                    <div className="shadow p-3 rounded-circle pointer" onClick={cambiarInterfaz} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                        </svg>
                    </div>
                </div>
            </div>

            <div className="mt-4" >
                {Validacion ?
                    <div className="grid-2 ml-5 mr-5" >
                        <Info/>
                        <TwitsUser />
                    </div>
                :
                    <div className="d-flex-center" >
                        <EditUser />
                    </div>
                }
            </div>
        </div>
    );
}
 
export default User;