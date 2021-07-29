import axios from 'axios';
import React,{useState} from 'react';
import Swal from 'sweetalert2';
import URL from '../Config/URL';

const RegisterTwo = ({datos}) => {

    const [Campos, setCampos] = useState({description : ""})
    const onChange = (e) => {
        setCampos({
            ...Campos,
            [e.target.name] : e.target.value
        })
    }

    const validarUsuario = async (e) => {
        e.preventDefault()
        const {description } = Campos
        const Perfil = document.getElementById("Perfil").files
        const Background = document.getElementById("Background").files

        if(description !== "" && Perfil.length > 0  && Background.length > 0){
            
            if(Perfil[0].type === "image/jpeg" && Background[0].type === "image/jpeg" ){     

                const formDataPerfil = new FormData();
                formDataPerfil.append("file", Perfil[0]);
                const uploadPerfil = await axios.post(`${URL}api/addImage`, formDataPerfil, {
                    headers: {
                    'Content-Type': 'multipart/form-data'
                    }
                })      

                const formDataBackground = new FormData();
                formDataBackground.append("file", Background[0]);
                const uploadBackground = await axios.post(`${URL}api/addImage`, formDataBackground, {
                    headers: {
                    'Content-Type': 'multipart/form-data'
                    }
                }) 

                const newObjeto = {
                    ...datos,
                    description,
                    perfil : uploadPerfil.data.ruta,
                    background : uploadBackground.data.ruta
                }

                const enviarUsuario = await axios({
                    method : "post",
                    url : `${URL}api/Register`,
                    data : newObjeto
                })

                if(enviarUsuario.data){
                    window.location.replace("Diamond-React-Node/#/Login")
                }

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
                text : "Recuerda llenar correctamente los campos"
            })
        }
    }

    return (
        <div className="mt-5" >
            <form onSubmit={validarUsuario}  encType="multipart/form-data" >
                <h6 className="mt-2" > Descripción Publica </h6>
                <textarea onChange={onChange} className="input-text w-90 mt-2" name="description" placeholder="Descripción" ></textarea>
                <h6 className="mt-2" > Imagen De Perfil </h6>
                <input type="file" name="file" className="input-text mt-2" id="Perfil" />
                <h6 className="mt-2"  > Imagen De Portada </h6>
                <input type="file" name="file" className="input-text mt-2" id="Background" />
                <div className="d-flex-center" >
                    <button className="btn w-100 shadow mt-4 bg-purple text-white" > <h4>Registrate</h4> </button>
                </div>
            </form>
        </div>
    );
}
 
export default RegisterTwo;