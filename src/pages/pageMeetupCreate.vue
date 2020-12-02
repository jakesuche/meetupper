<template>
  <div class="meetup-create-page">
    <AppHero />
    <section class="section">
      <div class="container">
        <MeetupCreateWizard />
      </div>
    </section>
  </div>
</template>

<script>
  import MeetupCreateWizard from '@/components/MeetupCreate/MeetupCreateWizard'
 import AppHero from '@/components/shared/AppHero'
 export default {
    components: {
      MeetupCreateWizard,
      AppHero
    },
    created(){
      this.$store.dispatch('categories/fetchCategories')
    }

  }
</script>

<style scoped lang="scss">
  .meetup-create-page {
    min-height: 100vh;
  }
</style>