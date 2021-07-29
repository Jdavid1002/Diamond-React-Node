import React,{useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import URL from '../../Config/URL';

const Friends = () => {

    const dispatch = useDispatch()
    const friends = useSelector(state => state.friends)
    const user = useSelector(state => state.user)

    const cargarUsuarios = async () => {
        const consulta = await axios({
            url : `${URL}api/userList`,
            method : "post"
        })
        const filtro = consulta.data.filter(datos => datos.id !== user.id )
        dispatch({
            type : "@addFriendsUser",
            friends : filtro
        })
    }

    useEffect(() => {
        cargarUsuarios()
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
        <div className="ml-5 mr-5" >
            <div className="p-3 m-2" >
                <h2> Mantente Conectado. </h2>
                <h4> Contactos que puedes empezar a seguir. </h4>
            </div>
            {friends.map(data => 
                <div className="d-flex-start shadow p-3 m-2 rounded pointer"  key={data.id} onClick={() => cambiarInterfaz(data)} >
                    <div className="w-15" >
                        <img src={`${URL}static/${data.perfil.substr(53, 1000)}`}  className="w-100 rounded-circle" alt="" />
                    </div>
                    <div className="ml-4 mt-2" >
                        <h5> {data.name} </h5>
                        <h6> {data.description} </h6>
                    </div>
                </div>
            )}
        </div>
    );
}
 
export default Friends;