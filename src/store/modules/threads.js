
import axios from "axios";
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

    },
    mutations:{
        
    }
}