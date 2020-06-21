import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
//import { Table } from '../node_modules/bootstrap/dist/css/bootstrap.css'
import "./srcCSS/navigation.css";

const Navigation = () => {
  return (
    <>
      <container>
        <div>
          <Navbar bg="dark text-white">
            <Navbar.Brand>
              <a href="/">
                <img
                  src={process.env.PUBLIC_URL + "/footballWhite.svg"}
                  style={{ width: 20, marginTop: -7 }}
                  alt=""
                />
              </a>
            </Navbar.Brand>
            <Nav className="mr-auto navbar-dark">
              <Nav.Link href="/">Team Tables</Nav.Link>
              <Nav.Link href="/managersummary">Manager Summary</Nav.Link>
              <Nav.Link href="/managersummarylockdown">
                Since Lock Down
              </Nav.Link>
              <Nav.Link href="/information">Info</Nav.Link>
              {/* <Nav.Link href="/datapage">Data</Nav.Link>*/}
            </Nav>
          </Navbar>
        </div>
      </container>
    </>
  );
};

export default Navigation;
