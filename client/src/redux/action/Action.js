import axios from "axios"
import {CREATE_USER,Login,GET_PRODUCT} from "../actionType/ActionType"

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
        dispatch({type:CREATE_USER, payload: res.data})
        if(res.data[1]==="secsuss"){
            localStorage.setItem('token',res.data[0])
            localStorage.setItem("id",res.data[2])
        }
       
       })
        
       
    } catch (error) {
        console.log(error)
    }
}
export const get_product=()=>async(dispatch)=>{
    try {
      axios.get("https://www.electrozayn.com/api/getAll/product").then((res)=>{
        console.log(res.data)
      })
    //    dispatch({type:GET_PRODUCT,payload:res.data})
    } catch (error) {
        console.log(error)
    }

}
export const create_product=(data)=>async(dispatch)=>{
    try {
       const res= axios.get("https://www.electrozayn.com/api/Create/Nenw/product",data)
       dispatch(get_product())
    } catch (error) {
        
    }

}
export const update_product=(id,data)=>async(dispatch)=>{
    try {
       const res= axios.get(`https://www.electrozayn.com/api/update/product/${id}`,data)
       dispatch(get_product())
    } catch (error) {
        
    }

}