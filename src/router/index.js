import Vue from "vue";
import Router from "vue-router";
import store from '@/store'

import PageHome from "@/pages/pageHome";
import PageMeetup from "@/pages/pageMeetupDetails";
import pageMeetupFind from "@/pages/pageMeetupFind";
import pageNotfound from "@/pages/pageNotFound";
import pageLogin from "@/pages/pageLogin";
import pageRegister from "@/pages/pageRegister";
import pageProfile from "@/pages/pageProfile"
import secretPage from '@/pages/secretePage'
import PageNotAuthenticated from '@/pages/pageNotAuthenticated'
import pageMeetupCreate from '@/pages/pageMeetupCreate'
import pageMeetupEdit  from '@/pages/PageMeetupEdit'
Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "pagehome",
      component: PageHome,
    },
    {
      path: '/find',
      name: 'PageMeetupFind',
      component: pageMeetupFind
    },
    {
      path: "/find/:category",
      name: "pageMeetupFindCategory",
      component: pageMeetupFind,
      props:true
    },
    {
      path:"/me",
      name:"pageProfile",
      component:pageProfile,
      meta:{onlyAuthUser:true}
    },
    {
      path: "/meetup/:id/",
      name: "pageMeetupDetail",
      component: PageMeetup,
    },
    {
      path: "/meetup/:meetupId/edit",
      name: "pageMeetupEdit",
      component: pageMeetupEdit,
      meta:{onlyAuthUser:true},
      props:true
    },
    {
      path: "/meetups/secret",
      name:'pageMeetupSecret',
      component:secretPage,
      meta:{onlyAuthUser:true}
      // beforeEnter(to,from,next){
      //   const s = store.getters['auth/isAuthenticated']
      //   console.log('from route',s)
      //   if(store.getters['auth/isAuthenticated']){
      //    return  next()
      //   }else{
      //     next({name:'pageNotAuthenticated'})
      //   }
      // }
      
    },
    {
      path:"/meetups/new",
      name:"ppageMeetupCreate",
      component:pageMeetupCreate,
      meta:{onlyAuthUser:true}
    },
    {
      path: "/login",
      name: "pageLogin",
      component: pageLogin,
      meta:{onlyGuestUser:true}
    },
    {
      path:"/401",
      name:"pageNotAuthenticated",
      component:PageNotAuthenticated

    },
    {
      path: "/register",
      name: "pageSignUp",
      component: pageRegister,
      meta:{onlyGuestUser:true}
    },
  
    {
      path: "*",
      name: "pageNotfound",
      component: pageNotfound,
    },
  ],
  mode: "history",
});

router.beforeEach((to, from, next) => {
  store.dispatch('auth/getAuthUser')
  .then(()=> {
    if(to.meta.onlyAuthUser){
      if(store.getters['auth/isAuthenticated']){
        next()
      }else{
        next({name:'pageNotAuthenticated'})
      }
    }else if(to.meta.onlyGuestUser){
      if(store.getters['auth/isAuthenticated']){
        next('/')
      }else{
        next()

      }
      
    }
    else{
      next()
    }
  
  })
})

export default router;
