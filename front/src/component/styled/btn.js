import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
    /* 공통 스타일 */
    display: inline-block;
    margin: auto;
    outline: none;
    border: none;
    border-radius: 4px;
    color: white;
    font-weight: bold;
    cursor: pointer;
    padding-left: 1rem;
    padding-right: 1rem;
    text-align: center;
    justify-content: center;
    align-items: center;
    font-family: "sub2";

    /* 크기 */
    height: 3rem;
    width: 10rem;
    font-size: 1.2rem;

    /* 색상 */
    background: #daa89b;

    &:disabled {
        opacity: 0.6;
        background: #adb5bd;
        cursor: auto;
    }

    &:hover,
    &:active {
        &:not([disabled]) {
            background: #e2c0b6;
        }
    }

    /* 기타 */
    & + & {
        margin-left: 1rem;
    }
`;

function Button({ children, ...rest }) {
    return <StyledButton {...rest}>{children}</StyledButton>;
}

export default Button;
