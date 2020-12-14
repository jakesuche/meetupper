
import axios from "axios";

export default {
    namespaced: true,
    state:{
        categories:[]

    },
    getters:{

    },
    actions:{
        fetchCategories(context) {
            // context.commit('setMeetups', {})
           return axios.get("/api/v1/categories").then((res) => {
            const categories = res.data;
            context.commit("setCategories", categories, {root:true});
          });
        },

    },
    mutations:{
       

        
    }
}