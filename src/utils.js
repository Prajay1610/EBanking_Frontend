import {config} from './config'

export const createUrl=(path)=>{
    return `${config.serverUrl}/${path}`
}