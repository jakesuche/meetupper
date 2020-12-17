<template>
 <form class="post-create">
                  <div class="field">
                    <!-- v-with-warning:purple.prevent="'What a nice day'" -->
                    <textarea
                      v-auto-expand
                      v-model="text"
                      v-if="isAuthenticated"
                      class="textarea textarea-post"
                      placeholder="Write a post"
                      rows="1"
                    ></textarea>
                    <button
                      @click.prevent="sendPost"
                      v-if="canMakepost"
                      :disabled="!text"
                      class="button is-primary m-t-sm"
                    >
                      Send
                    </button>
                  </div>
                </form>
    
</template>

<script>
import autoExpand from "@/directives/autoExpand";
export default {
    directives: { autoExpand },
     data() {
    return {
      text: "",
    };
  },
    props:{
        threadId:{
            type:String,
            require:true
        },
        isAuthenticated:{
            type:Boolean,
            require:true
        },
        canMakepost: {
      type: Boolean,
      require: true,
    },
    },
     methods: {
    sendPost() {
      const thread = {
        text: this.text,
      };
      console.log(thread);
      console.log(this.threads._id);
      // this.$store.dispatch('threads/sendPost', thread)
    },
  },
}
</script>
<style lang="less" scoped>

</style>