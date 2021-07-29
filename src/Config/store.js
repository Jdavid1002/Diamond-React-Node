import { createStore } from "redux"

const initialState={
    user : false,
    publicaciones : [],
    number : 1,
    twits : [],
    friends : [],
    perfil : false,
    followers : [],
    follows : [],
    twitsFollow : []
}

const reducer = (state = initialState , action) => {
    const {type, user, number, twits , friends, perfil , follows, followers, twitsFollow} = action

    if(type === "@createUser"){
        return{
            ...state,
            user
        }   
    }

    if(type === "@changeInterfaz"){
        return{
            ...state,
            number
        }   
    }

    if(type === "@exitSesion"){
        return{
            user : false,
            publicaciones : [],
            number : 1,
            twits : [],
            friends : [],
            perfil : false,
            followers : [],
            follows : [],
            twitsFollow : []
        }
    }

    if(type === "@addTwitsUser"){
        return {    
            ...state,
            twits
        }
    }

    if(type === "@addFriendsUser"){
        return{
            ...state,
            friends
        }
    }

    if(type === "@addInterfazPerfil"){
        return{
            ...state,
            perfil
        }
    }

    if(type === "@updateDataUser"){
        return{
            ...state,
            user
        }
    }

    if(type === "@updateFollows"){
        return{
            ...state,
            follows
        }
    }

    if(type === "@updateFollowers"){
        return{
            ...state,
            followers
        }
    }

    if(type === "@updateTwitsFollows"){
        return{
            ...state,
            twitsFollow
        }
    }

    return state
}


export default 
createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)