import React, { useState } from 'react';
import '../styles/signUp-sm.css';
import Logo from '../components/common/Logo.js';

// 함수 분리
import validCheckHelper from '../pages/SignUp-heper.js';

// 비동기 요청
import axios from "axios";

const SignUp = () => {

  const [ input, setInput ] = useState({
    email : '',
    name: '',
    password: '',
    passwordCheck: ''
  });

  /* 유효성 관련 코드 */
  // 추가 state 정의
  const [ valid, setValid ] = useState({
    email : true,
    name: true,
    password: true,
    passwordCheck: true
  })

  // email 중복 검사
  const [ emailCheck, setEmailCheck ] = useState({
    status : false, // 안했음
    isDuplicated : true // 중복상태로 초기화
  })

  const inputHandler = async (e)=>{

    // 변경 값 저장하고
    await setInput({
      ... input,
      [e.target.name] : e.target.value
    })

    // 유효성 검사
    const validResult = validCheckHelper[e.target.name](
      e.target.value,
      input
      );
    console.log(validResult, e.target.value)
    await setValid({
      ...valid,
      [e.target.name] : validResult
    })

    // 에러 메세지 띄우기 / 없애기
    //! 비밀번호 로직 부족함
    //! 그리고 유효성검사마다 다른 메세지 띄우는거 못함. 
    const $errorSection = document.querySelector(`.error-message.${e.target.name}`);
    const tName = e.target.name;
    if(!validResult){
      $errorSection.style.display = 'block';
      
      if(tName === 'email'){
        $errorSection.textContent = '❌ 이메일 형식에 맞게 써주세요'
      } else if (tName === 'name'){
        $errorSection.textContent = '❌ 2글자 이상, 20글자 이하로 해주세요'
      } else if (tName === 'password'){
        $errorSection.textContent = '❌ (8~20) 문자, 숫자, 특수문자가 각각 하나 이상 기입해주세요';
        const $passwordCheckErrorSection = document.querySelector(`.error-message.passwordCheck`);
        $passwordCheckErrorSection.textContent = '❌ 같은 비밀번호를 써주세요';
        $passwordCheckErrorSection.style.display = 'block';
      } else if (tName === 'passwordCheck'){
        $errorSection.textContent = '❌ 같은 비밀번호를 써주세요'
        const $passwordErrorSection = document.querySelector(`.error-message.password`);
        // $passwordErrorSection.textContent = '❌ (8~20) 문자, 숫자, 특수문자가 각각 하나 이상 기입해주세요';
        // $passwordErrorSection.style.display = 'block'

      }
    } else{
      $errorSection.style.display = 'none';
      if(tName === 'passwordCheck'){
        const $passwordErrorSection = document.querySelector(`.error-message.password`);
        $passwordErrorSection.style.display = 'none'
      } else if(tName === 'password'){
        const $passwordCheckErrorSection = document.querySelector(`.error-message.passwordCheck`);
        $passwordCheckErrorSection.style.display = 'none'
      }
    }

  }
  /* 유효성 관련 코드 */

  // onclick = 이메일 중복 검사 버튼
  const checkEmailDuplicate = async (data) => {
    if(validCheckHelper['email'](input['email'])){
      await setEmailCheck({ status : true });
      
      axios // 나중에 수정 요망
      .post("http://localhost:5000/users/signup/email", {
        email : input['email'],
      })
      .then( async (res) => {
        console.log("정상");
        await setEmailCheck({ isDuplicated : true });
        
          // 체크 완료 메세지
          const $errorSection = document.querySelector(`.ok-message.email`);
          $errorSection.style.display = 'block';
          $errorSection.textContent = "✔️ 사용가능한 이메일입니다";
          // return true;
        })
        .catch( async (err) => {
          console.log("에러");
          const $errorSection = document.querySelector(`.error-message.email`);
          $errorSection.style.display = 'block';
          await setEmailCheck({ isDuplicated : false });
          $errorSection.textContent = "❌ 중복된 이메일입니다";
          // return false;
        });
    } else {
      alert("이메일 형식을 맞춰주세요");
    }
  }

  // onclick = signup 버튼
  const signupHandler = (e)=>{
    console.log(input);
  }


  return (
    <section className="signup-wrapper">
      <Logo/>
      <section className="signup-form">
        <label>이메일</label>
        <input type="email" name="email" onChange={inputHandler} placeholder="Enter email"/>
        <p className="error-message email"/>
        <p className="ok-message email"/>
        <button onClick={checkEmailDuplicate}>이메일 중복 검사</button>
        <label>이름</label>
        <input name="name" onChange={inputHandler} placeholder="Enter name"/>
        <p className="error-message name"/>
        <label>비밀번호</label>
        <input type="password" name="password" onChange={inputHandler} placeholder="Enter password"/>
        <p className="error-message password"/>
        <label>비밀번호 확인</label>
        <input type="password" name="passwordCheck" onChange={inputHandler} placeholder="Enter password"/>
        <p className="error-message passwordCheck"/>

        <button onClick={signupHandler}> Log In </button>
      </section>
    </section>
  )
}

export default SignUp; 