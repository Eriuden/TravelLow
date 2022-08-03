import { GET_USER, UPLOAD_PICTURE, UPDATE_BIO, DELETE_USER } from "../actions/user.action";

//Interet de l'usage de Redux
// gestion des states de l'appli
//Pour rappel, un state, c'est un objet de react pour stocker des données
//quand ceux ci sont nombreux et/ou modifiés fréquemment

const initialState = {};

export default function userReducer(state = initialState, action){
    switch (action.type) {
        case GET_USER:
            return action.payload
        case UPLOAD_PICTURE:
            return {
                //le ...state est pour récupérer l'ancienne valeur, sans l'écraser
                ...state,
                picture: action.payload
            }
        case UPDATE_BIO:
            return {
                ...state,
                bio: action.payload
            }

        case DELETE_USER:
            return state.filter((user) => user._id !== action.payload.userId);
        
        default:
            return state;
    }
}