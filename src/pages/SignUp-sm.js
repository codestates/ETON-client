import React, { useState } from 'react';
import '../styles/signUp-sm.css';
import Logo from '../components/common/Logo.js'
const SignUp = () => {

  const [ input, setInput ] = useState({
    email : '',
    name: '',
    password: '',
    passwordCheck: ''
  });

  const inputHandler = (e)=>{
    setInput({
      ... input,
      [e.target.type] : e.target.value
    })
  }

  const signupHandler = (e)=>{
    console.log(input);
  }

  return (
    <section className="signup-wrapper">
      <Logo/>
      선미 Sign Out
      <section className="signup-form">
        <label>이메일</label>
        <input type="email" onChange={inputHandler} placeholder="Enter email"/>
        <label>이름</label>
        <input type="name" onChange={inputHandler} placeholder="Enter name"/>
        <label>비밀번호</label>
        <input type="password" onChange={inputHandler} placeholder="Enter password"/>
        <label>비밀번호 확인</label>
        <input type="passwordCheck" onChange={inputHandler} placeholder="Enter password"/>
        <button onClick={signupHandler}> Log In </button>
        <p>or</p>
        <button>Continue with github 🤖</button>
        <a href="/users/signup">Sign up for an account</a>
      </section>
    </section>
  )
}

export default SignUp; 