import styled from "styled-components";
import { GlobalStyle } from "./globalstyles.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Blog, Register, Login, NavBar, PostPage } from "./components/index.js";

import "./App.css";

const StyledApp = styled.div``;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

function App() {
  return (
    <>
      <StyledApp>
        <GlobalStyle />
        <Router>
          <NavBar />
          <Container>
            <Routes>
              <Route path="/" element={<Blog />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/posts/:postId" element={<PostPage />} />
            </Routes>
          </Container>
        </Router>
      </StyledApp>
    </>
  );
}

export default App;
