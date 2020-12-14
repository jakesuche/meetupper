<template>
    <div class="column is-one-third">

        <!-- router link -->
          <!-- <router-link :to="'/meetup/' + meetup._id" class="card large"> -->
          <div class="card-large">
          <router-link :to="{name: 'pageMeetupDetail',params:{id:meetup._id}}"  class="card-meetup-link">
            <div class="card-image">
              <figure class="image is-4by3">
                  <!-- image  -->
                  <img :src="meetup.image" alt="Image">
              </figure>
            </div>
            <div class="card-content">
              <div class="level m-b-md">
                <div class="media-left">
                  <div class="level-item has-text-centered">
                    <div>

                        <!-- start date -->
                      <p class="title">{{meetup.startDate | formatDate('MMM')}}</p>
                      <p class="title">{{meetup.startDate | formatDate('D') }} </p>
                    </div>
                  </div>
                </div>
                <div class="media-content">
                    <!-- meet up title -->
                    <p class="title is-4 no-padding is-marginless">{{meetup.title}}</p>
                    <!-- meet up category  -->
                    <span class="tag is-success">{{ checkName() }}</span>
                    <!-- meetup lcation  -->
                    <p class="subtitle is-7">{{meetup.location}}</p>
                </div>
              </div>
              <div class="content">
                  <!-- description -->
                  {{meetup.description}}
                  <div class="background-icon"><span class="icon-twitter"></span></div>
              </div>
            </div>
          </router-link>
          </div>
          <!-- router link stop -->
        </div>
</template>


<script>
export default {
    props:['meetup'],
    methods:{
      checkName(){
        let name = this.meetup.category.name ? this.meetup.category.name : ''
        return name
      }
    }
    
}
</script>

<style scoped>
 .is-rounded {
    border-radius: 10px !important;
  }
  .card-meetup-link {
      color:black

  }

</style>>

