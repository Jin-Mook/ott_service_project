/* eslint-disable jsx-a11y/iframe-has-title */
import React from "react";
import { genresState } from "../state/atoms";
import { useResetRecoilState } from "recoil";
import PageLayout from "../component/PageLayout";
import styled from "styled-components";
import VideoPlayer from "react-background-video-player";
import mainVideo from "../component/icon/main_video.mp4";
import mainlogo from "../component/icon/main_logo.png";

const Home = ({ history }) => {
    const resetGenre = useResetRecoilState(genresState);

    const onClick = () => {
        resetGenre();

        history.push("/service");
    };
    document.title = "음화당";
    return (
        <div>
            <VideoPlayer
                className="video"
                src={mainVideo}
                autoPlay={true}
                muted={true}
            />
            <Whole>
                <LoginContainer>
                    <Mainimg src={mainlogo} alt="mainlogo" />

                    <p>
                        음악을 좋아하는 당신께, 이 영화를 드려요.
                        <br /> 문득 길을 걷다 OST를 듣고 영화가 떠오른 기억이
                        있으신가요?
                    </p>

                    <Btn onClick={onClick} textColor="white">
                        음악추천받기
                    </Btn>
                    <p>(이어폰을 착용해주세요)</p>
                </LoginContainer>
            </Whole>
        </div>
    );
};

const Mainimg = styled.img`
    display: block;
    width: 70%;
    height: 70%;
    text-align: center;
    align-items: center;
    position: relative;
    margin: 0 auto;
    margin-bottom: 20px;
`;

const Whole = styled.div`
    display: flex;
    justify-content: right;
    align-items: center;
    width: 100vw;
    height: 100vh;
    color: white;
`;

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    position: relative;
    width: 440px;
    padding: 70px;
    h1 {
        color: white;
        font-size: 65px;
        font-family: "titlefont";
    }
    p {
        font-family: "sub2";
        font-size: 17px;
    }
`;

const Btn = styled.button`
    display: block;
    margin: auto;

    width: 170px;
    height: 40px;
    margin-top: 10px;
    border: 0px;
    margin-bottom: 5px;
    border-radius: 5px;
    color: ${(props) => props.textColor};
    background-color: #304543;
    font-size: large;
    font-family: "sub1";
    padding: ${(props) => props.padding};

    :hover {
        cursor: pointer;
        background-color: #89b0ae;
    }
`;

export default Home;
