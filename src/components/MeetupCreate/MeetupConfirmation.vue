<template>
  <div>
    <h1 class="title m-b-sm">Please confirm entered data</h1>

    <div class="content">
      <div >
        <span class="result-title">
        Location
        </span>
        <p>{{meetupConfirm.location || 'No location'}}</p>
      </div>
      <div>
        <span class="result-title">
        Title
        </span>
        <p>{{meetupConfirm.title || 'No Title'}}e</p>
      </div>
      <div>
        <span class="result-title">
        Start Date
        </span>
        <p>{{meetupConfirm.startDate || ' No startDate'}}</p>
      </div>
      <div>
        <span class="result-title">
        From
        </span>
        <p>{{meetupConfirm.timeFrom || ' No TimeFrom'}}</p>
      </div>
      <div>
        <span class="result-title">
        To
        </span>
        <p>{{meetupConfirm.timeTo || 'TimeTo'}}</p>
      </div>
      <div>
        <span class="result-title">
        Category
        </span>
        <!-- <p>{{meetupConfirm.category['name'] || 'name'}}</p> -->
        <p>{{ name }}</p>
      </div>
      <div>
        <span class="result-title">
        Image
        </span>
        <p>{{meetupConfirm.image || 'No image'}}</p>
      </div>
      <div>
        <span class="result-title">
        Short Info
        </span>
        <p>{{meetupConfirm.shortInfo || 'No info'}}</p>
      </div>
      <div>
        <span class="result-title">
        Description
        </span>
        <p>{{meetupConfirm.description || 'No description '}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props:{
      meetupConfirm:{
        required:true,
        type:Object
      }
    },
    validations: {},
    computed:{
      name(){
        let name = this.meetupConfirm.category ? this.meetupConfirm.category['name'] : 'no categroy'
        return name
      }
    }
  }

</script>

<style scoped>
  .result-title {
    font-size: 29px;
    font-weight: bold;
  }
  .result-title + p {
    font-size: 20px;
  }
</style>