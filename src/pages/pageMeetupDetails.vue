<template>
  <div class="meetup-detail-page">
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h2 class="subtitle">
            <!-- TODO: meetup startDate -->
            {{ meetup.startDate | formatDate }}
          </h2>
          <h1 class="title">
            <!-- TODO: title -->
            {{ meetup.title }}
          </h1>
          <article class="media v-center">
            <figure class="media-left">
              <p class="image is-64x64">
                <!-- OPTIONAL: meetupCreator avatar -->
                <img class="is-rounded" :src="meetupCreator.avatar || ''" />
              </p>
            </figure>
            <div class="media-contentq">
              <div class="content">
                <p>
                  <!-- OPTIONAL: meetupCreator name -->
                  <!-- this will return 'Meetup created by if the  the created id matches the user id and return just the name if it doesnt match ' -->
                  Created by <strong>{{ (meetupCreator._id ==  (authUser ? authUser._id : ''))? ` me (${meetupCreator.name})` : meetupCreator.name  }}</strong>
                </p>
              </div>
            </div>
          </article>
        </div>
        <div class="is-pulled-right">
          <!-- We will handle this later (: -->
          <button
            @click="leaveMeetup()"
            v-if="isMember"
            class="button is-danger"
          >
            Leave Meetup
          </button>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-3">
            <aside class="is-medium menu">
              <div class="meetup-side-box">
                <div class="meetup-side-box-date m-b-sm">
                  <p><b>Date</b></p>
                  <!-- TODO: meetup startDate -->

                  <p>{{ meetup.startDate | formatDate }}</p>
                </div>
                <div class="meetup-side-box-date m-b-sm">
                  <p><b>Time</b></p>
                  <!-- TODO: meetup timeFrom - timeTo -->
                  <span>{{ meetup.timeFrom }}</span> -
                  <span>{{ meetup.timeTo }}</span>
                </div>
                <div class="meetup-side-box-place m-b-sm">
                  <p><b>How to find us</b></p>
                  <!-- TODO: meetup location -->
                  <p>{{ meetup.location }}</p>
                </div>
                <div class="meetup-side-box-more-info">
                  <p><b>Additional Info</b></p>
                  <!-- TODO: meetup shortInfo -->
                  <p>{{ meetup.shortInfo }}</p>
                </div>
              </div>
              <div class="meetup-side-box-map">
                <img
                  src="https://cnet2.cbsistatic.com/img/H_zPLL8-QTZOLxJvgHQ1Jkz0EgY=/830x467/2013/07/10/f0bcef02-67c2-11e3-a665-14feb5ca9861/maps_routemap.png"
                  class="venueMap-mapImg span--100"
                  alt="Location image of meetup venue"
                />
              </div>
              <!-- Threads Start -->
              <p class="menu-label">Threads</p>
              <ul>
                <li v-for="thread in threads" v-bind:key="thread._id">
                  {{ thread.title }}
                </li>
              </ul>
              <p class="menu-label">Who is Going</p>
              <div class="columns is-multiline is-mobile">
                <!-- Joined People Images Here -->
                <div
                  v-for="person in meetup.joinedPeople"
                  :key="person._id"
                  class="column is-3"
                >
                  <figure class="image is-64x64">
                    <img class="is-rounded" :src="person.avatar" alt="Image" />
                  </figure>
                </div>
              </div>
                 <!-- Threads Ends -->
            </aside>
          </div>
          <div class="column is-7 is-offset-1">
            <div class="content is-medium">
              <h3 class="title is-3">About the Meetup</h3>
              <!-- TODO: meetup description -->
              <p>{{ meetup.description }}</p>
              <!-- Join Meetup, We will handle it later (: -->
              <button
                @click="joinMeetUp()"
                v-if="canJoin"
                class="button is-primary"
              >
                Join In
              </button>
              <!-- Not logged In Case, handle it later (: -->
              <button
                v-if="!isAuthenticated"
                :disabled="true"
                class="button is-warning"
              >
                You need to authenticate in order to join
              </button>
              <br />
              <br />
              <!-- @threadSubmitted="createThread" -->
              <ThreadCreadModal
                @threadSubmitted="createThread"
                :btnTitle="`welcome ${authUser.username}, start a new thread`"
                :title="'create thread'"
                v-if="isMeetupOwner || isMember"
              />
            </div>
            <!-- Thread List START -->
             <ThreadList :threads="orderedThreads"  :isAuthenticated="isAuthenticated" :canMakepost="canMakepost"/>
              <button v-if="!isAllThreadsLoaded" @click="fetchThreadsHandler" class="button is-primary">Load More Thread</button>
            <!-- Thread List END -->
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// import axios from 'axios'
import { mapActions, mapState } from "vuex";
import ThreadCreadModal from "@/components/threadCreadModal";
import ThreadList from '@/components/threadList'
// import withWarning from '@/directives/withWarning'
import autoExpand from "@/directives/autoExpand";
export default {
  directives: { autoExpand },
  data() {
    return {
      text: null,
      threadPageNum:1,
      threadPageSize:5,
      
    };
  },
  components: {
    ThreadCreadModal,
    ThreadList
  },
  

  created() {

    
    
    
    const meetupId = this.$route.params.id;
    // console.log(this)
    // this.$store.dispatch('fetchMeetupBy', meetupId)
    // this.$store.dispatch('fetchThreads', meetupId)
    this.fetchMeetupBy(meetupId);
    this.fetchThreadsHandler({init:true})
    // this.fetchThreads(meetupId);
    if(this.isAuthenticated){
      this.$socket.emit('meetup/subscribe', meetupId)
      
      this.$socket.on('meetup/postPublished',(post) => this.addPostToThread({post, threadId:post.thread}))
    }
    

    // if(this.isAuthenticated){
    //   this.$socket.emit('meetup/subscribe', meetupId)
    // this.$socket.on('meetup/postPublished', function(post){
    //   console.log(post.post.text)
    //   alert(post['post']['text'])
    
    // })
    // }
  },

  destroyed(){
    this.$socket.removeListener('meetup/postPublished', (post) => this.addPostToThread({post, threadId:post.thread}))
    this.$socket.emit('meetup/unsubscribe')
  },

  computed: {
    meetupCreator: function () {
      return this.meetup.meetupCreator || {};
    },
    isAllThreadsLoaded(){
      return this.$store.state.threads.isAllThreadasLoaded
    },
    // meetup(){
    //     return this.$store.state.meetup
    // },
    // threads(){
    //     return this.$store.state.threads
    // }
    ...mapState({
      meetup: (state) => state.meetups.meetup,
      threads: (state) => state.threads.threads,
      authUser: (state) => state.auth.user,
    }),
    isAuthenticated() {
      return this.$store.getters["auth/isAuthenticated"];
    },
    
    // sanitaize meetup error
    meetupCreatorId() {
      let creatorId = this.meetup.meetupCreator
        ? this.meetup.meetupCreator._id
        : "";
      return creatorId;
    },
    isMeetupOwner() {
      return this.$store.getters["auth/isMeetupOwner"](this.meetupCreatorId);
    },
    isMember() {
      return this.$store.getters["auth/isMember"](this.meetup._id);
    },
    canJoin() {
      return !this.isMeetupOwner && this.isAuthenticated && !this.isMember;
    },
    canMakepost() {
      return this.isAuthenticated && (this.isMember || this.isMeetupOwner);
    },

    orderedThreads() {
      let clone = this.threads.slice();

      return clone.sort((thread, nextThread) => {
        //console.log(`this is thread ${thread.createdAt} while this is nextthread ${nextThread.createdAt}`)
        return new Date(nextThread.createdAt) - new Date(thread.createdAt);
      });
    },

    //     ...mapGetters({
    //       'user': "auth/authUser",
    // }),
  },
  methods: {
    ...mapActions("meetups", ["fetchMeetupBy"]),
    ...mapActions("threads", ["fetchThreads", "postThread", 'addPostToThread']),

    fetchThreadsHandler(init){
       const meetupId = this.$route.params.id;
      const filter = {
        pageNum:this.threadPageNum,
        pageSize:this.threadPageSize
      }
    
      this.fetchThreads({meetupId, filter,init})
      .then(()=>{
        this.threadPageNum++
      })
    },

    joinMeetUp() {
      this.$store
        .dispatch("meetups/joinMeetUp", this.meetup._id)
        .then(() => {
          this.$toasted.show("You just joined this meetup", {
            duration: 4000,
            position: "top-center",
            theme: "bubble",
          });
        })
        .catch((err) => {
          console.log(err);
          this.$store.dispatch("meetups/leaveMeetup", this.meetup._id);

          this.$toasted.error(
            "An error occured why joining the meetup, please if the  error persist, try refreshing your page",
            {
              duration: 4000,
              position: "top-center",
              theme: "bubble",
            }
          );

          this.$router.go(0);
        });
    },
    leaveMeetup() {
      this.$store
        .dispatch("meetups/leaveMeetup", this.meetup._id)
        .then(() => {
          this.$toasted.show("You left  this meetup", {
            duration: 4000,
            position: "top-center",
            theme: "bubble",
          });
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
    createThread({ title, done }) {
      const meetupId = this.meetup._id;
      this.$store
        .dispatch("threads/postThread", { title, meetupId })
        .then(() => {
          this.$toasted.success("Thread successfully created", {
            duration: 3000,
          });
          done();
        });
    },
    sendPost(){
      const thread = {
        text:this.text,
        
      }
      console.log(thread)
      console.log(this.threads._id)
      // this.$store.dispatch('threads/sendPost', thread)

    }
  },

};
</script>

<style scoped lang="scss">
.tag.is-warning {
  opacity: 0.5;
}
.meetup-detail-page {
  background-color: #f5f5f5;
  .mapouter {
    text-align: right;
    height: 500px;
    width: 600px;
  }
  .gmap_canvas {
    overflow: hidden;
    background: none !important;
    height: 500px;
    width: 600px;
  }
  .hero-body {
    background-color: white;
    border: 1px solid rgba(46, 62, 72, 0.12);
    color: white;
    background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
      url("https://images.unsplash.com/photo-1531263060782-b024de9b9793?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80");
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    > p,
    h1,
    h2,
    strong {
      color: white;
    }
  }
  .meetup-side-box {
    background-color: white;
    border-radius: 10px;
    font-size: 16px;
    padding: 15px;
  }
}
pre,
.message {
  max-width: 960px;
}
.v-center {
  align-items: center;
}
li {
  margin: 10px;
}
.hero.is-primary {
  background: linear-gradient(to top right, #524ad0 10%, #d099fa);
}
.box {
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
}
.box span.icon {
  float: right;
  font-size: 1.7em;
  padding: 2rem 2rem 0 0;
}
.is-large.fab {
  font-size: 7em;
}
.is-large.fas {
  font-size: 5em;
  margin-left: 0.2em;
}
.media-content {
  overflow: hidden;
}
.menu-list li a:hover {
  background: #d9d9d9;
}
.token.number {
  display: inline;
  padding: inherit;
  font-size: inherit;
  line-height: inherit;
  text-align: inherit;
  vertical-align: inherit;
  border-radius: inherit;
  font-weight: inherit;
  white-space: inherit;
  background: inherit;
  margin: inherit;
}
.footer {
  background-color: white;
}
// Post Create Input START
.textarea-post {
  padding-bottom: 30px;
}
.post-create {
  margin-bottom: 15px;
}
// Post Create END
// Thread List START
.content {
  figure {
    margin-bottom: 0;
  }
}
.media-content {
  background-color: #f1f1f1;
  padding: 3px 20px;
  border-radius: 10px;
  margin-right: 40px;
  width: 100px;
}
.media-left.user-image {
  margin: 0;
  margin-right: 15px;
}
.post-item {
}
.media + .media {
  border: none;
  margin-top: 0;
}
.post-content {
  margin: 0;
  &-message {
    font-size: 16px;
  }
  .author {
    font-size: 18px;
  }
  .post-time {
    font-size: 16px;
  }
}
// Thread List END
</style>