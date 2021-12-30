import React, { useState } from "react";
import axios from "axios";
import style from "./Regist.module.css";

const Regist = ({ history }) => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Password2, setPassword2] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [Name, setName] = useState("");
  const check = Name.length >= 2 && Email.includes("@") && Password.length > 5;

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onPassword2Handler = (event) => {
    //비밀번호를 입력할때마다 password 를 검증하는 함수
    setPasswordError(event.target.value !== Password);
    setPassword2(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    console.log("Email", Email);
    console.log("Password", Password);

    let ott = [];
    const inputs = document.querySelectorAll(".ott");
    console.log(inputs);
    const inputs_array = Array.prototype.slice.call(inputs);

    inputs_array.forEach((el) => {
      if (el.checked === true) {
        ott.push(el.value);
      }
      console.log(el.checked);
      console.log(el.value);
    });

    let body = {
      email: Email,
      password: Password,
      password2: Password2,
      userName: Name,
      ott: ott,
    };

    console.log("바디정보", body);
    axios.post("/users/signup", body).then((res) => {
      console.log(res);
      console.log("res.data.userId :: ", res.data.user_id);
      console.log("res.data.result :: ", res.data.result);
      if (res.info === "ok") {
        alert(`안녕하세요,${Name}님 반가워요`);
      }
    });
  };

  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <br />

        <div className={style.signup}>
          <h1>회원가입을 해봅시다.</h1>
          <label>Email</label>
          <input type="email" value={Email} onChange={onEmailHandler} />
          <label>Name</label>
          <input type="text" value={Name} onChange={onNameHandler} />
          <label>Password</label>
          <input
            type="password"
            value={Password}
            onChange={onPasswordHandler}
          />
          <label htmlFor="user-password-check">Confirm Password</label>
          <input
            name="user-password-check"
            type="password"
            required
            value={Password2}
            onChange={onPassword2Handler}
          />
          {passwordError && (
            <div style={{ color: "red" }}>비밀번호가 일치하지 않습니다.</div>
          )}
          <h3>어떤 서비스를 이용하고 계신가요?</h3>
          <div className={style.checkbox}>
            <br />
            <label htmlFor="Netflix">
              넷플릭스
              <input
                id="Netflix"
                value="Netflix"
                type="checkbox"
                name="ott"
                className="ott"
              />
            </label>
            <label htmlFor="disney">
              디즈니+
              <input
                id="disney"
                value="disney"
                type="checkbox"
                name="ott"
                className="ott"
              />
            </label>
            <label>
              훌루
              <input
                id="hulu"
                value="hulu"
                type="checkbox"
                name="ott"
                className="ott"
              />
            </label>
            <label>
              아마존프라임
              <input
                id="prime"
                value="prime"
                type="checkbox"
                name="ott"
                className="ott"
              />
            </label>
          </div>
        </div>

        <br />
        <button className={style.btn2} type="submit" disabled={!check}>
          회원 가입
        </button>
      </form>
    </div>
  );
};

export default Regist;
