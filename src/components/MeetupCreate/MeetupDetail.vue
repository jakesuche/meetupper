<template>
  <form @input="emitFormData">
    <div class="field">
      <label class="title m-b-sm">Choose Title</label>
      <input
        v-model="form.title"
        class="input"
        type="text"
        placeholder="Enter Title"
      />
      <div v-if="$v.form.title.$error">
        <span v-if="!$v.form.title.required" class="help is-danger"
          >Title is required</span
        >
      </div>
    </div>
    <div class="field">
      <label class="title m-b-sm">Starts At</label>
      <datepicker
        @input="setDate"
        :disabledDates="disabledDates"
        :value="new Date()"
        
        :input-class="'input'"
      ></datepicker>
      <!-- <input v-model="form.startDate"
             class="input"
             type="text"
             placeholder="Starts At"> -->
      <div v-if="$v.form.startDate.$error">
        <span v-if="!$v.form.startDate.required" class="help is-danger"
          >Starts at is required</span
        >
      </div>
    </div>
    <div class="field">
      <label class="title m-b-sm">From</label>
      <!-- <vue-timepicker format="HH:mm:ss"></vue-timepicker> -->
    <!-- <timeselector></timeselector> -->
     <input
        v-model="form.timeFrom"
        class="input"
        type="text"
        placeholder="Time to"
      />
    </div>
   
    <div class="field">
      <label class="title m-b-sm">To</label>
      <input
        v-model="form.timeTo"
        class="input"
        type="text"
        placeholder="Time to"
      />
    </div>
    <div class="field">
      <label class="title m-b-sm">Please Choose the Category.</label>
      <div class="m-b-lg">
        <div class="select">
          <!-- TODO: Get Here Categories -->
          <select v-model="form.category" @change="emitFormData">
            <option
              v-for="category of categories"
              :value="category"
              :key="category.id"
            >
              {{ category.name }}
            </option>
          </select>
        </div>
        <div v-if="$v.form.category.$error">
          <span v-if="!$v.form.category.required" class="help is-danger"
            >Category is required</span
          >
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { required } from "vuelidate/lib/validators";
 import datepicker from "vuejs-datepicker";
import moment from "moment";
// import VueTimepicker from 'vue2-timepicker'
// import Timeselector from 'vue-timeselector';

export default {
  data() {
    return {
      disabledDates: {
        customePredictor: function (date) {
          const today = new Date();
          return date < today;
        },
      },

      form: {
        title: null,
        startDate: new Date(),
        timeTo: null,
        timeFrom: null,
        category: null,
      },
    };
  },
  validations: {
    form: {
      title: { required },
      startDate: { required },
      category: { required },
      timeTo: { required },
      timeFrom: { required },
    },
  },
  computed: {
    categories() {
      // console.log(this.$store.state.categories.categories);
      return this.$store.state.categories.categories;
    },
  },
  created() {
    this.emitFormData();
  },
  methods: {
    emitFormData() {
      this.$emit("stepUpdated", this.form);
    },
    setDate(date) {
      this.form.startDate = moment(date).format();
      this.emitFormData();
    },
  },
  components: {
    datepicker,
    // VueTimepicker,
    // Timeselector
  },
};
</script>

<style scoped>
.time-picker {
  display: block;
}
</style>