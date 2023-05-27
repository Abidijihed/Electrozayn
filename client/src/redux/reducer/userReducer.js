import { CREATE_USER } from "../actionType/userType";

const initialState = {
    user:[]
}

const userReducer= (state = initialState,{ type, payload }) => {
  switch (type) {
    case CREATE_USER:
       return{...state,user:payload}
      
    default:
       return state
  }
  
}
export default userReducer