import axios from 'axios'

const baseUrl = '/api/persons'

const getContact = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const newContact = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const changeNumber = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

const deleteContact = id => {
    return axios.delete(baseUrl + '/' + id)
}

export default {getContact, newContact, changeNumber, deleteContact}