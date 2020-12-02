import axios from "axios";

export default {
  namespaced: true,
  state: {
    meetups: [],
    meetup: {},
  },
  getters: {},
  actions: {
    fetchMeetups(context) {
      
     return  axios.get("/api/v1/meetups").then((res) => {
        const meetups = res.data;
        // commit("setMeetups", meetups);
        context.commit("setMeetups", meetups, {root:true});
        
      });
    },
    fetchMeetupBy(context, meetupId) {
      context.commit("setCategories", {});
      return axios.get(`/api/v1/meetups/${meetupId}`).then((res) => {
        const meetup = res.data;
        context.commit("setMeetup", meetup, {root:true});
      });
    },
  },
  mutations: {
    
  },
};
