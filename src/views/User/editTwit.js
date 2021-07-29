import React,{useState} from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import URL from '../../Config/URL';
import {useDispatch, useSelector} from 'react-redux'

const EditTwit = ({datos}) => {
    const dispatch = useDispatch()
    const twits = useSelector(state => state.twits)

    const [Twit, setTwit] = useState("")

    const editarTwit = async (e) => {
        e.preventDefault()
        if(Twit !== ""){
            const data = {
                user : datos.user,
                imagen : datos.imagen,
                content : Twit,
                date : datos.date,
                id : datos.id
            }
            uploadTwit(data)
        }else{
            Swal.fire({
                icon : "warning",
                title : "Campos vacíos",
                text : "Recuerda llenar todos los campos correctamente"
            })
        }
    }


    const uploadTwit = async (data) => {
        const consulta = await axios({
            url : `${URL}api/updateTwit`,
            data : data,
            method : "post"
        })
        if(consulta.data){
            Swal.fire({
                icon : "success",
                title : "Twit editado"
            })
            const newTwits = twits.filter(datos => datos.id !== data.id)
            const sendTwits = [
                ...newTwits,
                data
            ]
            dispatch({
                type : "@addTwitsUser",
                twits : sendTwits
            })
        }else{
            Swal.fire({
                icon : "error",
                title : "Error en el servidor"
            })
        }
    }

    return (
        <div>
            <form  onSubmit={editarTwit} >
                <h4 className="m-2" > Twit </h4>
                <textarea onChange={(e) => setTwit(e.target.value)} type="text" name="twit" className="textarea" placeholder={datos.content}  />
                
                <button className="btn bg-purple w-95 mt-3 shadow" type="submit" >
                    <h4 className="text-center text-white p-1" > Agregar Twit </h4>
                </button>
            </form>
        </div>
    );
}
 
export default EditTwit;