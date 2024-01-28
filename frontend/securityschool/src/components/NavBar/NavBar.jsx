import React from "react";
import { Link } from "react-router-dom";
import { Nav, NavbarContainer, NavItem } from "./NavBar.elements";

const NavBar = () => {
  return (
    <>
      <Nav>
        <NavbarContainer>
          <NavItem>
            <Link to="/">Home</Link>
          </NavItem>
          <NavItem>
            <Link to="/register">Register</Link>
          </NavItem>
          <NavItem>
            <Link to="/login">Login</Link>
          </NavItem>
        </NavbarContainer>
      </Nav>
    </>
  );
};

export default NavBar;
