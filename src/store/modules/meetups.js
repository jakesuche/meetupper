import axios from "axios";
import axiosInstance from '@/services/axios';
import Vue from 'vue'
import { applyFilters } from '@/helpers'

export default {
  namespaced: true,
  state: {
    meetups: [],
    meetup: {},
  },
  getters: {},
  actions: {
    fetchMeetups(context, options ={}) {
      
      const url = applyFilters('/api/v1/meetups', options.filter)
      console.log(url)
     return  axios.get(url).then((res) => {
        const meetups = res.data;
        // commit("setMeetups", meetups);
        context.commit("setMeetups", meetups, {root:true});
        return context.state.meetups
        
      });
    },
    fetchMeetupBy(context, meetupId) {
      //context.commit("setCategories", {});
      return axios.get(`/api/v1/meetups/${meetupId}`).then((res) => {
        const meetup = res.data;
        context.commit("setMeetup", meetup, {root:true});
        return context.state.meetup
      });
    },

    //  make a call to the api to create our meetup
    createMeetup({rootState},meetupToCreate){
      console.log(meetupToCreate)
      // added extra data which is meetup creator and processed location
      meetupToCreate.meetupCreator = rootState.auth.user
      meetupToCreate.processedLocation = meetupToCreate.location.toLowerCase().replace(/[\s,]+/g,'').trim()
      return axiosInstance.post('/api/v1/meetups', meetupToCreate)
      .then(res=>res.data)
     
    },
    joinMeetUp({state,rootState,commit,dispatch}, meetupId){
      const user = rootState.auth.user
      console.log(user, 'in meetup.js')
      return axiosInstance.post(`/api/v1/meetups/${meetupId}/join`)
      .then(()=>{
        dispatch('auth/addMeetupToAuthUser',meetupId,{root:true})

        const joinedPeople = state.meetup.joinedPeople
        commit('addUsersToMeetups', [...joinedPeople, user])
        return joinedPeople

        
      })
     
    },
    leaveMeetup({state, rootState,commit, dispatch}, meetupId){
      const user = rootState.auth.user

      return axiosInstance.post(`/api/v1/meetups/${meetupId}/leave`)
      .then(()=>{
        dispatch('auth/removeMeetupFromAuthUser', meetupId,{root:true})
        const joinedPeople = state.meetup.joinedPeople
        const index = joinedPeople.findIndex(juser=>juser._id === user._id ) 
        console.log(index,'line 63')
        console.log(user._id, 'comming from line 64')
        console.log(index._id, ' comming from line 65')
        joinedPeople.splice(index,1)
        commit('addUsersToMeetups', joinedPeople)
      })

    }
  },
  mutations: {
    addUsersToMeetups(state,joinedPeople){
      Vue.set(state.meetup, 'joinedPeople',joinedPeople)
    }
    
  },
};
