import { api } from "./api"
const fetchLabels = async ()=>{
    return api.get('label/')
}

const getLabelNotes = async(labelId)=>{
    return api.get(`label/${labelId}`)
}

export {fetchLabels , getLabelNotes}