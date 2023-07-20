import axios from "axios"
import {CREATE_USER,Login,GET_PRODUCT,GET_SHOPCARD} from "../actionType/ActionType"

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
       dispatch({type:GET_PRODUCT,payload:res.data})
})
    } catch (error) {
        console.log(error)
    }

}
export const create_product=(data)=>async(dispatch)=>{
    try {
       axios.get("https://www.electrozayn.com/api/Create/Nenw/product",data)
       dispatch(get_product())
    } catch (error) {
        
    }

}
export const update_product=(id,data)=>async(dispatch)=>{
    try {
      axios.get(`https://www.electrozayn.com/api/update/product/${id}`,data)
       dispatch(get_product())
    } catch (error) {
        
    }

}
export const add_tocard=(id,data)=>async(dispatch)=>{
    try {
      axios.put(`https://www.electrozayn.com/api/add_to_card/products/${id}`,data)
       dispatch(get_product())
    } catch (error) {
        
    }

}
export const get_shopcard=()=>async(dispatch)=>{
    try {
      axios.get("https://www.electrozayn.com/api/get_product/card").then((res)=>{
       dispatch({type:GET_SHOPCARD,payload:res.data})
})
    } catch (error) {
        console.log(error)
    }

}
export const remove_fromcard=(id)=>async(dispatch)=>{
    try {
      axios.post(`https://www.electrozayn.com/api/remove_from_card/products/${id}`)
       dispatch(get_shopcard())
    } catch (error) {
        
    }

}
export const delete_produit=(id)=>async(dispatch)=>{
    try {
      axios.put(`https://www.electrozayn.com/api/delete/product/${id}`)
       dispatch(get_shopcard())
    } catch (error) {
        
    }

}