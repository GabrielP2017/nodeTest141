import React, { useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LandingPage() {

  const history = useNavigate()

    useEffect(() => {
      axios.get("/api/hello")
          .then(response => console.log(response.data)) // 백엔드에서의 응답 출력
      }, []);


  const onClickHandler = ()=>{
    axios.get("/api/logout").then(response =>{ 
      
      if (response.data.success) { // server index.js의 res.status(200).json({ success: true });를 받음.
        history("/")
      
      console.log(response.data)
      } else{
        alert("로그아웃 실패")
      }}
    )
  }

  return (
    <div style={{backgroundColor: '#f0f0f0', 
      color: '#333', 
      padding: '20px', 
      borderRadius: '8px', 
      textAlign: 'center', 
      fontSize: '20px',
      display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'}}>
        <h2>시작 페이지</h2>
        <button onClick={onClickHandler}>로그아웃</button>
    </div>
  )
}

export default LandingPage
