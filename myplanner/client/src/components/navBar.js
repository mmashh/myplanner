import React from "react";
import {  Navbar, Nav } from "react-bootstrap";

export const NavBar = ({ options, signout }) => {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="md">
        <Navbar.Brand>
          <span id="app-navbar-header">MyPlanner</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="app-navbar-toggle" />
        <Navbar.Collapse id="app-navbar-toggle">
          <Nav className="me-auto">{options()}</Nav>
          <Nav>{signout()}</Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};
