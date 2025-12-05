//import axios
import axios from 'axios'
import App from '../App'

//declare api 
const API=import.meta.env.VITE_API_URI

//register 
export function registerUser(data){
    //data={name,email,password}
    return axios.post(`${API}/register`, data)
}


//login
export function loginUser(data){
  //data={email,password}
  return axios.post(`${API}/login`, data)
}

//get profile
export function getProfile(token){
    return axios.get(`${API}/profile`, {
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
}