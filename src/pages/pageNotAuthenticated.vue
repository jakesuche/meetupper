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
      naviagateTopage: "pageLogin",
      status: 401,
      title: "Ooooops, You are not authenticated to visit this page, Please login",
      navigateToText: "Navigate to Login page",
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