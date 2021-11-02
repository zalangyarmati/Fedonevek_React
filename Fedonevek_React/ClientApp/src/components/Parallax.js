import styled from "styled-components";
import img from './img/secret.jpg';

export const Parallax = styled.div`
    background-size: cover;
    background-attachment: fixed;
    width: 100vw;
` 

export const CardContainer = styled.div`
    width: 100%;
    background: transparent;
    position: relative;
    height: 650px;
    padding: 128px;
`;

export const CardContent = styled.div`
    padding: 16px;
    background-color: white;
    position: absolute;
    
    width: 700px;
    background-color: black;
    cursor: pointer;
    background: url(${img});
    background-size: cover;
    ${({ alignment }) => alignment === 'right' ? `
        right: 50px;
        transform: rotate(15deg);
    ` : `
        left: 50px;
        transform: rotate(-15deg);
    `}
    &:hover {
        border: 2px solid white;
    }
`;


// background: url(${({ img }) => `img/${img}`});