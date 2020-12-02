export const rejectError = ({response = null}) =>{
        let message = 'Oooops, something when wrong' 
        if(response && response.data && response.data.message){

            message = response.data.message
        }
        return Promise.reject(message)
    }
