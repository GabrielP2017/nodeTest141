// 각각의 자격을 받아 페이지를 뿌려주는 감독관.
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from '../_action/user_actions'
import { useNavigate } from "react-router-dom";


export default function (SpecificComponent, option, adminRoute = null) {
    // HOC
    function AuthenticationCheck(props) {

      const dispatch = useDispatch();
      const navigate = useNavigate();
  
      useEffect(() => {
        // auth() 호출 -> server에서 현재 로그인 상태, isAdmin 등을 리턴해야 함
        // 전제: redux-promise 등 비동기 미들웨어로 인해 dispatch(auth())가 Promise를 반환
        dispatch(auth()).then((response) => {
          console.log("HOC auth check:", response);
  
          // 로그인하지 않은 상태
          if (!response.payload.isAuth) {
            // 로그인된 유저만 볼 수 있는 페이지(option === true)라면
            if (option === true) {
              navigate("/login");
            }
          } else {
            // 로그인된 상태
            // 1) 어드민 페이지인데 isAdmin이 false면 막기
            if (adminRoute && !response.payload.isAdmin) {
              navigate("/");
            }
            // 2) 로그인된 유저가 들어오면 안 되는 페이지(option === false)라면 막기
            else if (option === false) {
              navigate("/");
            }
          }
        }).catch((error) => {
            // 401 Unauthorized 에러 처리
            console.error("Auth request failed:", error.response?.data || error.message);

            // option이 false인 경우, 에러가 발생해도 페이지 접근 허용
            if (option === false) {
                console.log("Skipping authentication check for unauthenticated-only route.");
                return; // 그냥 페이지를 렌더링하도록 함
            }
        });
      }, [dispatch, navigate]);
  
      return <SpecificComponent {...props} />;
    }
  
    return AuthenticationCheck;
  }