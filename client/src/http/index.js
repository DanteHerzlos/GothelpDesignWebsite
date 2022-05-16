import axios from 'axios'

export const API_URL = '/api'

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})


$api.interceptors.request.use( config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

$api.interceptors.response.use( config => {
    return config
}, async error => {
    const originalRequest = error.config
    if (error.response.status === 401 && error.config && !error.config._isRetry){
        try {    
            originalRequest._isRetry = true 
            const response = await axios.get('/api/refresh', {withCredentials: true})
            localStorage.setItem('token', response.data.tokens.accessToken)
            return $api.request(originalRequest)
        } catch (e) {
            console.log('Неавторизованный пользователь');
        }
    }
    throw error
})

export default $api