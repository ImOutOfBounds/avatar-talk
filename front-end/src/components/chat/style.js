'use client';
import styled from "styled-components";

export const Container = styled.div`
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100vw;
    height: 15vh;

    z-index: 1;
`;

export const ChatContainer = styled.div`
    background: #39393969;
    width: 50%;
    height: 80%;
    margin: auto;
    border-radius: 30px;
    display: flex;
`

export const Input = styled.input`
    style:none;
    font-size: 16px;
    border: none;
    border-radius: 10px;
    width: 80%;
    height: 70%;
    margin: auto;
    border: 2px solid #333;
`

export const SendBtn = styled.button`
    height: 50px;
    width: 50px;
    border-radius: 50%;
    background-color: #fff;
    color: #333; 
    margin: auto;

`