import {
    LOGIN_USER
    ,REGISTER_USER,
    AUTH_USER
} from '../_action/types';

export default function userReducer(state = {}, action) {
    switch (action.type) { // 다른 타입이 올 때마다 다른 처치를 해줘야해서.
        case LOGIN_USER:
            return { ...state, Loginsuccess: action.payload };
                    // ... = 스프레이트 오퍼레이터 위에있는 state를 똑같이 가져옴
            break;
        case REGISTER_USER:
            return { ...state, register: action.payload };
            break;
        case AUTH_USER:
            return { ...state, usersData: action.payload };
            break;
        default:
            return state;
    }
}
