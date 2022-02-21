import React from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import navLogo from "./icon/nav-logo.png";

export default function PageLayout({ long, title, sub, children }) {
    const history = useHistory();

    console.log("long은", long);

    document.title = "음화당";
    return (
        <Navbar>
            <div>
                <Navimg
                    src={navLogo}
                    alt="로고"
                    onClick={() => {
                        history.push("/");
                    }}
                ></Navimg>
            </div>
            <Whole long={long}>{children}</Whole>
        </Navbar>
    );
}

const Navimg = styled.img`
    display: block;
    margin: 0 auto;
    padding: 10px;
    width: 150px;
    height: 50%;
    cursor: pointer;
`;

const Navbar = styled.div`
    background-color: #304543;
`;

const Whole = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: ${(props) => (props.long ? "210vh" : "92.6vh")};
    color: white;
    background-color: #f3e7d6;
    background-size: cover;
`;
