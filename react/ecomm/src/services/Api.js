import axios from "axios";
import React from 'react'

const Api = axios.create({
    baseURL:"http://localhost:8080",
    withCredentials:true,
    timeout:1000,
    headers:{
        "Accept":"application/json"
    }
}) 
export default Api