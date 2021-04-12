import axios from "axios";


const  apiKeyYelp = 'DpR5wJzrNrmRKT-dJrcakLRZ-LENb9zyQoxUjO5_jGwFJ-IS_Rk00uxnzIkaIr4mDSGO6m707XKpzEo6DGVsEsen0GlAaUTEcaB216YYbXuLfrzQNsnrb7WSWVNTYHYx'
export const apiYelp = axios.create({
    baseURL: "https://api.yelp.com/v3/",
    headers: {
        Authorization: 'Bearer ' + apiKeyYelp
    }
})