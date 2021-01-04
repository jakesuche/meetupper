
  
<template>
  <nav class="navbar is-spaced" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link :to="'/'" class="navbar-item" href="https://bulma.io">
        <h1 class="title is-4">Meetuper</h1>
      </router-link>
      <a
      @click="open()"
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" :class="classObj">
      <div class="navbar-start">
        <router-link :to="'/'" class="navbar-item"> Home </router-link>

        <router-link :to="{ name: 'pageMeetupFindCategory' }" class="navbar-item">
          Find
        </router-link>

        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link"> More </a>

          <div class="navbar-dropdown">
            <a class="navbar-item"> About </a>
            <a class="navbar-item"> Jobs </a>
            <a class="navbar-item"> Contact </a>
            <hr class="navbar-divider" />
            <a class="navbar-item"> Report an issue </a>
          </div>
        </div>
        <h1 v-if="online">online</h1>
        <h1 v-else>offline</h1>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div v-if="user">Welcome {{ user.username }}</div>
        </div>
        <div v-if="user" class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link"> Account </a>
          <div class="navbar-dropdown">
            <router-link  to="/me" href="#" class="navbar-item"> Profile </router-link>
            <hr class="navbar-divider" />
            <a @click.prevent="logout()" class="navbar-item"> Logout </a>

          </div>
        </div>

        <div v-else class="navbar-item has-dropdown">
          <div class="buttons">
            <router-link :to="{ name: 'pageSignUp' }" class="button is-primary">
              <strong>Sign up</strong>
            </router-link>
            <router-link @click="classObj['is-active'] === false" :to="{ name: 'pageLogin' }" class="button is-light">
              Log in
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>

import { mapGetters } from "vuex";
export default {
  data(){
    return{
      online:{},
       classObj:{
        'is-active':false,
        'navbar-menu':true,
        
       
      }
    }
  },
  computed: {
    ...mapGetters({
     'user': "auth/authUser",
    }),
   
   
  },
  methods:{
    logout(){
      this.$store.dispatch('auth/logout')
      .then(()=>{
        this.$router.go('0')
      })
      
     

    },
     open(){
       this.classObj['is-active'] = !this.classObj['is-active'] 
    }
  },
  created(){
     
      this.online = navigator.onLine 
      console.log(this.online)

      if(navigator.onLine == false){
        this.$toasted.show(" your app is online ", {
            duration: 4000,
            position: "top-center",
            theme: "bubble",
          });
      }else{
        return true
      }
      
    }
  
};
</script>

<style scoped>
</style>

