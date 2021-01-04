import sound from '@/assets/sounds/clickButton.mp3'
export default {
    bind(el){
       
        var audio = new Audio(sound)
        
        el.__alert__ = ()=>{
           
            audio.play()
           
        }
       
        el.addEventListener('click',el.__alert__)
    //   el.__stop__ = setInterval(()=> {
    //         console.log('resolve')
    //     })
    },
    unbind(el){
        el.removeEventListener('click',el.__alert__)

    }
}