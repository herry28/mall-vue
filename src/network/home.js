import {request} from './request.js'



export function gethomeMultiData(){
    return request({
        url:'/home/multidata'
    })
}