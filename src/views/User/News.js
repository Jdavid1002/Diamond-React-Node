import React,{useEffect} from 'react';
import axios from 'axios'
import URL from '../../Config/URL'
import Card from './Card';
import { useSelector, useDispatch } from 'react-redux';
import notFund from '../../img/404.svg'
import Friends from './Friends';


const News = () => {
    const twitsFollow = useSelector(state => state.twitsFollow)
    const user = useSelector(state => state.user)
    const follows = useSelector(state => state.follows)
    const dispatch = useDispatch()
        
    const cargarPublicaciones = async () => {
        const consulta = await axios({
            url : `${URL}api/twistFollows`,
            data : {user : user.id},
            method : "post"
        })

        const newTwits = []
        follows.forEach(element => {
            const twits = consulta.data.filter(datos => datos.user === element.user)    
            newTwits.push(twits)
        });

        const newTwitsFollows = []
        newTwits.forEach(data => {
            data.forEach(dato => {
                newTwitsFollows.push(dato)
            })
        })

        newTwitsFollows.sort(( a, b )=> 
            b.id - a.id
        );
        dispatch({
            type : "@updateTwitsFollows",
            twitsFollow : newTwitsFollows
        })
    }

    useEffect(() => {
        cargarPublicaciones()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);

    return (
        <div className="grid-2 mr-5" >
            <div>
                <Friends />
            </div>
            <div>
                {twitsFollow.length === 0 ? 
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

                        <h4 className="text-dark mt-3" > No tienes publicaciones recomendadas, empieza a seguir publico para ver twits! </h4>
                        <div className="d-flex-center p-5 shadow mt-3" >
                            <img className="w-55" src={notFund} alt="" />
                        </div>
                    </div>
                :
                    <div>
                        {twitsFollow.map(data => 
                            <Card key={data.id} data={data} edit={false} trash={false} />    
                        )}
                    </div>
                }
            </div>
        </div>
    );
}
 
export default News;