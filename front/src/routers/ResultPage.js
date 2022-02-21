/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import RadarChart from "../component/chart/RadarChart";
import PageLayout from "../component/PageLayout";
import { useRecoilState, useRecoilValue } from "recoil";
import { resultMovieState } from "../state/atoms";
import { Row } from "antd";
import GridCards from "../component/GridCards";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import HeartButton from "../component/HeartButton";
// import D3plot from "../component/chart/D3plot";
// import Audios from "../component/MusicPlay";
import StyleContainer from "../component/styled/container";
import HoverImg from "../component/hover";

import Button from "../component/styled/btn";

const ResultPage = () => {
    const movieData = useRecoilValue(resultMovieState);
    const [like, setLike] = useState(false);

    console.log("금방받아온", movieData);

    const final = movieData[0];
    console.log("1개 슬라이싱 data", final);
    console.log("like", final.like_count);

    const selected_features = movieData[4].selected_features;
    console.log(selected_features);

    const secondMovies = movieData.slice(1, 4);
    console.log("3개 슬라이싱 data", secondMovies);

    const ott_list = Object.entries(final.ott).reduce((acc, cur) => {
        if (cur[1]) acc.push(cur[0]);
        return acc;
    }, []);

    console.log(ott_list);

    const resultmovieid = final.movie_id;

    const toggleLike = async (e) => {
        if (like === false) {
            let body = {
                movie_id: resultmovieid,
                liked: 1,
            };
            const res = await axios.post("/result/mypage", body);
            setLike((cur) => !cur); // [POST] 사용자가 좋아요를 누름 -> DB 갱신
        } else {
            let body = {
                movie_id: resultmovieid,
                liked: 0,
            };
            const res = await axios.post("/result/mypage", body);
            setLike((cur) => !cur);
        }
    };
    let codes = final.movie_plot;

    // const contentRef = useRef(null);
    // const [isShowReadMore, setIsShowReadMore] = useState(false);
    // const observeCallback = (entries) => {
    //     for (let entry of entries) {
    //         if (entry.target.scrollHeight > entry.contentRect.height) {
    //             setIsShowReadMore(true);
    //         } else {
    //             setIsShowReadMore(false);
    //         }
    //     }
    // };
    // useResizeObserver({ callback: observeCallback, element: contentRef });
    // const onClick = (e) => {
    //     contentRef.current.classList.add("show");
    //     setIsShowReadMore(false);
    // };
    // console.log(isShowReadMore);

    const [limit, setLimit] = useState(50);
    const toggleEllipsis = (str, limit) => {
        return {
            string: str.slice(0, limit),
            isShowMore: 200 > limit,
        };
    };

    const onClickMore = (str) => () => {
        setLimit(200);
    };

    return (
        <PageLayout long="true">
            <Container>
                <h1>음악을 좋아하는 당신께, 이 영화를 드려요.</h1>
                <h1>
                    {" "}
                    <b>&#60; {final.track_name} OST &#62;</b>
                </h1>
                <div style={{ display: "flex", marginBottom: "40px" }}>
                    <div style={{ display: "flex" }}>
                        <HoverImg
                            image={final.poster_url}
                            movieName={final.movie_title}
                            url={final.url}
                            id={final.movie_id}
                            track={final.preview_url}
                        />
                    </div>
                    <Divider />
                    <div>
                        <RadarChart
                            feat={final.features}
                            name={final.movie_title}
                            beforefeat={selected_features}
                        />
                    </div>
                </div>
                <h1>&#60; {final.movie_title} &#62;</h1>
                <ContentBox>
                    <div style={{ width: "450px", flexBasis: "50%" }}>
                        <h2>&#47; 영화정보 &#47;</h2>
                        <Table>
                            <tr style={{ padding: "10px" }}>
                                <td>OTT정보</td>
                                <td>
                                    {ott_list.map((item, index) => {
                                        if (index === ott_list.length - 1) {
                                            return (
                                                <span
                                                    key={index}
                                                    style={{
                                                        marginRight: "5px",
                                                    }}
                                                >
                                                    {item}
                                                </span>
                                            );
                                        } else {
                                            return (
                                                <span
                                                    key={index}
                                                    style={{
                                                        marginRight: "5px",
                                                    }}
                                                >
                                                    {item},
                                                </span>
                                            );
                                        }
                                    })}
                                </td>
                            </tr>
                            <tr>
                                <td>영화감독</td>
                                <td>{final.movie_director}</td>
                            </tr>
                            <tr>
                                <td>음악감독</td>
                                <td>{final.sound_director}</td>
                            </tr>
                        </Table>
                        <div
                            style={{
                                display: "flex",
                                textAlign: "center",
                                justifyContent: "center",
                            }}
                        >
                            <HeartButton
                                like={like}
                                id={resultmovieid}
                                onClick={toggleLike}
                            />{" "}
                            <LikeBox>
                                {final.like_count === 0
                                    ? final.like_count
                                    : final.like_count + 1}
                            </LikeBox>
                        </div>
                    </div>

                    {codes !== "0" ? (
                        <div
                            style={{
                                width: "450px",
                                textAlign: "center",
                                margin: "auto",
                            }}
                        >
                            <h2>&#47; 줄거리 &#47;</h2>
                            <div>
                                <div
                                    style={{
                                        padding: "10px",
                                        fontSize: "17px",
                                        fontFamily: "sans-serif",
                                    }}
                                >
                                    {toggleEllipsis(codes, limit).string}
                                    {toggleEllipsis(codes, limit).isShowMore ? (
                                        <Morebtn
                                            cursor="pointer"
                                            onClick={onClickMore(codes)}
                                        >
                                            ...더보기
                                        </Morebtn>
                                    ) : (
                                        <Morebtn>...생략</Morebtn>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : null}
                </ContentBox>

                <ContentBox2 color="blue" wrap="wrap">
                    <div>
                        <h2>혹시 몰라 비슷한 영화도 추천해드려요</h2>
                        <br />
                    </div>
                    <div style={{ width: "80%", margin: "0 auto" }}>
                        <Rowresult gutter={[16, 16]}>
                            {movieData &&
                                secondMovies.map((movie, index) => (
                                    <React.Fragment key={index}>
                                        <GridCards
                                            image={movie.poster_url}
                                            movieName={movie.movie_title}
                                            url={movie.url}
                                            id={movie.movie_id}
                                            track={movie.preview_url}
                                            xs={8}
                                            border="ture"
                                        />
                                        {/* <HeartButton
                                            like={like}
                                            setLike={setLike}
                                            id={movie.movie_id}
                                        /> */}
                                    </React.Fragment>
                                ))}
                        </Rowresult>
                    </div>
                </ContentBox2>
                <div>
                    <Button color="white">
                        <a style={{ color: "white" }} href="/">
                            홈으로
                        </a>
                    </Button>
                    <Button style={{ color: "white" }}>
                        <Link to="/main" style={{ color: "white" }}>
                            더보기
                        </Link>
                    </Button>
                </div>
            </Container>
        </PageLayout>
    );
};

const LikeBox = styled.div`
    width: 2.5em;
    height: 2.5em;
    justify-content: center;
    text-align: center;
    font-size: 30px;
    font-family: sans-serif;
`;

const Rowresult = styled(Row)({
    "& .ant-row": {
        width: "80%",
    },
});

const Table = styled.table`
    border-top: 2px solid;
    border-bottom: 2px solid;
    border-color: #89b0ae;
    padding: 10px;
    width: 320px;
    margin: 20px auto;

    td {
        padding: 5px;
        font-family: "sans-serif";
    }
`;

const Morebtn = styled.span`
    color: gray;
    font-size: 15px;
    padding-left: 6px;
    cursor: ${(props) => props.cursor};
`;

const Divider = styled.div`
    border: 1px solid #89b0ae;
    width: 0.1px;
    margin: 0 100px;
    height: 340px;
`;

const ContentBox = styled.div`
    display: flex;
    justify-content: center;
    font-size: 1.2rem;
    flex-wrap: ${(props) => props.wrap};
    background: ${(props) => props.color};
`;

const ContentBox2 = styled.div`
    display: block;
    justify-content: center;
    font-size: 1.2rem;
    flex-wrap: ${(props) => props.wrap};
    border: solid 3px;
    border-radius: 5px;
    border-color: #daa89b;
    width: 93%;
    margin-top: 50px;
    margin-bottom: 30px;
    padding: 20px 0;
    background: #f9f2f0;
`;

const Container = styled.div`
    display: flex;
    text-align: center;
    flex-direction: column;
    align-items: center;
    position: absolute;
    width: 80vw;
    padding: 1.8vh 0;
    top: 15%;

    background-color: rgb(255, 255, 255, 0.7);

    color: #663f46;
    h1 {
        font-family: "sub2";
        font-size: 2.1rem;
    }
    h2 {
        font-family: "sub1";
        font-size: 1.5rem;
    }
`;

export default ResultPage;
