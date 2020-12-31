import io  from 'socket.io-client'

const Appsocket ={
    install (Vue, options){
        Vue.prototype.$socket = io(options.connection)
    }
}

export default Appsocket