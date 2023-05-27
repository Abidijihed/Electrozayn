import axios from "axios"
import {CREATE_USER,Login,GET_PRODUCT} from "../actionType/userType"

export const register = (data)=>async(dispatch)=>{
    try {
       axios.post("https://www.electrozayn.com/api/getAll/product",data).then((res)=>{
        
        if(res.data[1]==="secsuss"){
            localStorage.setItem('token',res.data[0])
            localStorage.setItem("id",res.data[2])
        }
       
       })
        
       
    } catch (error) {
        console.log(error)
    }
}
export const Loginuser = (data)=>async(dispatch)=>{
    try {
       axios.post("https://www.electrozayn.com/api/electrozayn/login",data).then((res)=>{
        dispatch({type:GET_PRODUCT, payload: res.data})
        if(res.data[1]==="secsuss"){
            localStorage.setItem('token',res.data[0])
            localStorage.setItem("id",res.data[2])
        }
       
       })
        
       
    } catch (error) {
        console.log(error)
    }
}