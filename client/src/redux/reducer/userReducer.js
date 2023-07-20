import { CREATE_USER, GET_PRODUCT, GET_SHOPCARD } from "../actionType/ActionType";

const initialState = {
    user:[],
    product:[],
    shopcard:[]
}

const userReducer= (state = initialState,{ type, payload }) => {
  switch (type) {
    case CREATE_USER:
       return{...state,user:payload}
      case GET_PRODUCT:
        return {...state,product:payload}
        case GET_SHOPCARD:
          return {...state,shopcard:payload}
    default:
       return state
  }
  
}
export default userReducer