import React from "react";
import styled from "styled-components";

const StyleContainer = styled.div`
    display: flex;
    text-align: center;
    flex-direction: column;
    align-items: center;
    position: relative;
    width: 80vw;
    padding: 1.8vh 0;

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
    h3 {
        font-family: "sans-serif";
    }
`;

function Container({ children, ...rest }) {
    return <StyleContainer {...rest}>{children}</StyleContainer>;
}

//    height: 75vh;
//padding: 70px;

export default StyleContainer;
