/* eslint-disable jsx-a11y/alt-text */
import React, { useRef, useState } from "react";
import { Col } from "antd";
import styled from "styled-components";
import Image from "./Image";

const GridCards = (props) => {
    const onClickhandler = (e) => {
        props.setSelectedMovie(props.id);
        props.setSelectedMovieTitle(props.movieName);
        stop();
    };

    let audioTrack = new Audio(props.track);

    const audioPromiseRef = useRef(Promise.resolve());
    const start = () => {
        audioPromiseRef.current.then(() => audioTrack.play());
        audioTrack.volume = 0.05;
    };
    const stop = () => {
        audioPromiseRef.current.then(() => audioTrack.pause());
    };

    return (
        <Col span={8} lg={8} md={8} xs={props.xs}>
            {/*브라우저의 크기가 가장클때는 24중에 6만쓰겠다는의미 중간은 8 가장작을때는 24를 다쓰겠다는의미*/}

            <HHover onMouseEnter={start} onMouseLeave={stop}>
                <span className="text">
                    <Box onClick={onClickhandler} value={props.id}>
                        <h2>
                            🎶
                            <br /> {props.movieName}
                        </h2>
                    </Box>
                </span>
                <Image
                    alt={props.id} //TODO 이미지 제목 넣어야함
                    src={props.image}
                    circle={props.circle}
                />
            </HHover>
        </Col>
    );
};

export const HHover = styled.div`
    {
        position: relative;
        
        text-align: center;

    }

    .text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10;
        opacity: 0;
        transition: all 0.8s ease;
    }
    .text h2 {
        margin: 0;
        color: white;

    }
    :hover .text {
        opacity: 1;
        cursor:pointer;
    }
    :hover img {
        -webkit-filter: blur(5px);
        transform: scale(1.1);
        transition: transform 0.35s;
        
    }
    &:hover {
    
`;

const Box = styled.div`
    dislplay: block;
    margin: 0 auto;
`;

export default GridCards;
