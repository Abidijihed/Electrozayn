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
 
     axios.get("https://www.electrozayn.com/api/getAll/product").then((res)=>{
        console.log(res,'tedt')
     })
    //    dispatch({type:GET_PRODUCT,payload:res.data})
   

}
export const create_product=(data)=>async(dispatch)=>{
    try {
       const res= axios.get("https://www.electrozayn.com/api/Create/Nenw/product",data)
       dispatch(get_product())
    } catch (error) {
        
    }

}