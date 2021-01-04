<template>
<div>
    <!-- TODO: Toggle Modal, set isOpen to oposite value of is Open -->
    <button  @click.prevent="isOpen = !isOpen" class="button is-success">{{btnTitle}}</button>
    <!-- TODO: create "isOpen" variable in data and set it to false -->
    <!-- TODO: Set is-active class when isOpen is true -->
    <!-- <div :class="['modal', 'is-active']"> -->
        <div :class="['modal', {'is-active':isOpen}]">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">{{title}}</p>
          <!-- TODO: Close Modal set isOpen to false -->
          <button @click.prevent="isOpen = false" class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <form>
            <div class="field">
              <label class="title">What would you like to ask?</label>
              <!-- TODO: Create "form" object in data containing "title" and bind it to textarea -->
              <textarea v-model="form.title"
                        class="textarea"
                        placeholder="Just write something that interest you (:"
                        rows="10"></textarea>
            </div>
          </form>
        </section>
        <footer class="modal-card-foot">
          <!-- TODO: Emit thread Create -->
          <button @click.prevent="threadSubmitted()" class="button is-success">Save changes</button>
          <!-- TODO: Close Modal set isOpen to false -->
          <button @click.prevent="isOpen = false" class="button">Cancel</button>
        </footer>
      </div>
    </div>
  </div>
    
</template>
<script>

export default {
    props:{
        btnTitle:{
            type:String,
            required:false,
            default:'open modal'
        },
         title:{
            type:String,
            required:false,
            // default:'Create'
        }
        
    },
   
   
    data(){
        return{
            isOpen:false,
            form:{
                title:''
            }

        }
    },
    methods:{
        threadSubmitted(){
            // alert('hello world')
            // this.isOpen = false
            // this.form['title'] = ''
            
            const { title } = this.form
            this.$emit('threadSubmitted', { title, done:()=>{
                this.form = {}
                this.isOpen = false 
            }})
        }
        
    }
    
}
</script>

<style scoped>

</style>