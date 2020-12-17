export default {
  bind(field) {
    field.__AutoResizer__ = () => {
      // field.style.cssText = 'height:' + el.scrolHeight + 'px'
      // field.style.cssText = 'height:auto'
      // setTimeout(()=>{
      //     field.style.cssText = 'height:auto'
      //     field.style.cssText = 'height:' + field.scrolHeight + 'px'
      // },0)

      field.style.height = "inherit";

      // Get the computed styles for the element
      var computed = window.getComputedStyle(field);

      // Calculate the height
      var height =
        parseInt(computed.getPropertyValue("border-top-width"), 4) +
        parseInt(computed.getPropertyValue("padding-top"), 4) +
        field.scrollHeight +
        parseInt(computed.getPropertyValue("padding-bottom"), 4) +
        parseInt(computed.getPropertyValue("border-bottom-width"), 4);

      field.style.height = height + "px";
    };

    field.addEventListener("keydown", field.__AutoResizer__);
  },

  unbind(field) {
    field.removeEventListener("keydown", field.__AutoResizer__);
  },
};
