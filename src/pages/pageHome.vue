<template>
  <div >
    <AppHero />
    <div  v-if="isLoaded" class="container">
      <section class="section">
        <div class="m-b-lg">
          <h1 class="title is-inline">Featured Meetups in "Location"</h1>
          <AppDropdown />
          <router-link
            v-if="user"
            :to="{ name: 'ppageMeetupCreate' }"
            class="button is-primary is-pulled-right m-r-sm"
          >
            Create Meetups
          </router-link>
          PageFine
          <router-link
            :to="{ name: 'PageMeetupFine' }"
            class="button is-primary is-pulled-right m-r-sm"
            >All</router-link
          >
        </div>
        <div class="row columns is-multiline">
          <!-- iterating meetup -->
          <MeetupItem
            v-for="meetup in meetups"
            :key="meetup._id"
            :meetup="meetup"
          />
        </div>
      </section>
      <section class="section">
        <div>
          <h1 class="title">Categories</h1>
          <div class="columns cover is-multiline is-mobile">
            <!-- category -->
            <CategoryItem
              v-for="category in categories"
              :key="category._id"
              :category="category"
            />
          </div>
        </div>
      </section>
    </div>
  <div class="container" v-else>
    <Appspinner />
  </div>
  </div>
  
</template>

<script>
// import axios from "axios";
import CategoryItem from "@/components/categoryItem";
import MeetupItem from "@/components/meetupItem";
import Appspinner from "@/components/shared/appSpinner";
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  components: {
    CategoryItem,
    MeetupItem,
    Appspinner,
  },
  data() {
    return {
      isLoaded: false,
    };
  },

  computed: {
    //   meetups(){
    //     //   return this.$store.getters['meetups']
    //     return this.$store.state.meetups

    //   },
    //   categories(){
    //     //   return this.$store.getters['categories']
    //     return this.$store.state.categories

    //   }
    ...mapGetters({
      'user': "auth/authUser",
    }),
    ...mapState({
      meetups: (state) => state.meetups.meetups,
      categories: (state) => state.categories.categories,
    }),
  },

  created() {
    //   console.log(this.fetchMeetups())
    //  this.$store.dispatch('fetchMeetups')
    //  this.$store.dispatch('fetchCategories')

    this.fetchMeetups()
      .then(() => {
        return this.fetchCategories();
      })
      .then(() => {
        this.isLoaded = true;
      })
      .catch((err) => {
        if(err.response['statusText'] === 'Unprocessable Entity'){
           this.$toasted.error(
          "Cannot get resource  because of network connection error ",
          {
            duration: 1000000,
            position: "top-center",
            theme: "bubble",
            fullwidth: true,
          }
        );
        }else{
           this.$toasted.error(
          "Cannot get resource  because of  " + err.response["statusText"],
          {
            duration: 1000000,
            position: "top-center",
            theme: "bubble",
            fullwidth: true,
          }
        );
        }
       
      });

    // axios.get('')
    // let token = localStorage.getItem("vue-meet-token") || "";

    // const config = {
    //   headers: {
    //     'Cache-Control': "no-store, no-cache, must-revalidate, post-check=0, pre-check=0",
    //     'Pragma': "no-cache",
    //     authorization: `Bearer ${token}`,
    //   },
    // };
    // axios
    //   .get("/api/v1/users/me", config)
    //   .then(() => {
        
    //   })
    //   .catch((err) => {
    //     if (
    //       err.response["data"]["message"] ===
    //       "Your access token has expired,  pls login again to have access"
    //     ) {
    //       this.$toasted.error(err.response["data"]["message"], {
    //         duration: 10000,
    //         position: "top-center",
    //         theme: "bubble",
    //         fullwidth: true,
    //       });
    //     } else {
    //       return null;
    //     }
    //   });
  },
  methods: {
    ...mapActions("meetups", ["fetchMeetups"]),
    ...mapActions("categories", ["fetchCategories"]),
  },
};
</script>

<style scoped>
.is-rounded {
  border-radius: 10px !important;
}

@media only screen and (max-width: 1000px) {
  
  .column.is-one-third, .column.is-one-third-tablet{
    width:100%
  }
 
}
@media only screen  and (max-width: 411px){
 .title{
    font-size:20hepx!important;
    display:inline!important
  }

  
}

</style>