import axios from "axios"
import store from '../store'
import config from "../../config.js"

export default {
    login(email,password){
        return axios.post(config.API_URL+'/login',{
            email:email,
            password:password
        }).then(res=>{
            localStorage['token']=res.data.token
            this.getCurrentUser().then(res=>{
                store.commit('setCurrentUser',res.data)
            })
        })
    },
    getCurrentUser(){
        return axios.get(config.API_URL+'/getSelfData',{
            headers: {
                'Authorization': 'Bearer ' + localStorage['token']
              }
        })
    },
    logout(){
        localStorage.clear();
        store.commit('removeCurrenUser',false)
    },
    checkEmail(email){
        // console.log(email)
        return axios.get(config.API_URL+'/checkEmail',{params:{email:email}})
    },

    register({name,email,password}){
        return axios.post(config.API_URL+'/register',{
            name:name,
            email:email,
            password,password
        }).then(res=>{
            localStorage['token']=res.data.token
            this.getCurrentUser().then(res=>{
                store.commit('setCurrentUser',res.data)
            })
        })
    }
}