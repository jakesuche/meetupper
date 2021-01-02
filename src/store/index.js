import Vue from "vue";
import Vuex from "vuex";


import meetups from './modules/meetups'
import threads from './modules/threads'
import categories from './modules/categories'
import auth from './modules/auth'
import stats from './modules/stats'
import meta from './modules/meta'

Vue.use(Vuex);

export default new Vuex.Store({
   modules:{
       meetups,
       threads,
       categories,
       auth,
       stats,
       meta
   } ,


   mutations: {
    setMeetups(state, meetups) {
      state.meetups.meetups = meetups;
    },
    setCategories(state, categories) {
      state.categories.categories = categories;
    },
    setMeetup(state, meetup) {
      state.meetups.meetup = meetup;
    },
    setThreads(state, threads) {
      state.threads.threads = threads;
    },
    setItem(state,{resource,item}){
      state[resource].item = item
    },
    addItemToArray(state,{item,index,resource}){
      Vue.set(state[resource].threads, index, item)
    }
  //  context.commit('addItemToArray',createdThread,{root:true})
           
    // setItems(state,{resource, items}){
    //     state[resource].item = items
    // }
  },
  // in the state we are keeping our data we are sharing with our components
//   state: {
//     meetups: [],
//     categories: [],
//     threads: [],
//     meetup: {},
//   },
  // computed properties, simple functions to get a state
  // getters:{
  //     meetups(state){
  //         return state.meetups

  //     },
  //     categories(state){
  //         return state.categories

  //     }

  // },
  // actions are like methods in vue component. they should not mutatae the state.
  // very goods spot tofetch data
//   actions: {
//     fetchMeetups({ state, commit }) {
//         commit('setItems',{resource:'meetups', items:[]})
//       axios.get("/api/v1/meetups").then((res) => {
//         const meetups = res.data;
//         // commit("setMeetups", meetups);
//         commit('setItems',{resource:'meetups', items:meetups})
//         return state.meetups;
//       });
//     },

//     fetchCategories({ state, commit }) {
//         commit('setMeetups', {})
//       axios.get("/api/v1/categories").then((res) => {
//         const categories = res.data;
//         commit("setCategories", categories);
//         return state.categories;
//       });
//     },

//     fetchMeetupBy(context, meetupId) {
//     context.commit("setCategories", {})
//       axios.get(`/api/v1/meetups/${meetupId}`).then((res) => {
//         const meetup = res.data;
//         context.commit("setMeetup", meetup);
//       });
//     },

//     fetchThreads(context, meetupId) {
//       axios.get(`/api/v1/threads?meetupId=${meetupId}`).then((res) => {
//         const threads = res.data;
//         context.commit("setThreads", threads);
//       });
//     },

//     // fetchThreads({state,commit}, meetupId){
//     //     axios.get(`/api/v1/threads?meetupId=${meetupId}`).then(res=>{
//     //     const threads = res.data
//     //     commit('setThreads', threads)
//     //     return state.threads

//     // })
//     // },

//     // fetchMeetups(context){
//     //     axios.get("/api/v1/meetups").then((res) => {
//     //        const meetups = res.data
//     //        context.commit('setMeetups', meetups)
//     //       });

//     // },
//     // fetchCategories(context){
//     //     axios.get("/api/v1/categories").then((res) => {
//     //         const  categories = res.data
//     //         context.commit('setCategories', categories)
//     //       })
//     // }
//   },
  // simplefunctions to mutate a state
 
});
