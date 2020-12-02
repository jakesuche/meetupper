import axios from 'axios'
import axiosInstance from '@/services/axios'
// import { rejectError } from '@/helpers/index'






export default {
    namespaced: true,
    state:{
        user:null,
        isAuthResolved:false

    },
    getters:{
        authUser(state){
            return state.user || null
        },
        isAuthenticated(state){
            console.log(!!state.user)
            return !!state.user 
            
        }
      
    },
    actions:{
        loginWithEmailAndPassword(context, userData){
            return axios.post('/api/v1/users/login', userData)
            .then(res=>{
                const user = res.data
                console.log(res.data, 'sjsjsjs')
                localStorage.setItem('username', user.username)
                localStorage.setItem('vue-meet-token', user.token)
                context.commit('setAuthUser',user)
                
            })
           

        },
        registerUser(context, userData){
            return axios.post('/api/v1/users/register', userData)
           

        },
        logout(context){
            return axios.post('/api/v1/users/logout')
            .then(()=> {
                localStorage.clear('vue-meet-token')
                context.commit('setAuthUser', null)
                
                return true
            })
            .catch(err => {
               return err
            })

        },
        getAuthUser(context){
            const authUser = context.getters['authUser']
            const token = localStorage.getItem('vue-meet-token')
           
           
            console.log(token, 'getUser')
            if(authUser){ return Promise.resolve(authUser)}

            const config = {
                headers:{
                    "Cache-Control":'no-cache',
                    // "authorization":`Bearer ${token}`
                }
            }

            return axiosInstance.get('/api/v1/users/me', config)
            .then((res) => {
                const user = res.data
                context.commit('setAuthUser', user)
                context.commit('setAuthState', true)
                console.log(res.status)
                return user
               
            })
            .catch(err =>{
                context.commit('setAuthUser', null)
                context.commit('setAuthState', true)
                // console.log(err.response.data['message'])
                console.log(this)
                // this.$toasted.error(err.response.data['message'],{duration:7000,position:"top-center",theme:"bubble",fullwidth:true})
        
                return err
            })
        }

    },
    mutations:{
        setAuthUser(state,user){
            return state.user = user
        },
        setAuthState(state, authState){
            return state.isAuthResolved = authState
        }

    }
}
// export default {
//     namespaced: true,
//     state:{

//     },
//     actions:{
//         loginWithEmailAndPassword(context, userData){
//             console.log(userData)

//         },
//         registerUser(context, userData){
//             console.log(userData)

//         }

//     }
// }