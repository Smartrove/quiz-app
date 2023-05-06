import styled, { createGlobalStyle } from "styled-components";
import backgroundImage from "./assets/img.jpg";

export const GlobalStyle = createGlobalStyle`
html{
    height: auto;
}

body{
    background-image: url(${backgroundImage});
    background-size: cover;
    margin: 0;
    padding: 0 20px;
    display: flex;
    justify-content: center;
}


*{
    box-sizing: border-box;
    font-family: Catamaran, sans-serif;
}
`;
