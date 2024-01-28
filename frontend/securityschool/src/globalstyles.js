import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
*{
    box-sizing:border-box;
    margin:0;
    padding:0; 

    ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px gray; 
    border-radius: 10px;
    
  }
  ::-webkit-scrollbar-thumb {
    background: #141c3a; 
    border-radius: 10px;
    
  }
  a:-webkit-any-link {
  text-decoration: none;
  color: inherit;
}

}

body {
        background-color: whitesmoke;
        color: #141c3a;
    }


`;

export default GlobalStyle;
