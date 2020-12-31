const customPlugin = {
  install: function(Vue, options) {
    // 1 global metthod
    // Vue.myGlobalMethod = function(){
    //     alert('global metthod')
    // }

    // 2 global asset
    Vue.directive("blue-color", {
      bind(el, binding) {
        el.style.color = "blue";
      },
    });
    // 3inject component options
    Vue.mixin({
      data() {
        return {
          message: "this is a message",
        };
      },

      method: {
        scream() {
          alert(this.message);
        },
      },
    });
    //  4
    Vue.prototype.$customMethod = function() {
      alert("I am instance mettiod");
    };
  },
};

export default customPlugin;
