import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    body {
        width: 100%;
        height: 100%;
        overflow: hidden;
        margin: 0;
        padding: 0;
        background-color: #222;
        color: #DDD;
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        transition: all 0.2s ease;
        user-select: none;
    }
    * {
        overflow: hidden;
    }
    h1 {
        text-align: center;
        margin: 0;
        text-shadow: 2px 2px 2px black;
    }
`;

export const SVGWrapper = styled.div`
    display: flex;
    place-content: center; place-items: center;
`

export const Input = styled.input`
    padding: 0;
    margin: 0;
    text-align: center;
    font-size: larger;
    font-weight: 400;
    outline: none;
    color: white;
    border: none;
    border-bottom: 0.125vw solid #DDD;
    box-sizing: border-box;
    background-color: inherit;
    width: 100%; height: 100%;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: textfield;
`