import React from "react";
import { useRecoilState } from "recoil";
import { genreState } from "../state/atoms";
import { AudioPlayerProvider } from "react-use-audio-player";
import MusicPlay from "./MusicPlay";
import Always from "../routers/Always.mp3";

const MovieGenre = ({ setChangeGenre }) => {
    const Colors = [
        { name: "RED", hex: "#ffb598" },
        { name: "ORANGE", hex: "#ffdcaa" },
        { name: "PURPLE", hex: "#d7beff" },
        { name: "CYAN", hex: "#c7f5ed" },
        { name: "BLUE", hex: "#c2dbff" },
    ];
    const [genre, setGenre] = useRecoilState(genreState);

    const onChangeHandle = (e) => {
        setGenre({
            ...genre,
            genre: e.target.value,
        });
    };

    console.log(genre);

    return (
        <div>
            <h1>🎞영화장르 선택입니다.</h1>
            <AudioPlayerProvider>
                <MusicPlay file={Always} api={null} />
            </AudioPlayerProvider>
            {Colors.map((color) => (
                <div key={color.name}>
                    <input
                        id={color.name}
                        type="radio"
                        name="color-selector"
                        value={color.name}
                        checked={genre.genre === color.name ? true : false}
                        onChange={onChangeHandle}
                    />
                    <label htmlFor={color.name}>{color.name}</label>
                </div>
            ))}
            <button
                onClick={() => {
                    setChangeGenre(false);
                }}
            >
                음악장르 선택으로
            </button>
        </div>
    );
};

export default MovieGenre;
