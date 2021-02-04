const scriptCheck = /<(|\/|[^\/>][^>]+|\/[^>][^>]+)>/;

export default { // function returns boolean type.
  email : (target)=>{
    const emailCheck = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

    return lengthInvalidCheck(target.length, 5, 20) 
            && !regCheck(target, scriptCheck)
            && regCheck(target, emailCheck)
  },
  name: (target)=>{
    return lengthInvalidCheck(target.length, 2, 20)
            && !regCheck(target, scriptCheck)
  },
  password: (target, input)=>{ 
    const passRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/; //8글자이상, 하나이상의 숫자, 하나이상의 문자, 하나이상의 특수문자 들어갔는지
    return lengthInvalidCheck(target.length, 8, 20)
            && regCheck(target, passRegex)
            // && (target === input.passwordCheck)
  },
  passwordCheck: (target, input)=>{
    return (target === input.password)
          && lengthInvalidCheck(target.length, 8, 20)
  }

  // flag 나중에 살펴보기
  // submit 누르면 모두 체크하기
  // 각 검사 유형마다 다른 결과를 나타내군 (SignUp.js 446번째 줄부터) 

}

const lengthInvalidCheck = (target, min, max) => {
  if (target < min || target > max) {
    return false;
  }
  return true;
};

const regCheck = (target, reg) => {
  if (reg.test(target)) {
    return true;
  } else {
    return false;
  }
};