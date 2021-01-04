<template>
  <div v-if="isAuthResolved && isLocationResolved" id="app">
    <TheNavbar />
      <div class="page-wrapper">
        <router-view :key="$route.path"    />
      </div>
    <TheFooter />
  </div>
  <div v-else>
    <!-- <div class="loader"></div> -->
    <div v-show="openLoadingColor()">

    </div>

  </div>
</template>

<script>
// import  PageHome from '@/pages/pageHome'
import TheNavbar from '@/components/shared/TheNavbar'
import TheFooter from '@/components/shared/TheFooter'
export default {
  name: 'app',
  components: {
  
    TheNavbar,
    TheFooter
  }, 
  computed:{
    isAuthResolved(){
      return this.$store.state.auth.isAuthResolved
    },
    show(){
       return this.$vs.loading()
    },
    isLocationResolved(){
      return this.$store.state.meta.isLocationResolved
    }


  },
  methods:{
    openLoadingColor(){
      this.$vs.loading({color:this.colorLoading})
      setTimeout( ()=> {
        this.$vs.loading.close()
      }, 2000);
    },
  },
  created(){
     this.$store.dispatch('meta/fetchMetaData')
  }
}
</script>

<style lang="scss">
@import 'assets/css/spacing.css';
@import '~bulma/bulma.sass';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.bold {
  font-weight: bold;
}
.cover {
  background-size: cover;
  /*background-position: center;*/
  background-repeat: no-repeat;
  background-attachment: fixed;
}
.hero {
  position: relative;
}
.hero-body {
  padding: 3rem 1.5rem;
}
.hero-bg {
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1531263060782-b024de9b9793?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80');
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
.page-wrapper{
  min-height:55vh
}
.loader {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>