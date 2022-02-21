import React, {
    Fragment,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import { useRecoilState } from "recoil";
import { genresState, previewTrackState, AudioState } from "../state/atoms";
import Loading from "./Spninner";
import styled from "styled-components";
import axios from "axios";
import Player from "./Player";

import Button from "./styled/btn";

import dot1 from "./icon/dot-1.png";
import Progress from "./styled/dot";

const MovieGenres = ({ onPrev, onNext, step }) => {
    const [loading, setLoading] = useState(true);
    const [previewTrack, setPreviewTrack] = useRecoilState(previewTrackState);
    const [genres, setGenres] = useRecoilState(genresState);
    const [pauseaudio, setPauseaudio] = useRecoilState(AudioState);
    // 미리듣기 음악 불러오기 API
    // genre / track_url / cover_img / track_title
    useEffect(() => {
        async function loadTrack() {
            try {
                let api = "/filter/genre";
                const response = await axios.get(api);
                setPreviewTrack(response.data);
                console.log("get track api");
                setLoading(false);
            } catch (e) {
                console.log("axios get Error");
                setLoading(false); //TODO API 실제로 받아오면 지워야함
            }
        }
        loadTrack();
    }, []);

    useEffect(() => {
        console.log(previewTrack);
    }, []);

    //TODO Sci-Fi : 12, Comedy : 2, Thriller : 3, Romance : 4, Action : 5 이 들어갈것같아요

    const onChangeHandle = (e) => {
        setGenres({
            ...genres,
            genre: Number(e.target.value),
        });
    };

    const onClickHandler = () => {
        setPauseaudio((cur) => !cur);
        onNext();
    };

    useEffect(() => {
        console.log(genres);
    }, [genres]);

    return (
        <>
            {loading ? (
                <Loading color="#CC455C" title="음화당" />
            ) : (
                <>
                    <Progress src={dot1} alt="progress" />

                    <Container>
                        <h1>음악을 듣고 원하는 분위기를 선택해주세요.</h1>
                        <Stations>
                            {previewTrack &&
                                previewTrack.map((mgenre) => (
                                    <Box key={mgenre.genre}>
                                        <div>
                                            <Player
                                                url={mgenre.track_url}
                                                value={mgenre.id}
                                                title={mgenre.track_title}
                                            />
                                        </div>
                                        <Radio>
                                            <input
                                                id={mgenre.genre}
                                                type="radio"
                                                name="color-selector"
                                                value={mgenre.id}
                                                checked={
                                                    genres.genre === mgenre.id
                                                        ? true
                                                        : false
                                                }
                                                onChange={onChangeHandle}
                                            />
                                            <label htmlFor={mgenre.genre}>
                                                <br />
                                                {mgenre.track_title}
                                            </label>
                                        </Radio>
                                    </Box>
                                ))}
                        </Stations>
                        <Button
                            onClick={onClickHandler}
                            disabled={Object.keys(genres).length === 0}
                        >
                            다음
                        </Button>
                    </Container>
                </>
            )}
        </>
    );
};

const Container = styled.div`
    display: flex;
    text-align: center;
    flex-direction: column;
    align-items: center
    position: relative;
    width: 80vw;
    height: 70vh;
    padding: 70px;
    background-color: rgb(255, 255, 255, 0.7);

    color: #663f46;
    h1 {
        font-family: "sub2";
        font-size: 2.1rem;
    }
`;

const Stations = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: flex-start;
`;

const Radio = styled.div`
    color: #ced4da;

    > input {
        color: #304543;
        filter: grayscale(80%);
    }
    > input:checked + label {
        font-size: 20px;
        font-weight: bold;
        color: #daa89b;
    }
`;

const Box = styled.div`
    width: 20%;
    height: 30vh;
    margin: 5px;
    margin-top: 50px;
    text-align: center;
`;

export default MovieGenres;
