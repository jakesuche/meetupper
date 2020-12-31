<template>
  <div class="content is-medium">
    <h3 class="title is-3">Threads</h3>
    <div v-for="thread in threads" :key="thread._id" class="box">
      <!-- Thread title -->
      <h4 id="const" class="title is-3">{{ thread.title }}</h4>
      <!-- Create new post, handle later -->
      <!-- <form class="post-create">
        <div class="field"> -->
          <!-- v-with-warning:purple.prevent="'What a nice day'" -->
          <!-- <textarea
            v-auto-expand
            v-model="text"
            v-if="isAuthenticated"
            class="textarea textarea-post"
            placeholder="Write a post"
            rows="1"
          ></textarea> -->
          <!-- <button
            @click.prevent="sendPost"
            v-if="canMakepost"
            :disabled="!text"
            class="button is-primary m-t-sm"
          >
            Send
          </button> -->
        <!-- </div>
      </form> -->
      <post-creat
        
        :canMakepost="canMakepost"
        :isAuthenticated="isAuthenticated"
        :threadId="thread._id"
        
      />
      <!-- Create new post END, handle later -->
      <!-- Posts START -->
      <article
        v-for="post in thread.posts"
        :key="post._id"
        class="media post-item"
      >
        <figure class="media-left is-rounded user-image">
          <p class="image is-32x32">
            <img class="is-rounded" :src="post.user.avatar" />
          </p>
        </figure>
        <div class="media-content">
          <div class="content is-medium">
            <div class="post-content">
              <!-- Post User Name -->
              <strong class="author">{{ post.user.name }}</strong>
              {{ " " }}
              <!-- Post Updated at -->
              <small class="post-time">{{
                post.updatedAt | fromNow
              }}</small>
              <br />
              <p class="post-content-message">{{ post.text }}</p>
            </div>
          </div>
        </div>
      </article>
      <!-- Posts END -->
    </div>
  </div>
</template>

<script>
import autoExpand from "@/directives/autoExpand";
import postCreat from "@/components/postCreat";
export default {
  directives: { autoExpand },
  components: { postCreat },
  props: {
    threads: {
      type: Array,
      require: true,
    },
    canMakepost: {
      type: Boolean,
      require: true,
    },
    isAuthenticated: {
      type: Boolean,
      require: true,
    },
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
</style>