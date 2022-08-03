import { GET_All_USERS } from "../actions/user.action"

const initialState = {}

export default function allUsersReducer(state = initialState, action) {
    switch(action.type) {
        case GET_All_USERS:
            return action.payload
        default:
            return state
    }
}