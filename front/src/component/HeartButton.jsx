import React, { useState, useEffect } from "react";
import styled from "styled-components";
import EmptyHeartImg from "./icon/heart.png";
import HeartImg from "./icon/heart1.png";
import axios from "axios";

const Heart = styled.img`
    width: 2.5em;
    height: 2.5em;
`;

const HeartButton = ({ like, onClick, setLike, id }) => {
    const toggleLike = async (e) => {
        // let body = {
        //     movie_id: id,
        //     liked: 1,
        // };
        // console.log(body);
        // const res = await axios.post("/result/mypage", body); // [POST] 사용자가 좋아요를 누름 -> DB 갱신
        setLike((cur) => !cur);
    };

    return (
        <div>
            <Heart
                src={like ? HeartImg : EmptyHeartImg}
                onClick={onClick}
                name="like"
            />
            <label htmlFor="like"></label>
        </div>
    );
};
export default HeartButton;
