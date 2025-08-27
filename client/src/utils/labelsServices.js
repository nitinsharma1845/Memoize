import { api } from "./api"
const fetchLabels = async ()=>{
    return api.get('label/')
}


export {fetchLabels}