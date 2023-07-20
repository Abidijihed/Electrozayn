import { CREATE_USER, GET_PRODUCT } from "../actionType/ActionType";

const initialState = {
    user:[],
    product:[]
}

const userReducer= (state = initialState,{ type, payload }) => {
  console.log(payload)
  switch (type) {
    case CREATE_USER:
       return{...state,user:payload}
      case GET_PRODUCT:
        return {...state,product:payload}
    default:
       return state
  }
  
}
export default userReducer