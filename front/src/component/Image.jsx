import React, { useEffect, useRef } from "react";
import styled from "styled-components";

function retryImage(imageSrc, retry, alt) {
    return new Promise((resolve, reject) => {
        function helper(src, remain, alt) {
            const imageTag = document.createElement("img");
            imageTag.src = src;
            imageTag.alt = alt;
            // imageTag.style = "width: 100%; height: 320px;";
            imageTag.onload = () => {
                console.log("성공");
                resolve(imageTag);
            };

            imageTag.onerror = () => {
                console.log("실패");
                if (remain === 0) return reject();
                helper(src, remain - 1);
            };
        }

        helper(imageSrc, retry, alt);
    });
}

function Image({ src, alt, circle }) {
    const containerRef = useRef();
    useEffect(() => {
        if (!containerRef.current) return;

        retryImage(src, 5, alt)
            .then((imageTag) => {
                containerRef.current.appendChild(imageTag);
            })
            .catch(() => {
                console.log("이미지 로드가 최종적으로 실패했습니다.");
            });
    }, []);

    return (
        <Container
            ref={containerRef}
            style={{ display: "inline-block" }}
            circle={circle}
        />
    );
}

const Container = styled.div`
    display: block;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
    img {
        display: ${(props) => (props.circle ? "block" : null)};
        width: ${(props) => (props.circle ? "10em" : "100%")};
        height: ${(props) => (props.circle ? "10em" : "320px")};
        border-radius: ${(props) => (props.circle ? "50%" : "10px")};
        border: ${(props) =>
            props.circle ? "1px solid rgb(76, 62, 95)" : null};
        margin: ${(props) => (props.circle ? "0 0.25em;" : null)};
        box-shadow: 0 0 50px #ccc;
    }
`;

export default Image;
