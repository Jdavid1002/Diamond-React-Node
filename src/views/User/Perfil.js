import React,{useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import URL from '../../Config/URL';
import axios from 'axios'
import Card from './Card'

const Perfil = () => {
    const perfil = useSelector(state => state.perfil)
    const user = useSelector(state => state.user)
    const follows = useSelector(state => state.follows)
    const twitsFollow = useSelector(state => state.twitsFollow)

    const dispatch = useDispatch()

    const [Seguidor, setSeguidor] = useState(false)
    const [SeguidosSeguidores, setSeguidosSeguidores] = useState({seguidores : 0 , seguidos : 0})
    const [twitsUsuario, settwitsUsuario] = useState([])


    const cargarTwitsUsuario = async () => {
        const consulta = await axios({
            url : `${URL}api/userTwits`,
            data : {user :perfil.id},
            method : "post"
        })
        settwitsUsuario(consulta.data)
        const filtro = follows.find(data => data.user === perfil.id)
        filtro === undefined? setSeguidor(false)  : setSeguidor(true)
    }

    const cargarFollowersUsuario = async () => {
        const consulta = await axios({
            data : {id : perfil.id},
            url : `${URL}api/userFollows`,
            method : "post"
        })
        const consultaDos = await axios({
            data : {id : perfil.id},
            url : `${URL}api/userFollowers`,
            method : "post"
        })

        setSeguidosSeguidores({
            seguidores : consultaDos.data.length,
            seguidos : consulta.data.length
        })
    }

    useEffect(() => {
        cargarTwitsUsuario()
        cargarFollowersUsuario()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const addFollow = async() => {
        const datos = {
            user : perfil.id,
            follower : user.id
        }
        const consulta = await axios({
            url : `${URL}api/followUserAdd`,
            data : datos,
            method : "post"
        })
        if(consulta.data.mensaje === "follow"){
            setSeguidor(true)
            const newFollows = [
                ...follows,
                datos
            ]
            dispatch({
                type : "@updateFollows",
                follows : newFollows
            })
        }else if (consulta.data.mensaje === "unfollow") {
            setSeguidor(false)
            const newFollows = follows.filter(data => data.id === datos.user)
            dispatch({
                type : "@updateFollows",
                follows : newFollows
            })
            const newTwitsFollows = twitsFollow.filter(data => data.user !== perfil.id)

            dispatch({
                type : "@updateTwitsFollows",
                twitsFollow : newTwitsFollows
            })
        }        

    }

    return (
        <div className="container-dashboard" >
            
            <div>
                <img src={`${URL}static/${perfil.background.substr(53, 1000)}`} className="background-img" alt="" />
            </div>
            <div className="d-flex-center" >
                <img src={`${URL}static/${perfil.perfil.substr(53, 1000)}`} className="perfil-img" alt="" />
            </div>

            <div className="grid-3 containter-bottom-img" >

                <div className="d-flex-center" >
                    <div className="pointer">
                        <div className="d-flex-center" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-people" viewBox="0 0 16 16">
                                <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
                            </svg>
                        </div>
                        <h5 className="text-center" > Seguidores {SeguidosSeguidores.seguidores} </h5>
                    </div>
                    <div className="pointer ml-4">
                        <div className="d-flex-center" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16">
                                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                <path fillRule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"/>
                                <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
                            </svg>
                        </div>
                        <h5 className="text-center" > Seguidos  {SeguidosSeguidores.seguidos} </h5>
                    </div>
                </div>

                <div>
                    <h2 className="text-center" > {perfil.name} </h2>
                    <h4 className="text-center mt-2" > {perfil.description} </h4>
                    <h4 className="text-center mt-2" > {perfil.date} </h4>
                </div>

                <div className="d-flex-center" >
                    <button className="btn bg-purple w-25" onClick={addFollow} >
                        <h4 className="text-white" >
                            {Seguidor ?
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-person-check-fill" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                                    <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                </svg>
                            :
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="text-white bi bi-person-plus-fill" viewBox="0 0 16 16">
                                    <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                    <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                                </svg>
                            }
                        </h4>
                    </button>
                </div>
            </div>

            <div className="grid-3" >
                <div>
                            
                </div>
                <div>
                    {twitsUsuario.map(datos => 
                        <Card key={datos.id} data={datos}  edit={false} trash={false}  />
                    )}
                </div>
                <div>
                    
                </div>
            </div>
        </div>
    );
}
 
export default Perfil;