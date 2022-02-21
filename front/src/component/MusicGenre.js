import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useRecoilState } from "recoil";
import { genresState } from "../state/atoms";
import StyleContainer from "./styled/container";
import Button from "./styled/btn";
import styled from "styled-components";

import dot2 from "./icon/dot-2.png";
import Progress from "./styled/dot";

const MusicGenres = ({ onPrev, onNext }) => {
    const [genres, setGenres] = useRecoilState(genresState);

    const [input, setInput] = useState(0);

    function valuetext(value) {
        return `${value}`;
    }

    console.log(input);

    const MusicSet1 = [
        {
            title: "오늘 기분이 어때요?", //부정 긍정
            name: "valence",
            marks: [
                { value: 0, label: "슬퍼요" },
                {
                    value: 100,
                    label: "행복해요",
                },
            ],
        },
        {
            title: "신나는 음악 좋아하세요?",
            name: "energy",
            marks: [
                { value: 0, label: "아니요" },
                {
                    value: 100,
                    label: "좋아요",
                },
            ],
        },
        {
            title: "춤 추는건 어때요?",
            name: "danceability",
            marks: [
                { value: 0, label: "듣는게 좋아요" },
                {
                    value: 100,
                    label: "지금 당장",
                },
            ],
        },
        {
            title: "템포는 어떻게 할까요?",
            name: "tempo",
            marks: [
                { value: 0, label: "느리게" },
                {
                    value: 100,
                    label: "빠르게",
                },
            ],
        },
    ];

    const onChangeHandle = (e) => {
        const { value, name } = e.target;

        setInput((cur) => {
            let newInput = { ...cur };
            newInput[name] = value;
            return newInput;
        });
    };

    useEffect(() => {
        setGenres({
            ...genres,
            music_features: input,
        });
    }, [input]);

    console.log(genres);
    return (
        <>
            <div style={{ textAlign: "center" }}>
                <Progress src={dot2} alt="progress" />
            </div>
            <StyleContainer>
                <h1>당신의 기분을 알려주세요</h1>
                <Slidebox>
                    {MusicSet1.map((mg, index) => (
                        <Box key={index}>
                            <label htmlFor="mg">{mg.title}</label>
                            <PrettoSlider
                                aria-label="equalizer"
                                defaultValue={50}
                                getAriaValueText={valuetext}
                                valueLabelDisplay="auto"
                                step={10}
                                marks={mg.marks}
                                min={0}
                                max={100}
                                onChange={onChangeHandle}
                                name={mg.name}
                            />
                        </Box>
                    ))}
                </Slidebox>
                <BtnBox>
                    <Button onClick={onPrev}>이전</Button>
                    <Button
                        disabled={!input || Object.keys(input).length < 4}
                        onClick={onNext}
                    >
                        다음
                    </Button>
                </BtnBox>
            </StyleContainer>
        </>
    );
};

const Slidebox = styled.div`
    align-items: center;
    width: 400px;
    font-family: "sub1";
    margin: 30px 0;
    font-size: 1rem;
`;

const BtnBox = styled.div`
    margin: 10px;
`;

const PrettoSlider = styled(Slider)({
    "& .MuiSlider-root": {
        color: "black",
    },

    "& .MuiSlider-rail": {
        color: "#304543",
    },
    "& .MuiSlider-markLabel": {
        fontFamily: "sub1",
    },

    "& .MuiSlider-track": {
        border: "none",
        color: "#89B0AE",
    },
    "& .MuiSlider-thumb": {
        height: 24,
        width: 24,
        backgroundColor: "#fff",
        border: "2px solid #304543",
        "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
            boxShadow: "inherit",
        },
        "&:before": {
            display: "none",
        },
    },
});

export default MusicGenres;
