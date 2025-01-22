import { combineReducers } from 'redux';
import userReducer from './userReducer'

const rootReducer = combineReducers({
    user:userReducer,
});

export default rootReducer; // 다른 파일에서 Reducer를 쓸 수 있게 해준다.