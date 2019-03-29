import axios from "axios"
import config from "../../config.js"


export default {
    
    getBooks(authors=[],genres=[]){
        return axios.get(config.API_URL+"/getBooks",{
            params:{
            authors:authors,
            genres:genres
        },
            headers: {
                'Content-Type': 'application/json'}
        })
    },
    getBookByProductId(id){
        return axios.get(config.API_URL+"/getBookByProductId?id="+id);
    },
    getGenres(){
        return axios.get(config.API_URL+"/getGenres")
    }
}