import React, { useState, useEffect } from "react";
import playbtn from "./icon/sound-waves.png";
import pausebtn from "./icon/sound-waves_1.png";
import styled from "styled-components";
import { toggleButtonClasses } from "@mui/material";
import { AudioState, genresState, previewTrackState } from "../state/atoms";
import { useRecoilState } from "recoil";

const useAudio = (url) => {
    const [audio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);
    const [pauseaudio, setPauseaudio] = useRecoilState(AudioState);

    const toggle = () => setPlaying(!playing);

    useEffect(() => {
        playing ? playAudio() : audio.pause();
    }, [playing]);

    useEffect(() => {
        pauseaudio ? audio.pause() : audio.pause();
    }, [pauseaudio]);

    console.log(pauseaudio);

    function playAudio() {
        audio.volume = 0.03;
        audio.play();
    }

    useEffect(() => {
        audio.addEventListener("ended", () => setPlaying(false));
        return () => {
            audio.removeEventListener("ended", () => setPlaying(false));
        };
    }, []);

    return [playing, toggle];
};

const Player = ({ url, title, value }) => {
    const [playing, toggle] = useAudio(url);

    return (
        <div>
            <div onClick={toggle}>
                {playing ? (
                    <div>
                        <WaveImg src={pausebtn} alt="pause" />
                    </div>
                ) : (
                    <>
                        <WaveImg src={playbtn} alt="play" name="hoho" />
                    </>
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
