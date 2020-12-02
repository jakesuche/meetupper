



import {helpers} from 'vuelidate/lib/validators'

export const supportedFileType = value => {

    if(!helpers.req(value)) return true
    const allowedFormat =['jpg','png', 'jpeg']
    const extension = value.split('.').pop()
    console.log(extension)
    return allowedFormat.includes(extension)
}

