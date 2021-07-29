import React,{useEffect} from 'react';
import axios from 'axios'
import URL from '../../Config/URL';
import { useSelector, useDispatch } from 'react-redux';


const Info = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const friends = useSelector(state => state.friends)

    const cargarPublicacionesUsuario = async () => {
        const consulta = await axios({
            url : `${URL}api/userList`,
            data : {user :user.id},
            method : "post"
        })
        if(consulta.data.length >0){
            const users = consulta.data.filter(datos => datos.id !== user.id)
            dispatch({
                type : "@addFriendsUser",
                friends : users
            })
        }else{
            dispatch({
                type : "@addFriendsUser",
               friends : []
            })
        }
    }

    useEffect(() => {
        cargarPublicacionesUsuario()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const cambiarInterfaz = (data) => {
        dispatch({
            type : "@addInterfazPerfil",
            perfil : data
        })
        dispatch({
            type : "@changeInterfaz",
            number : 5
        })
    }


    return (
        <div className="m-4 mt-5" >
            <div className="grid-3 m-4" >
                {friends.map(data => 
                    <div className="shadow p-3 m-3 pointer" key={data.id} onClick={()=> cambiarInterfaz(data)} >
                        <div className="d-flex-center" >
                            <img className="w-100 rounded" src={`${URL}static/${data.perfil.substr(53, 1000)}`} alt="" />
                        </div>
                        <h5 className="mt-3" > {data.name} </h5>
                    </div>
                )}
            </div>
        </div>
    );
}
 
export default Info;