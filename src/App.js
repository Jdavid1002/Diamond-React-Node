import React,{useEffect} from 'react';
import Rutas from './Config/router';
import Cookies from 'universal-cookie';
import { useDispatch } from 'react-redux'
import axios from 'axios';
import URL from './Config/URL';

const App = () => {
    const dispatch = useDispatch()
    const cookies = new Cookies()
  
    const cargarDatosUsuario = async () => {
      const sesion = cookies.get('sesion')
      const id = cookies.get('id')
      if(sesion !== "false" && sesion !== undefined){

        const consultaFollows = await axios({
          method: 'post',
          url: `${URL}api/userFollows`,
          data: {id}
        });
        dispatch({
          type : "@updateFollows",
          follows : consultaFollows.data
        })

        const consultaFollowers = await axios({
          method: 'post',
          url: `${URL}api/userFollowers`,
          data: {id}
        });
        dispatch({
          type : "@updateFollowers",
          followers : consultaFollowers.data
        })

        const consulta = await axios({
          method: 'post',
          url: `${URL}api/User`,
          data: {id}
        });
  
        cookies.set('sesion', true, { path: '/' });
        cookies.set('id', consulta.data.id, { path: '/' });
        dispatch({
            type : "@createUser",
            user : consulta.data
        })
      }else{
        cookies.set('sesion', false, { path: '/' });
        cookies.set('id', false, { path: '/' });
        dispatch({
            type : "@createUser",
            user : false
        })
      }
    }



    useEffect(() => {
      cargarDatosUsuario()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

  return (
    <div>
      <Rutas />
    </div>
  );
}

export default App;
