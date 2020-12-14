<template>
  <div class="meetup-create-page">
    <AppHero />
    <section class="section">
      <div class="container">
        <MeetupCreateWizard @meetupConfirm="createMeetup" />
      </div>
    </section>
  </div>
</template>

<script>
import MeetupCreateWizard from "@/components/MeetupCreate/MeetupCreateWizard";
import AppHero from "@/components/shared/AppHero";
export default {
  components: {
    MeetupCreateWizard,
    AppHero,
  },
  created() {
    this.$store.dispatch("categories/fetchCategories");
  },
  methods: {
    createMeetup(meetupToCreate) {
      console.log(meetupToCreate, "hello from here");
      this.$store
        .dispatch("meetups/createMeetup", meetupToCreate)
        .then((res) => {
          console.log(res.result._id)
           this.$router.push(`/meetup/${res.result._id}`);
         
          this.$toasted.show("New Meetup created" , {
            duration: 4000,
            position: "top-center",
            theme: "bubble",
          });
           
        })
        .catch((err) => {
           this.$toasted.error("There was an error in creating your meetup" , {
            duration: 4000,
            position: "top-center",
            theme: "bubble",
          });

          console.log({ err });
        });
    },
  },
};
</script>

<style scoped >
.meetup-create-page {
  min-height: 100vh;
}
</style>