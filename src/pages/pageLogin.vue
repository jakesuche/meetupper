<template>
  <section  v-if='isAuthResolved' class="hero is-success is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-grey">Login</h3>
          <p class="subtitle has-text-grey">Please login to proceed.</p>
          <div class="box">
            <figure class="avatar">
              <img src="https://placehold.it/128x128" />
            </figure>
            <form>
              <div class="field">
                <div class="control">
                  <input
                    @blur="$v.form.email.$touch()"
                    class="input is-large"
                    v-model="form.email"
                    type="email"
                    placeholder="Your Email"
                    autofocus=""
                    autocomplete="email"
                  />
                  <div v-if="$v.form.email.$error" class="form-error">
                    <span v-if="!$v.form.email.required" class="help is-danger"
                      >Email is required</span
                    >
                    <span v-if="!$v.form.email.email" class="help is-danger"
                      >Email Address is not valid</span
                    >
                  </div>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input
                    @blur="$v.form.email.$touch()"
                    class="input is-large"
                    v-model="form.password"
                    type="password"
                    placeholder="Your Password"
                    autocomplete="current-password"
                  />
                  <div v-if="$v.form.password.$error" class="form-error">
                    <span
                      v-if="!$v.form.password.required"
                      class="help is-danger"
                      >password is required</span
                    >
                  </div>
                </div>
              </div>
              <!-- <button
                @click.prevent="login"
                :disabled="isFormInValid"
                class="button is-block is-info is-large is-fullwidth fa buttonload"
              > <i v-if="spinnerActive" class="fa fa-spinner fa-spin"></i>
                Login
              </button> -->
              <button
                
                @click.prevent="login"
                :disabled="isFormInValid"
                :class="classObj"
              > 
              <i v-if="spinnerActive" class="fa fa-spinner fa-spin"></i>
              <i v-if="isError" class="fa fa-exclamation-triangle"></i>
                <span v-if="ishideLogin">Login</span>
              </button>
             
            </form>
          </div>
          <p class="has-text-grey">
            <a>Sign In With Google</a> &nbsp;·&nbsp;
            <router-link to="/register">Sign Up</router-link> &nbsp;·&nbsp;
            <a href="../">Need Help?</a>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      form: {
        email: null,
        password: null,
      },
      spinnerActive:false,
      isError:false,
      ishideLogin:true,
      classObj:{
        button:true,
        'is-block':true,
        'is-info':true,
        'is-large':true,
        'is-fullwidth':true,
        'is-warning':false

       
      }
      
    };
  },
  computed: {
    isFormInValid() {
      return this.$v.form.$invalid;
    },
     isAuthResolved(){
      return this.$store.state.auth.isAuthResolved
    },
   
  },
 
  validations: {
    form: {
      email: {
        required,
        email,
      },

      password: {
        required,
      },
    },
  },
  methods: {
   
   randomIcon(){
      function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      }
      let color = `rgb(${getRandomInt(0,255)},${getRandomInt(0,255)},${getRandomInt(0,255)})`

      this.$vs.notify({title:'Icon mail',text:'Lorem ipsum dolor sit amet, consectetur',color:color,icon:'verified_user'})
    },
    openLoading(){
      this.$vs.loading()
      setTimeout( ()=> {
        this.$vs.loading.close()
      }, 2000);
    }
    
    ,
    login() {
      this.$v.form.$touch();
      this.spinnerActive = true
      this.$vs.loading()
     this.isError = false
     this.ishideLogin = false
      this.classObj['is-warning'] = false
      this.$store
        .dispatch("auth/loginWithEmailAndPassword", this.form)
        .then((res) => {
          const username = localStorage.getItem("username");
          this.$vs.notify({text:`        welcome  ${username}   `,color:'primary',icon:'verified_user',position:'top-center'})
          this.$vs.loading.close()
          this.$router.push("/");
          
          console.log(res);
          
         
          // this.$toasted.show("welcome " + username, {
          //   duration: 4000,
          //   position: "top-center",
          //   theme: "bubble",
          // });
         
         
        })
        .catch((err) => {
          const message = `${err.response.data.message} `;
          if (err.response["status"] === 500) {
            this.spinnerActive =  false
            this.isError = true
            this.ishideLogin = false
            this.$vs.loading.close()

            
            this.classObj['is-warning'] = true
            this.spinnerActive =  false
            this.$toasted.error(
              "Cannot not send login request because of  " +
                err.response["statusText"],
              {
                duration: 7000,
                position: "top-center",
                theme: "bubble",
                fullwidth: true,
              }
            );
          } else {
            this.$vs.loading.close()
            this.spinnerActive =  false
            this.isError = true
            this.classObj['is-warning'] = true
             this.$vs.notify({text:`  ${message}  `,color:'warning',icon:'report_problem',position:'top-center'})
         
            // this.$toasted.error(message, {
            //   duration: 4000,
            //   position: "top-center",
            //   theme: "bubble",
            //   fullwidth: true,
            // });
          }
        });
    },
  },

  components: {},
};
</script>

<style scoped>
.hero.is-success {
  background: #f2f6fa;
}
.hero .nav,
.hero.is-success .nav {
  -webkit-box-shadow: none;
  box-shadow: none;
}
.box {
  margin-top: 5rem;
}
.avatar {
  margin-top: -70px;
  padding-bottom: 20px;
}
.avatar img {
  padding: 5px;
  background: #fff;
  border-radius: 50%;
  -webkit-box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1),
    0 0 0 1px rgba(10, 10, 10, 0.1);
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
}
input {
  font-weight: 300;
}
p {
  font-weight: 700;
}
p.subtitle {
  padding-top: 1rem;
}

  /* Some padding */
   /* Set a font-size */


/* Add a right margin to each icon */

  
</style>