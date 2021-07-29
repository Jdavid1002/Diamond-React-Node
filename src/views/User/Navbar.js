import React from 'react';
import { useDispatch } from 'react-redux';
import Cookies from 'universal-cookie'

const Navbar = () => {

    const cookies = new Cookies()
    const dispatch = useDispatch()

    const cambiarInterfaz = (number) => {
        dispatch({
            type : "@changeInterfaz",
            number
        })
    }

    const Salir = () => {
        dispatch({
            type : "@exitSesion"
        })
        cookies.remove("sesion")        
        cookies.remove("id") 
        window.location.reload()       
    }

    return (
        <div className="shadow rounded p-3 z-index mb-4" >
            <div className="grid-3" >
                <div className="d-flex-center mt-2 mb-2" >
                    <h3> Diamond Social </h3>
                </div>

                <div className="d-flex-center mt-2" >
                    <div className="ml-4 mr-4 pointer" onClick={()=> cambiarInterfaz(1) } >
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="text-dark bi bi-newspaper" viewBox="0 0 16 16">
                            <path d="M0 2.5A1.5 1.5 0 0 1 1.5 1h11A1.5 1.5 0 0 1 14 2.5v10.528c0 .3-.05.654-.238.972h.738a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 1 1 0v9a1.5 1.5 0 0 1-1.5 1.5H1.497A1.497 1.497 0 0 1 0 13.5v-11zM12 14c.37 0 .654-.211.853-.441.092-.106.147-.279.147-.531V2.5a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0-.5.5v11c0 .278.223.5.497.5H12z"/>
                            <path d="M2 3h10v2H2V3zm0 3h4v3H2V6zm0 4h4v1H2v-1zm0 2h4v1H2v-1zm5-6h2v1H7V6zm3 0h2v1h-2V6zM7 8h2v1H7V8zm3 0h2v1h-2V8zm-3 2h2v1H7v-1zm3 0h2v1h-2v-1zm-3 2h2v1H7v-1zm3 0h2v1h-2v-1z"/>
                        </svg>
                    </div>
                    <div className="ml-4 mr-4 pointer"  onClick={()=> cambiarInterfaz(2)} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                        </svg>
                    </div>                 
                </div>

                <div className="d-flex-center mt-2" >
                    <div className="ml-4 mr-4 pointer" onClick={Salir}  >
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-box-arrow-left" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
                            <path fillRule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
                        </svg>
                    </div>
                </div>

            </div>
        </div>
    );
}
 
export default Navbar;