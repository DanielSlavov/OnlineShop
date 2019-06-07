import axios from "axios"
import config from "../../config.js"


export default {
    
    getProducts(category=false){
        let req="/getProducts";
        let params={}
        if(category){
            params.category=category
        }
        return axios.get(config.API_URL+req,{
            params:params,
            headers: {
                'Content-Type': 'application/json'}
        })
    },
    getProduct(id){
        return axios.get(config.API_URL+"/getProduct?product_id="+id);
    },
    getCategories(){
        return axios.get(config.API_URL+"/getCategories")
    },

    addProduct(product){
        let req="/addProduct"
        return axios.post(config.API_URL+req,product,{
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + localStorage['token']
            }
        })
    },

    removeProduct(product_id){
        console.log("removeProduct called "+product_id)
        let req="/removeProduct"
        return axios.post(config.API_URL+req,{id:product_id},{
            headers: {
                'Authorization': 'Bearer ' + localStorage['token']
            }
        })
    }
}