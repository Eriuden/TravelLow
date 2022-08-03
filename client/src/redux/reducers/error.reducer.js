import { GET_TRAVEL_ERRORS } from "../actions/travel.action";
import { GET_USER_ERRORS } from "../actions/user.action";

const initialState = { userError: [], travelError : {}}
 
export default function errorReducer(state = initialState, action) {
    switch( action.type){
        case GET_TRAVEL_ERRORS:
            return {
                travelError: action.payload,
                userErrors: []
            }
        case GET_USER_ERRORS:
            return{
                userError: action.payload,
                travelError: []
            }
            default:
                return state
    }
}