import styled from "styled-components";

export const Nav = styled.nav`
  background: #1f1f1f;
  color: #f1f1f1;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  position: sticky;
  top: 0;
  z-index: 999;
`;
export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 80px;
  z-index: 1;
  width: 100%;
  max-width: 1300px;
`;
export const NavItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 24px;
`;
