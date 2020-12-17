
import axios from "axios";
import axiosInstance from '@/services/axios';
export default {
    namespaced: true,
    state:{
        threads:[]

    },
    getters:{

    },
    actions:{
        fetchThreads(context, meetupId) {
            axios.get(`/api/v1/threads?meetupId=${meetupId}`).then((res) => {
              const threads = res.data;
              context.commit("setThreads", threads, {root:true});
            });
          },
          postThread(context,{title,meetupId}){
            
            const thread = {}
            thread.title = title
            thread.meetup = meetupId
            return axiosInstance.post('/api/v1/threads', thread)
            .then(res=>{
              const createdThread = res.data
              const index = context.state.threads.length
              context.commit('addItemToArray',{item:createdThread,index, resource:'threads' },{root:true})
              return createdThread
            })
          },
          sendPost({commit,state,dispatch},{text,threadId} ){
            const post  = {text, thread:threadId}
            cole.log(post)
            return axiosInstance.post('/api/v1/post', post)

          }

    },
    mutations:{
        
    }
}