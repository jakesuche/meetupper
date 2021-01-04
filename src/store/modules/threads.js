
import axios from "axios";
import axiosInstance from '@/services/axios';
import Vue from 'vue'
import { applyFilters } from '@/helpers'
export default {
    namespaced: true,
    state:{
        threads:[],
        isAllThreadasLoaded:false




    },
    getters:{

    },
    actions:{
        fetchThreads(context, {meetupId,filter = {},init}) {

          const initialize = {init}
         
          if(initialize['init']['init']){
            context.commit('setThreads',[], {root:true})
         
          }
          const url = applyFilters(`/api/v1/threads?meetupId=${meetupId}`, filter)


            axios.get(url).then((res) => {
              const threads = res.data.threads;
              const isAllDataLoaded =  res.data.isAllDataLoaded
              context.commit('SetIsAllDataLoaded', isAllDataLoaded)
              context.commit('mergeThreads', threads)
              // context.commit("setThreads", threads, {root:true});
              return context.state.threads
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
            
            // console.log(post)
            return axiosInstance.post('/api/v1/posts', post)
            .then((res)=>{
              const createdPost = res.data
             
              dispatch('addPostToThread',{post:createdPost, threadId})
              
              return createdPost
              
            })

          },
          addPostToThread({commit,state},{post,threadId}){
            
            const threadIndex =  state.threads.findIndex(thread => thread._id === threadId)
            
            if(threadIndex > -1){
              
              const posts = state.threads[threadIndex].posts
              
             
              posts.unshift(post)
              
              commit('savePostToThread', { posts, index:threadIndex })
              

            }
          }

    },
    mutations:{
      savePostToThread(state, {posts,index}){
       
        Vue.set(state.threads[index], 'posts', posts)
      },
      SetIsAllDataLoaded(state,isAllDataLoaded){
        state.isAllThreadasLoaded = isAllDataLoaded
      },
      mergeThreads(state,threads){
        state.threads = [...state.threads, ...threads]
      }


        
    }
}