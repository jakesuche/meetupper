<template>
  <div class="container">
    <ErrorView
      :naviagateTopage="naviagateTopage"
      :status="status"
      :title="title"
      :navigateToText="navigateToText"
    />
  </div>
</template>

<script>
import ErrorView from "@/components/ErrorView";
export default {
  data() {
    return {
      naviagateTopage: "pagehome",
      status: 404,
      title: "Ooooops, page you are trying to access doesn't exist",
      navigateToText: "Navigate back home",
    };
  },
  components: {
    ErrorView,
  },
};
</script>

<style scoped>
.title {
  font-size: 40px;
}
.subtitle {
  font-size: 140px;
  text-align: center;
}
.notFoundContainer {
  margin-top: 80px;
}
</style>