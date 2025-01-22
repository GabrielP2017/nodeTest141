import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../../_action/user_actions'
import { useNavigate } from 'react-router-dom';


function RegisterPage(props) {

  const dispatch = useDispatch();
  const history = useNavigate();

  const [Email, setEmail] = useState("")
  const [password, setpassword] = useState("")
  const [name, setname] = useState("")
  const [Confirmpassword, setCpassword] = useState("")

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }
  const onPassHandler = (event) =>{
    setpassword(event.currentTarget.value)
  }

  const onnameHandler = (event) =>{
    setname(event.currentTarget.value)
  }

  const onCPassHandler = (event) =>{
    setCpassword(event.currentTarget.value)
  }


  const onSubmitHandler = (event) =>{
    event.preventDefault();

    if(password !== Confirmpassword){
      return alert("비밀번호가 서로 다릅니다!")
    }

    let body ={
      email: Email,
      password: password
      ,name: name
    }

    dispatch(registerUser(body)).then(response =>{
    if (response.payload.success) { // server index.js의 res.status(200).json({ success: true });를 받음.
        alert("회원 가입 성공!");
        history("/login")
      } else {
        alert("회원 가입 실패: " + response.payload.message);
        }
    })

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
        <label>
          name <input type='text' value={name} onChange={onnameHandler} />
        </label>
        <label>
          Confirm password <input type='password' value={Confirmpassword} onChange={onCPassHandler} />
        </label>

        <button type='submit'>회원 가입</button>
      </form>
    </div>
  )
}

export default RegisterPage
