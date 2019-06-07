import axios from "axios"
import config from "../../config.js"


export default {
    
    getPastOrders(){
        let token=localStorage['token']
        let req="/getOrders";
        return axios.get(config.API_URL+req,{

            headers: {
                'Content-Type': 'application/json',
                'authorization':'Bearer '+token
            }
        })
    },

    getAllOrders(){
        let token=localStorage['token']
        let req="/getAllOrders";
        return axios.get(config.API_URL+req,{

            headers: {
                'Content-Type': 'application/json',
                'authorization':'Bearer '+token
            }
        })
    },

    makeOrder(user_id,price,details,products,place,address,phone,name){
        let token=localStorage['token']
        let req="/makeOrder";
        return axios.post(config.API_URL+req,{
            user_id:user_id,
            price:price,
            details:details,
            products:products,
            place:place,
            address:address,
            phone:phone,
            name:name
            },{
            headers: {
                'Content-Type': 'application/json',
                'authorization':'Bearer '+token
            }
        })
    },
    completeOrder(order_id){
        let token=localStorage['token']
        return axios.post(config.API_URL+"/orderSent",{order_id:order_id},{
            headers: {
                'Content-Type': 'application/json',
                'authorization':'Bearer '+token
            }
        })
    },
    getProduct(id){
        return axios.get(config.API_URL+"/getBookByProductId?id="+id);
    },
    getCategories(){
        return axios.get(config.API_URL+"/getCategories")
    }
}