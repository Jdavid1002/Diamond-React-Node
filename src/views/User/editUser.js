import React,{useState} from 'react';
import { useSelector , useDispatch} from 'react-redux';
import URL from '../../Config/URL';
import axios from 'axios'
import Swal from 'sweetalert2'

const EditUser = () => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    const [Campos, setCampos] = useState({
        name : user.name,
        email : user.email,
        date : user.date,
        description : user.description
    })

    const onChange = (e) => {
        setCampos({
            ...Campos,
            [e.target.name] : e.target.value
        })
    }

    const editarUsuario = async(e) => {
        e.preventDefault()
        const datos = {
            ...Campos,
            id : user.id
        }
        const consulta = await axios({
            url : `${URL}api/updateuser`,
            data: datos,
            method : "post"
        })
        if(consulta.data){
            const newUser = {
                ...datos,
                perfil : user.perfil,
                background : user.background
            }
            dispatch({
                type : "@updateDataUser",
                user : newUser
            })
            Swal.fire({
                icon : "success",
                title : "Datos editados correctamente"
            })
        }else{
            Swal.fire({
                icon : "error",
                title : "Error en el servidor"
            })
        }

    }

    return (
        <div className="w-50 mt-4 pb-3" >
            <form onSubmit={editarUsuario}>
                <div className="grid-2" >
                    <div className="p-3" >
                        <h5 className="mb-2" > Nombres </h5>
                        <input onChange={onChange}  name="name" type="text" className="input-text" defaultValue={user.name} />
                    </div>
                    <div className="p-3" >
                        <h5 className="mb-2" > Correo Eléctronico </h5>
                        <input  onChange={onChange}  name="email" type="text" className="input-text" defaultValue={user.email} />
                    </div>
                    <div className="p-3" >
                        <h5 className="mb-2" > Fecha de Nacimiento </h5>
                        <input   onChange={onChange}  name="date" type="date" className="input-text"   />
                    </div>
                    <div className="p-3" >
                        <h5 className="mb-2" > Descripción </h5>
                        <input   onChange={onChange}  name="description"  type="text" className="input-text" defaultValue={user.description} />
                    </div>
                </div>
                <div className="d-flex-center" >
                    <button className="btn bg-purple w-90 mt-3 shadow" type="submit" >
                        <h4 className="text-center text-white p-1" > Editar Información </h4>
                    </button>
                </div>
            </form>
        </div>
    );
}
 
export default EditUser;