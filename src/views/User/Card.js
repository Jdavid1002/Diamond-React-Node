import axios from 'axios';
import React,{useEffect, useState} from 'react';
import url from '../../Config/URL';
import Swal from 'sweetalert2'
import {useDispatch, useSelector} from 'react-redux'
import EditTwit from './editTwit';
import URL from '../../Config/URL';

const Card = ({data , edit , trash}) => {
    const [usuarioDatos, setusuarioDatos] = useState({})
    const [imagenPerfil, setimagenPerfil] = useState("")
    const [interfazEditar, setinterfazEditar] = useState(true)

    const dispatch = useDispatch()
    const twits = useSelector(state => state.twits)

    const cargarDatosUsuario = async () => {
        const consulta = await axios({
            method : "post",
            data : {id : data.user},
            url : `${url}api/user`
        })
        const src = `${url}static/${consulta.data.perfil.substr(53 , 1000)}`
        setimagenPerfil(src)
        setusuarioDatos(consulta.data)
    }

    useEffect(() => {
        cargarDatosUsuario()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    
    const deleteTwit = async () => {
        const consulta = await axios({
            method : "post",
            data : {
                id : data.id,
                imagen :data.imagen === "false" ? data.imagen : data.imagen.substr(53, 1000)
            },
            url : `${url}api/deleteTwit`
        })
        if(consulta.data){
            const newTwits = twits.filter(datos => datos.id !== data.id)
            dispatch({
                type : "@addTwitsUser",
                twits : newTwits
            })
        }else{
            Swal.fire({
                icon : "error",
                title : "Ocurrió un error en el servidor"
            })
        }
    }

    const cargarPerfil = async () => {
        const consulta =await axios({
            data : {id : data.user},
            url : `${URL}api/User`,
            method : "post"
        })
        dispatch({
            type : "@addInterfazPerfil",
            perfil : consulta.data
        })
        dispatch({
            type : "@changeInterfaz",
            number : 5
        })
    }

    return (
        <div>
            {interfazEditar ?
                <div className="mt-3 mb-3 p-5 border">
                    <div className="d-flex-between" >
                        <div className="d-flex-start pointer" onClick={cargarPerfil} >
                            <div className="w-10" >
                                <img className="w-100 rounded-circle" src={imagenPerfil} alt="" />
                            </div>
                            <div className="ml-3 mt-2" >
                                <h5 className="pointer" > {usuarioDatos.name} </h5>
                                <p> <span className="text-sm"> {data.date} </span></p>
                            </div>
                        </div>
                    </div>
        

                    {data.content === "false" ? 
                        null
                    :
                    <h4 className="text-dark mt-3" > {data.content} </h4>            
                    }
        
                    {data.imagen === "false" ?
                        null
                    : 
                        <div className="d-flex-center p-5 shadow mt-3" >
                            <img className="w-55" src={`${url}static/${data.imagen.substr(53 , 1000)}`} alt="" />
                        </div>
                    }
                    
                    
                    <div className="d-flex-center mt-3 " >
                        {edit  ?
                            <div className="p-3 bg-purple rounded-circle shadow pointer" onClick={() => setinterfazEditar(false)} > 
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="text-white bi bi-pencil" viewBox="0 0 16 16">
                                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                                </svg>
                            </div> 
                        : null}
                        {trash ?
                            <div className="ml-2 bg-opacity shadow p-3 rounded-circle pointer" onClick={deleteTwit} > 
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                </svg>
                            </div> 
                        : null}
                    </div>
                </div>
            : 
                <div>
                    <EditTwit datos={data} />
                    <div className="shadow w-90 pointer p-3 rounded mt-2" onClick={() => setinterfazEditar(true)}>
                        <h4 className="text-center" > Cancelar </h4>
                    </div>
                </div>
            }
        </div>
    );
}
 
export default Card;