
import { GET_ALL_TRAVELS } from "../actions/travel.action"


const initialState = {}
export default function allTravelReducer(state = initialState, action ) {
  switch (action.type) {
    case GET_ALL_TRAVELS:
        return action.payload
    default: 
        return state
  }
}