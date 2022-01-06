import React, { useState, useEffect } from "react";
import playbtn from "./icon/sound-waves.png";
import pausebtn from "./icon/sound-waves_1.png";
import styled from "styled-components";

const useAudio = (url) => {
    const [audio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);

    const toggle = () => setPlaying(!playing);

    useEffect(() => {
        playing ? audio.play() : audio.pause();
    }, [playing]);

    useEffect(() => {
        audio.addEventListener("ended", () => setPlaying(false));
        return () => {
            audio.removeEventListener("ended", () => setPlaying(false));
        };
    }, []);

    return [playing, toggle];
};

const Player = ({ url }) => {
    const [playing, toggle] = useAudio(url);

    return (
        <div>
            <div onClick={toggle}>
                {playing ? (
                    <div>
                        <WaveImg src={pausebtn} alt="pause" />
                    </div>
                ) : (
                    <WaveImg src={playbtn} alt="play" />
                )}
            </div>
        </div>
    );
};

const WaveImg = styled.img`
    display: block;
    margin: 0 auto;
    width: 7em;
    height: 7em;
    text-align: center;
    align-items: center;
    cursor: pointer;
`;

export default Player;
