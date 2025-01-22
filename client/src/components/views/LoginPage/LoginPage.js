import { Axios } from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { LoginUser } from '../../../_action/user_actions'
import { useNavigate } from 'react-router-dom'

function LoginPage() {

  const dispatch = useDispatch();
  const history = useNavigate();

  const [Email, setEmail] = useState("")
  const [password, setpassword] = useState("")

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }
  const onPassHandler = (event) =>{
    setpassword(event.currentTarget.value)
  }
  const onSubmitHandler = async (event) =>{
    event.preventDefault();

    let body ={
      email: Email,
      password: password
    }

    try {
      const response = await dispatch(LoginUser(body));
      if (response.payload.loginSuccess) { 
        // server index.js의 res.cookie("test_cookie", token).status(200).json({loginSuccess:true,userId: user._id})를 받음.
        alert("로그인 성공!");
        history("/")
      } else {
        alert("로그인 실패: " + response.payload.message);
      }
    } catch (error) {
      console.error(error);
      alert("로그인 중 에러가 발생했습니다."); }

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
      
      <form style={{display:"flex", flexDirection:"column"}} onSubmit={onSubmitHandler}>
        <label>
          Email <input type='email' value={Email} onChange={onEmailHandler} />
        </label>
        <label>
          password <input type='password' value={password} onChange={onPassHandler} />
        </label>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default LoginPage