import axios from "axios";
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from './types'

export function LoginUser(dataSubmit){

    const request = axios.post('/api/login',dataSubmit)
        .then(response => response.data) //백엔드에 만들어놓은 login과 모그DB 활용.
    
    return{ // Reducer로 보내기
        type:LOGIN_USER,
        payload: request
    }

}

export function registerUser(dataSubmit) {

    const request = axios.post('/api/register', dataSubmit)
            .then(response => response.data)
    
    return{
        type: REGISTER_USER,
        payload: request // 받은 데이터를 payload로 전달
            }
}


export function auth() {

    const request = axios.get('/api/auth', { withCredentials: true })
    // 이건 get이다!그리고 get이니 body부분은 필요가 없다.
            .then(response => response.data)
    
    return{
        type: AUTH_USER,
        payload: request, // 받은 데이터를 payload로 전달
    }
}
