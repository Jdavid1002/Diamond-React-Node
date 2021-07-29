import React,{useState} from 'react';
import Swal from 'sweetalert2'
import URL from '../Config/URL';
import axios from 'axios'
import Cookies from 'universal-cookie';
import {useDispatch} from 'react-redux'

const Login = () => {

    const dispatch = useDispatch()
    const cookies = new Cookies();
    const [Campos, setCampos] = useState({email : "" , pass : ""})

    const onChange = (e) => {
        setCampos({
            ...Campos,
            [e.target.name] : e.target.value
        })
    }

    const validarUsuario = async (e) => {
        e.preventDefault()
        const {email,pass} = Campos
        if(pass !== "" && email !== ""){
            const consulta = axios({
                method: 'post',
                url: `${URL}api/login`,
                data: Campos
            });
            const res = await consulta
            if(!res.data){
                Swal.fire({
                    icon : "error",
                    title : "Credenciales Incorrectas",
                    text : "Tu correo o contraseña son incorrectos"
                })
                cookies.set('sesion', false, { path: '/' });
                cookies.set('id', false, { path: '/' });
            }else{
                cookies.set('sesion', true, { path: '/' });
                cookies.set('id', res.data.id, { path: '/' });
                dispatch({
                    type : "@createUser",
                    user : res.data
                })
                window.location.reload()
            }
        }else{
            Swal.fire({
                icon : "warning",
                title : "Campos Vacíos",
                text : "Recuerda llenar correctamente los campos"
            })
        }

    }

    return (
        <div className="d-flex-center">
            <div className="m-2 p-5 w-25 shadow rounded" >
                <div className="d-flex-start mb-3" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-gem" viewBox="0 0 16 16">
                        <path d="M3.1.7a.5.5 0 0 1 .4-.2h9a.5.5 0 0 1 .4.2l2.976 3.974c.149.185.156.45.01.644L8.4 15.3a.5.5 0 0 1-.8 0L.1 5.3a.5.5 0 0 1 0-.6l3-4zm11.386 3.785-1.806-2.41-.776 2.413 2.582-.003zm-3.633.004.961-2.989H4.186l.963 2.995 5.704-.006zM5.47 5.495 8 13.366l2.532-7.876-5.062.005zm-1.371-.999-.78-2.422-1.818 2.425 2.598-.003zM1.499 5.5l5.113 6.817-2.192-6.82L1.5 5.5zm7.889 6.817 5.123-6.83-2.928.002-2.195 6.828z"/>
                    </svg>
                </div>
                <h2> <strong> Inicia Sesión en Diamond Social </strong> </h2>
                <hr className="line w-75 bg-purple mt-3"  />  
                <form onSubmit={validarUsuario} >
                    <input onChange={onChange} type="text"     name="email" className="text-purple input-text mt-5 w-100" placeholder="Correo eléctronico" />
                    <input onChange={onChange} type="password" name="pass" className="text-purple input-text mt-2  w-100" placeholder="Contraseña" />
                    <div className="d-flex-center" >
                        <button className="btn w-100 shadow mt-4 bg-purple text-white" > <h4>Entrar</h4> </button>
                    </div>
                </form>
                <div className="mt-4" >
                    <p> ¿No tienes cuenta? <span className="text-white pointer"  onClick={()=> window.location.replace("/#/Register") } > Registrate aquí </span> </p>
                </div>
            </div>
        </div>
    );
}
 
export default Login;