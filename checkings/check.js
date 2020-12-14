// // this is for store 
// state:{
// 	meetups:[],
// 	categories:[]
// },



// mutations:{
// setMeetups(state,meetups){

// }
// }






export default ({
    state: {
        meetups: [],
        categories: [],
        meetups:{},
        user:{}
    },
    actions: {
        fetchMeetups(context) {
            axios.get('/api/v1/meetups')
                .then(res => {
                    const meetups = res.data
                    commit('setMeetups', meetups)
                    return state.meetups
                })
        },
        fetchMeetup(context,meetupId) {
            axios.get('/api/v1/meetups/'+ meetupId)
                .then(res => {
                    const meetups = res.data
                    commit('setMeetup', meetups)
                    return state.meetups
                })
        },
        registerUser(context, userData){
            return axios.post('/api/v1/users/me')
        },
        loginWithEmailAndPassword(context,userData){
            return axios.post('/api/v1/users/login', userData)
            .then(res=>{
                const user = res.data
                commit('setAuthUser', user)
            })
        },
        // this will get the authenticated user the will be used to preserve our state
        getAuthUser(context){
            return axios.get('/api/v1/users/me')
            .then(res=>{
                const user = res.data
                context.commit('setAuthUser',user)
                return user
            })
            .catch(err=>{
                commit('setAuthUser' , null)
                return err
            })

        },
        logout({commit}){
            return axios.post('/api/v1/users/logout')
            .then(()=>{
                commit('setAuthUser', null)
            })
            .catch(err=>{
                commit('setAuthUser',null)
                return err
            })
        },
    },
    mutations: {
        setMeetups(state, meetups) {
            state.meetups = meetups

        },
        setMeetup(state, meetups) {
            state.meetup = meetup

        },
        setAuthUser(state,user){
            return state.user = user
        }

    },

    /// for vue component

    computed: {
        meetups() {
            return this.$store.state.meetups

        },
        categories() {
            return this.$store.state.categories

        }
    },
    created() {
        this.$store.dispatch['fetchMeetups']
        this.$store.dispatch['fetchMeetup', meetupId]
        this.$store.dispatch['categories' ]
    }

})

// improvement with mapActions 
import {mapState, mapGetters}from 'vuex'
export default({
    
    computed:{
        ...mapState({
            meetups:state =>state.meetups,
            categories:state=> state.categories
        }),
        // with the main project example ...i can access the auth users from the module
        ...mapGetters({
            'user':'auth/authUser'
        })
    },
    //first map actions will be in
    methods:{
        // the actions we declared in the store
        // the will find the fetchMeetups and fetchCategories actions we declared in the store
        ...mapActions(['fetchMeetups', 'fetchCategories'])
        // mapActions maps our actions  to the this context bellow

    },
    created(){
        this.fetchMeetups()
        this.fetchMeetups()
        this.fetchMeetups(meetupId)

    }

})


/// modules 