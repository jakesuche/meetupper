<template>
  <div class="meetup-create-form">
    <div class="current-step is-pulled-right">
      {{ currentStep }} of {{ allStepCount }}
    </div>
    <!-- Form Steps -->
    <keep-alive>
      <MeetupLocation v-if="currentStep === 1" @stepUpdated="margeStepData" />
      <MeetupDetail @stepUpdated="margeStepData" v-if="currentStep === 2" />
      <MeetupDescription
        @stepUpdated="margeStepData"
        v-if="currentStep === 3"
      />
      <MeetupConfirmation v-if="currentStep === 4" :meetupConfirm="form" />
    </keep-alive>
    <progress class="progress" :value="currentProgress" max="100">
      100%
    </progress>
    <!-- <RadialProgressBar
      :diameter="200"
      :completed-steps="currentProgress"
      :total-steps="100"
    >
      <p>Total steps: 4</p>
      <p>Completed steps: {{ currentStep }}</p>
    </RadialProgressBar> -->
    <div class="controll-btns m-b-md">
      <button
        v-if="currentStep !== 1"
        @click="moveBack"
        :disabled="hideback"
        class="button is-primary m-r-sm"
      >
        Back
      </button>
      <button
        v-if="!hideFront"
        @click="moveNext"
        :disabled="hideFront"
        class="button is-primary"
      >
        Next
      </button>
      <!-- Confirm Data -->
      <button @click="emitMeetupConfirm()" v-if="hideFront" class="button is-primary">Confirm</button>
    </div>
    <!-- Just To See Data in the Form -->
    <pre><code>{{form}}</code></pre>
  </div>
</template>

<script>
import MeetupLocation from "./MeetupLocation";
import MeetupDetail from "./MeetupDetail";
import MeetupDescription from "./MeetupDescription";
import MeetupConfirmation from "./MeetupConfirmation";
// import RadialProgressBar from "vue-radial-progress";
export default {
  components: {
    MeetupLocation,
    MeetupDetail,
    MeetupDescription,
    MeetupConfirmation,
    // RadialProgressBar,
  },
  data() {
    return {
      allStepCount: 4,
      currentStep: 1,
      form: {
        location: null,
        title: null,
        startDate: null,
        category: null,
        image: null,
        shortInfo: null,
        description: null,
        timeTo: null,
        timeFrom: null,
      },
    };
  },
  computed: {
    currentProgress() {
      return (100 / this.allStepCount) * this.currentStep;
    },
    hideback() {
      return this.currentStep === 1;
    },
    hideFront() {
      return this.currentStep === 4;
    },
   
  },
  methods: {
    margeStepData(StepData) {
      this.form = { ...this.form, ...StepData };
    },
    moveNext() {
      this.currentStep++;
    },
    moveBack() {
      this.currentStep--;
    },
     emitMeetupConfirm(){
      
      this.$emit('meetupConfirm' , this.form)
     
    },
   
  },

};
</script>

<style scoped>
.meetup-create-form {
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;
  max-width: 840px;
  padding: 24px 16px 8px;
  width: 100%;
}
</style>