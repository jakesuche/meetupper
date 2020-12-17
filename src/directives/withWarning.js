export default {
    bind(el, binding){
        const message = binding.value || 'Are you sure you want to conitine'
        const color = binding.arg || 'blue'
        const { prevent } = binding.modifiers
        
        el.style.color = color
        el.style.borderColor = color
        el.style.borderWidth = '3px'
        el.__withWarning__ = ()=>{
            if(!prevent){
                alert(message)
            }
        }
       
        el.addEventListener('click',el.__withWarning__)
    //   el.__stop__ = setInterval(()=> {
    //         console.log('resolve')
    //     })
    },
    unbind(el){
        el.removeEventListener('click',el.__withWarning__)

    }
}