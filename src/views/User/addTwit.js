import React,{useState} from 'react';
import Swal from 'sweetalert2'
import axios from 'axios'
import {useDispatch, useSelector } from 'react-redux';
import URL from '../../Config/URL';

const AddTwit = () => {
    const dispatch = useDispatch()

    const user = useSelector(state => state.user)
    const twits = useSelector(state => state.twits)

    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    
    const [Twit, setTwit] = useState("")

    const addTwit = async (e) => {
        e.preventDefault()
        const file = document.getElementById("IMG").files

        if(Twit !== "" && file.length > 0){

            if(file[0].type === "image/jpeg"){
                const formData = new FormData();
                formData.append("file", file[0]);
                const upload = await axios.post(`${URL}api/addImage`, formData, {
                    headers: {
                    'Content-Type': 'multipart/form-data'
                    }
                })    
                const datos = {
                    user : user.id,
                    imagen : upload.data.ruta,
                    content : Twit,
                    date : hoy.toDateString()
                }
                createTwit(datos)

            }else{
                Swal.fire({
                    icon : "warning",
                    title : "Tipo de Archivo Incorrecto",
                    text : "Solo puedes subir imagenes en estos campos."
                })
            }

        }else if(Twit !== "" && file.length === 0){
            const datos = {
                user : user.id,
                imagen : "false",
                content : Twit,
                date : hoy.toDateString()
            }
            createTwit(datos)

        }else if(Twit === "" && file.length >0 ){
            if(file[0].type === "image/jpeg"){
                const formData = new FormData();
                formData.append("file", file[0]);
                const upload = await axios.post(`${URL}api/addImage`, formData, {
                    headers: {
                    'Content-Type': 'multipart/form-data'
                    }
                })    
                const datos = {
                    user : user.id,
                    imagen : upload.data.ruta,
                    content : "false",
                    date : hoy.toDateString()
                }
                createTwit(datos)
            }else{
                Swal.fire({
                    icon : "warning",
                    title : "Tipo de Archivo Incorrecto",
                    text : "Solo puedes subir imagenes en estos campos."
                })
            }
        }else{
            Swal.fire({
                icon : "warning",
                title : "Campos Vacíos",
                text : "Recuerda llenar todos los campos correctamente."
            })
        }
    }


    const createTwit = async (datos) => {
        const consulta = await axios({
            method : "post",
            data : datos,
            url : `${URL}api/createTwit`
        })
        const newTiwts = [
            {
                ...datos,
                id : consulta.data 
            },
            ...twits
        ]
        dispatch({
            type : "@addTwitsUser",
            twits : newTiwts
        })
        Swal.fire({
            icon : "success",
            title : "Twit subido Correctamente"
        })
    }



    return (
        <div>
            <form onSubmit={addTwit} >
                <h4 className="m-2" > Twit </h4>
                <textarea onChange={(e) => setTwit(e.target.value)} type="text" name="twit" className="textarea" placeholder="¿Que quieres escribir?"  />
                
                <h4 className="m-2" > Imagen </h4>
                <input type="file" id="IMG" className="input-text" />
                
                <button className="btn bg-purple w-95 mt-3 shadow" type="submit" >
                    <h4 className="text-center text-white p-1" > Agregar Twit </h4>
                </button>
            </form>
        </div>
    );
}
 
export default AddTwit;