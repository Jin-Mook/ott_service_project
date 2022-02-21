import React, { useEffect, useState } from "react";
import axios from "axios";
import GridCards from "./GridCards";
import Loading from "./Spninner";
import { Row } from "antd";

import StyleContainer from "./styled/container";
import Button from "./styled/btn";
import styled from "styled-components";

//영화,음악 장르를 보내주고 그 기반으로 된 영화를 가져오는 페이지
import { useRecoilState, useRecoilValue } from "recoil";
import { genresState, resultMovieState } from "../state/atoms";
import { useHistory } from "react-router-dom";

import dot3 from "./icon/dot-3.png";
import Progress from "./styled/dot";

const FilterMovie = ({ onPrev, onNext }) => {
    const history = useHistory();
    const [genres, setGenres] = useRecoilState(genresState);
    const [movieData, setMovieData] = useRecoilState(resultMovieState);
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(0);
    const [selectedMovieTitle, setSelectedMovieTitle] = useState(0);

    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    } // api 로 받아온 영화 섞은 함수

    let api = `http://localhost:8000/filter/movies`;

    useEffect(() => {
        async function loadData() {
            setGenres({ ...genres });
            try {
                const response = await axios.post(api, genres);
                console.log(response);
                setMovies(response.data);
                console.log("API 가져온 data", movies);
                setLoading(false);
            } catch (e) {
                console.log("axios get Error");
            }
        }
        loadData();
    }, []);
    console.log("movies: ", movies);

    useEffect(() => {
        shuffle(movies);
    }, [movies]);

    const firstMovies = movies.slice(0, 6);
    console.log("6개 슬라이싱 data", firstMovies);

    useEffect(() => {
        console.log("선택된 영화id", selectedMovie);
    }, [selectedMovie]);

    const onClickHandler = async () => {
        // 최종 결과 영화정보 받아오기
        const res = await axios
            .get(`http://localhost:8000/filter/recommend/${selectedMovie}`)
            .then((res) => setMovieData(res.data))
            .catch((e) => console.log(e))
            .then(() => onNext());
    };

    return (
        <div>
            {loading ? (
                <Loading color="#CC455C" title="음악 분석 중" />
            ) : (
                <>
                    <div style={{ textAlign: "center" }}>
                        <Progress src={dot3} alt="progress" />
                    </div>
                    <StyleContainer>
                        <h1>당신의 취향에 맞는 음악을 가져왔어요.</h1>
                        <GridBox>
                            <Row gutter={[60, 30]}>
                                {/*gutter는 Col간의 위 아래여백을 줄때 사용 */}
                                {movies &&
                                    firstMovies.map((movie, index) => (
                                        <React.Fragment key={index}>
                                            <GridCards
                                                image={movie.poster_url}
                                                movieName={movie.movie_title}
                                                url={movie.url}
                                                id={movie.movie_id}
                                                setSelectedMovie={
                                                    setSelectedMovie
                                                }
                                                setSelectedMovieTitle={
                                                    setSelectedMovieTitle
                                                }
                                                track={movie.preview_url}
                                                xs={Number(12)}
                                                circle="true"
                                            />
                                        </React.Fragment>
                                    ))}
                            </Row>
                        </GridBox>
                        {selectedMovieTitle === 0 ? (
                            <div></div>
                        ) : (
                            <h2 style={{ marginBottom: "19px" }}>
                                {selectedMovieTitle} OST를 선택 하셨어요.
                            </h2>
                        )}
                        <div style={{ marginBottom: "5px" }}>
                            <Button onClick={onPrev}>뒤로가기</Button>
                            <Button
                                disabled={!selectedMovie}
                                onClick={onClickHandler}
                            >
                                선택완료
                            </Button>
                        </div>
                    </StyleContainer>
                </>
            )}
        </div>
    );
};

const GridBox = styled.div`
    width: 50%;
    display: flex;
    margin-bottom: 30px;
    margin-top: 30px;
`;

export default FilterMovie;
