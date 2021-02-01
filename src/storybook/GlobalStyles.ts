import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

export const GlobalStyles = createGlobalStyle`
  ${reset}

  *, *::after, *::before {
    box-sizing: border-box
  }

  #story-root {
    padding: 0 40px;
  }

  body {
    position: relative;
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    line-height: 1.4;
  }
  b, strong {
    font-weight: bold;
  }
  button {
    background: none;
    border: 0;
    padding: 0;
    margin: 0;
    cursor: pointer;
    font-family: inherit;
    outline: none;

    &[disabled] {
      cursor: default;
    }
  }
  input {
    font-size: inherit;
    font-family: inherit;
    padding: 0;
    border: 0px;
    margin: 0px;
  }
  .hidden {
    visibility: hidden;
  }
  /* other styles */
`
