import * as styled from "styled-components";

export const GlobalStyles = styled.createGlobalStyle`
  html {
    font-size: 62.5%;
    box-sizing: border-box;
    scroll-behavior: smooth;
  }

  *,
  *::after,
  *::before {
    box-sizing: inherit;
    padding: 0;
    margin: 0;
    line-height: 1.4;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 1.6rem;
    min-height: 100vh;
    padding: 0 0;
    background:
      radial-gradient(circle at top, rgba(31, 127, 214, 0.35) 0%, rgba(31, 127, 214, 0) 30%),
      radial-gradient(circle at bottom left, rgba(22, 182, 217, 0.24) 0%, rgba(22, 182, 217, 0) 26%),
      ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text.primary};
  }

  #root {
    min-height: 100vh;
  }

  a,
  button {
    text-decoration: none;
    cursor: pointer;
    border: none;
    font-family: inherit;
    background: none;
    color: inherit;
    outline-color: ${({ theme }) => theme.misc.blue};
  }

  *:focus-visible {
    outline: 2.5px solid ${({ theme }) => theme.misc.blue};
    outline-offset: 2px;
    box-shadow: 0 0 0 2px rgba(102, 215, 255, 0.18);
    transition: outline-color 120ms;
  }

  a:hover {
    text-decoration: underline;
  }

  ul,
  li {
    list-style: none;
  }

  img {
    max-width: 100%;
    display: block;
  }

  input {
    font-family: inherit;
  }

  ::selection {
    background: rgba(22, 182, 217, 0.35);
    color: ${({ theme }) => theme.misc.white};
  }

  p,
  li,
  h1,
  h2,
  h3,
  h4 {
    overflow-wrap: break-word;
    hyphens: auto;
  }
`;
