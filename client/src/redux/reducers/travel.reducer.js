import { GET_TRAVEL, LIKE_TRAVEL, UNLIKE_TRAVEL, UPDATE_TRAVEL, DELETE_TRAVEL, DELETE_COMMENT, EDIT_COMMENT } from "../actions/travel.action"

const initialState = {}

export default function travelReducer(state= initialState, action) {
    switch (action.type) {
        case GET_TRAVEL:
            return action.payload
        case LIKE_TRAVEL:
            return state.map((travel, userId) => {
                if (travel._id === action.payload.travelId)
                    return {
                        ...travel,
                        likers: [action.payload,userId, ...travel.likers]
                    }
            })
        case UNLIKE_TRAVEL:
            return state.map((travel) => {
                if (travel._id === action.payload.travelId)
                    return {
                        ...travel,
                        likers: travel.likers.filter((id) => id !== action.payload.userId)                       
                    }
                return travel
            })
        case UPDATE_TRAVEL:
            return state.map((travel) => {
                if (travel.id === action.payload.travelId) {
                    return {
                        ...travel,
                        message: action.payload.message
                    }
                } else return travel
            })
        case DELETE_TRAVEL:
            return state.filter((travel) => travel._id !== action.payload.travelId)

        case EDIT_COMMENT:
            return state.map((travel) => {
                //on commence par mapper les voyages et chercher le bon
                if(travel._id === action.payload.travelId){
                    return {
                        ...travel,
                        //Puis ensuite on fait pareil avec les comments
                        comment: travel.comment.map((comment) => {
                            if (comment._id === action.payload.commentId) {
                                return {
                                    //On empèche l'écrasement des données, puis on charge le texte
                                    ...comment,
                                    text: action.payload.text
                                }
                            } else {
                                return comment
                            }
                        })
                    }
                } else return travel
            })
        case DELETE_COMMENT:    
            return state.map((travel) => {
                if (travel.id === action.payload.travelId) {
                    return {
                        ...travel,
                        comments: travel.comment.filter((comment) => comment._id !== action.payload.commentId)
                }
        
            } else return travel
        }) 

        default:
            return state
    }
}
