import * as styled from "styled-components";

export const GlobalStyles = styled.createGlobalStyle`
  html {
    font-size: 62.5%;
    font-family: ${({ theme }) => theme.fonts.body};
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
    font-size: ${({ theme }) => theme.fontSizes.md};
    min-height: 100vh;
    overflow: hidden;
    padding: 0 0;
    background:
      radial-gradient(circle at top, ${({ theme }) => theme.alpha.sky35} 0%, transparent 30%),
      radial-gradient(circle at bottom left, ${({ theme }) => theme.alpha.accent24} 0%, transparent 26%),
      ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text.primary};
  }

  @media (max-width: 1100px) {
    body {
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }
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
    box-shadow: 0 0 0 2px ${({ theme }) => theme.alpha.accentGlow};
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
    background: ${({ theme }) => theme.alpha.accent35};
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
