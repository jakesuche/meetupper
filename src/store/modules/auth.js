import axios from "axios";
import axiosInstance from "@/services/axios";
import Vue from "vue";
// import { rejectError } from '@/helpers/index'

export default {
  namespaced: true,
  state: {
    user: null,
    isAuthResolved: false,
  },
  getters: {
    authUser(state) {
      return state.user || null;
    },
    isAuthenticated(state) {
     
      return !!state.user;
    },
    isMeetupOwner: (state) => (meetupCreatorId) => {
      
      if(!state.user){
        return false
      }
      else{
       
        return state.user._id === meetupCreatorId;
      }
      // if (!state.user) return false;
      // return state.user._id === meetupCreatorId;
      
      
    },
    isMember: (state) => (meetupId) => {
      //  const joinedMeetups = (state.user) ? state.user['joinedMeetups'] : undefined
      // const peopleArray = (joinedMeetups) ? Object.keys(state.user['joinedMeetups']).map(i => state.user['joinedMeetups'][i]) : undefined
      // console.log(joinedMeetups )
      return (
        state.user &&
        state.user["joinedMeetups"] &&
        state.user['joinedMeetups'].includes(meetupId)
        // Object.values(state.user["joinedMeetups"]).includes(meetupId)
      );
      // peopleArray.includes(meetupId)
      //console.log(state.user.joinedMeetups)
      // let meetupIds = []
      // meetupIds.push(state.user.joinedMeetups)
      // console.log(meetupIds)
      //let result = (state.user.joinedMeetups.includes(meetupId)) ? true : false
      //    console.log(state.user.joinedMeetups.includes(meetupId))
      //     return state.user &&
      //            state.user['joinedMeetups'] &&
      //            state.user.joinedMeetups.includes(meetupId)
    },
  },
  actions: {
    loginWithEmailAndPassword(context, userData) {
      return axios.post("/api/v1/users/login", userData).then((res) => {
        const user = res.data;

        localStorage.setItem("username", user.username);
        localStorage.setItem("vue-meet-token", user.token);
        context.commit("setAuthUser", user);
        return user
      });
    },
    registerUser(context, userData) {
      return axios.post("/api/v1/users/register", userData);
    },
    logout(context) {
      const config = {
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate, post-check=0, pre-check=0",
          Pragma: "no-cache",
        },
      };
      return axios
        .post("/api/v1/users/logout", config.headers)
        .then(() => {
          localStorage.clear("vue-meet-token");
          context.commit("setAuthUser", null);

          return true;
        })
        .catch((err) => {
          return err;
        });
    },
    getAuthUser(context) {
      const authUser = context.getters["authUser"];
      // const token = localStorage.getItem('vue-meet-token')

      // console.log(token, 'getUser')
      if (authUser) {
        return Promise.resolve(authUser);
      }

      const config = {
        headers: {
          "Cache-Control": "no-cache",
          // "authorization":`Bearer ${token}`
        },
      };

      return axiosInstance
        .get("/api/v1/users/me", config)

        .then((res) => {
          const user = res.data;
          context.commit("setAuthUser", user);
          context.commit("setAuthState", true);
          
          
          return context.state.user;
        })
        .catch((err) => {
          
          context.commit("setAuthUser", null);
          
          context.commit("setAuthState", true);
          // console.log(err.response.data['message'])
          
          // this.$toasted.error(err.response.data['message'],{duration:7000,position:"top-center",theme:"bubble",fullwidth:true})

          return err;
        });
    },
    addMeetupToAuthUser({ commit, state }, meetupId) {
      const userMeetups = [ ...state.user["joinedMeetups"], meetupId ];
      console.log(userMeetups);
      commit("setMeetupsToAuthUser", userMeetups);
      return userMeetups
    },
    removeMeetupFromAuthUser({commit, state}, meetupId){
        const userMeetupsIds = [...state.user['joinedMeetups']]
        const index = userMeetupsIds.findIndex(userMeetupId => userMeetupId === meetupId )
        userMeetupsIds.splice(index, 1)
        commit('setMeetupsToAuthUser', userMeetupsIds)
        return userMeetupsIds
    },
    updateUser({commit}, user){
      return axiosInstance.patch(`/api/v1/users/${user._id}`, user)
      .then(res=>{
        const updatedUser = res.data
      
        commit('setAuthUser', updatedUser)
        return updatedUser
      })
    }
  },
  mutations: {
    setAuthUser(state, user) {
      return (state.user = user);
    },
    setAuthState(state, authState) {
      return (state.isAuthResolved = authState);
    },
    setMeetupsToAuthUser(state, meetups) {
      return Vue.set(state.user, "joinedMeetups", meetups);
    },
  },
};
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
