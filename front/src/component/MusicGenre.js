import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useRecoilState } from "recoil";
import { genreState } from "../state/atoms";
import { Link } from "react-router-dom";

const MusicGenre = ({ onPrev, onNext }) => {
  const [genre, setGenre] = useRecoilState(genreState);
  const [input, setInput] = useState();

  function valuetext(value) {
    return `${value}도`;
  }

  const MusicSet = [
    "acousticness",
    "danceability",
    "energy",
    "tempo",
    "valence",
  ];

  const onChangeHandle = (e) => {
    const { value, name } = e.target;

    setInput((cur) => {
      let newInput = { ...cur };
      newInput[name] = value;
      return newInput;
    });
  };

  const onClickHandler = (e) => {
    setGenre({
      ...genre,
      music_genre: input,
    });
  };

  console.log(input);
  useEffect(() => {
    console.log("user 입력 데이터   ", genre);
  }, [genre]);

  const handleNext = () => {
    request().then(() => onNext());
  };

  return (
    <div>
      <h1>🎧음악장르 선택입니다</h1>
      <Box sx={{ width: 300 }}>
        {MusicSet.map((mg, index) => (
          <div key={index}>
            <label htmlFor="mg">{mg}</label>
            <Slider
              aria-label="Temperature"
              defaultValue={30}
              getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              step={10}
              marks
              min={0}
              max={100}
              onChange={onChangeHandle}
              name={mg}
            />
          </div>
        ))}
      </Box>
      <button onClick={handleNext}>다음</button>
    </div>
  );
};

export default MusicGenre;
