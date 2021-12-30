import axios from "axios";
import React, { useState } from "react";
import style from "./Login.module.css";
import { loginState } from "../state/atoms";
import { useRecoilState } from "recoil";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Login = ({ history }) => {
  const [inputId, setInputId] = useState("");
  const [inputPwd, setInputPwd] = useState("");
  const [login, Setlogin] = useRecoilState(loginState); //false

  const onSubmit = (e) => {
    e.preventDefault();

    console.log("ID : ", inputId);
    console.log("PW : ", inputPwd);

    if (inputId === "" || inputPwd === "") {
      alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }
    let body = {
      email: inputId,
      password: inputPwd,
    };

    axios.post("/users/login", body).then((res) => {
      console.log(res);
      console.log("res.data.userId :: ", res.data.user_id);
      console.log("res.data.result :: ", res.data.result);
      if (res.data.userId === undefined) {
        // id 일치하지 않는 경우 userId = undefined, msg = '입력하신 id 가 일치하지 않습니다.'
        console.log("======================", res.data.info);
        alert("입력하신 id 가 일치하지 않습니다.");
      } else if (res.data.userId === null) {
        // id는 있지만, pw 는 다른 경우 userId = null , msg = undefined
        console.log(
          "======================",
          "입력하신 비밀번호 가 일치하지 않습니다."
        );
        alert("입력하신 비밀번호 가 일치하지 않습니다.");
      } else if (res.data.userId === inputId) {
        // id, pw 모두 일치 userId = userId1, msg = undefined
        console.log("======================", "로그인 성공");
        // sessionStorage.setItem('user_id', inputId)
      }
      Setlogin((cur) => !cur);
      history.push("/");
    });

    setInputId("");
    setInputPwd("");
    console.log(login);
  };
  // res.data = 닉네임
  return (
    <Whole>
      <LoginContainer>
        <div className={style.wrap}>
          <h1> Oh Song, Tasty good</h1>
          <form onSubmit={onSubmit}>
            <div>
              <label htmlFor="input_id"></label>
              <input
                onChange={(e) => {
                  setInputId(e.target.value);
                }}
                type="email"
                name="input_id"
                width="380px"
                height="45px"
                value={inputId}
                placeholder="Email 형식으로 Id를 입력해주세요"
              />
            </div>
            <div>
              <label htmlFor="input_pw"></label>
              <input
                onChange={(e) => {
                  setInputPwd(e.target.value);
                }}
                type="password"
                name="input_pw"
                width="380px"
                height="45px"
                value={inputPwd}
                placeholder="비밀번호를 입력해주세요"
              />
              <br></br>
              <Btn disabled={!inputId || !inputPwd}> 로 그 인 </Btn>
              <Link to="/regist">회원가입</Link>
            </div>
          </form>
        </div>
      </LoginContainer>
    </Whole>
  );
};

const Whole = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-image: url(null);
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  position: relative;
  width: 440px;
  padding: 70px;
  background-color: white;
`;

const Btn = styled.button`
  width: 300px;
  height: 50px;
  margin-top: 10px;
  margin-bottom: ${(props) => props.marginBottom};
  border-radius: 5px;
  color: ${(props) => props.textColor};
  background-color: ${(props) => props.backColor};
  font-size: large;
  padding: ${(props) => props.padding};
  :focus {
    cursor: pointer;
  }
`;

export default Login;
