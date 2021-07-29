import React,{useEffect,useState} from 'react';
import axios from 'axios'
import URL from '../../Config/URL';
import { useSelector, useDispatch } from 'react-redux';
import notFund from '../../img/404.svg'
import Card from './Card';
import AddTwit from './addTwit';

const TwitsUser = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const twits = useSelector(state => state.twits)

    const [Validacion, setValidacion] = useState(true)

    const cargarPublicacionesUsuario = async () => {
        const consulta = await axios({
            url : `${URL}api/userTwits`,
            data : {user :user.id},
            method : "post"
        })
        if(consulta.data.length >0){
            consulta.data.sort(( a, b )=> 
                parseInt(b.id) - parseInt(a.id)
            );
            dispatch({
                type : "@addTwitsUser",
                twits : consulta.data
            })
        }else{
            dispatch({
                type : "@addTwitsUser",
                twits : []
            })
        }
    }

    useEffect(() => {
        cargarPublicacionesUsuario()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);

    return (
        <div>
            { Validacion? 
                <div className="d-flex-start p-3 mt-4" >
                    <img src={`${URL}static/${user.perfil.substr(53, 1000)}`} className="w-10 rounded-circle"  alt="" />
                    <div className="p-3 shadow rounded w-100 ml-3 pointer" onClick={()=> setValidacion(false) } >
                        <div className="d-flex-start" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                            </svg>
                            <h4 className="mt-2 ml-3" > Nuevo Twit </h4>
                        </div>
                    </div>
                </div>
            :
                <div className="p-3 mt-3" >
                    <AddTwit />
                    <div className="shadow w-90 pointer p-3 rounded mt-2" onClick={() => setValidacion(true)}>
                        <h4 className="text-center" > Cancelar </h4>
                    </div>
                </div>
            }

            {twits.length > 0?
                <div>
                    {twits.map(data => 
                        <Card  edit={true} trash={true} key={data.id}  data={data} />
                    )}
                </div>
            :
                <div className="mt-3 mb-3 p-5 border">
                    <div className="d-flex-between" >

                        <div className="d-flex-start" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-gem" viewBox="0 0 16 16">
                                <path d="M3.1.7a.5.5 0 0 1 .4-.2h9a.5.5 0 0 1 .4.2l2.976 3.974c.149.185.156.45.01.644L8.4 15.3a.5.5 0 0 1-.8 0L.1 5.3a.5.5 0 0 1 0-.6l3-4zm11.386 3.785-1.806-2.41-.776 2.413 2.582-.003zm-3.633.004.961-2.989H4.186l.963 2.995 5.704-.006zM5.47 5.495 8 13.366l2.532-7.876-5.062.005zm-1.371-.999-.78-2.422-1.818 2.425 2.598-.003zM1.499 5.5l5.113 6.817-2.192-6.82L1.5 5.5zm7.889 6.817 5.123-6.83-2.928.002-2.195 6.828z"/>
                            </svg>
                            <div className="ml-3" >
                                <h5 className="pointer" > Grupo de Diamond Social. </h5>
                                <p> <span className="text-sm"> {hoy.toDateString()} </span></p>
                            </div>
                        </div>

                    </div>

                    <h4 className="text-dark mt-3" > No tienes publicaciones, empieza a publicar para que te vean más personas! </h4>
                    <div className="d-flex-center p-5 shadow mt-3" >
                        <img className="w-55" src={notFund} alt="" />
                    </div>
                </div>
            }
        </div>
    );
}
 
export default TwitsUser;