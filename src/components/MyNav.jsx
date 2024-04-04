import React, { useContext } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import SearchBooks from './SearchBooks';
import {ThemeContext} from '../context/ThemeContextProvider';
import { FiMoon, FiSun } from "react-icons/fi";

export default function MyNav( {onSearch, isHomepage} ) {

  const {value, setValue} = useContext(ThemeContext);

  return (
    <Navbar expand="lg" bg={value} data-bs-theme={value}>
      <Container>
      <Navbar.Brand href="#home">
            <img
              alt=""
              src="https://github.com/CodeKaito/M5W1D4/blob/master/src/img/epibooks-logo.png?raw=true"
              width={30} 
              height={30}
              className="d-inline-block align-top"
            />{' '}
            <b>Epibooks</b>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="align-items-center justify-content-between w-100">
            <Nav.Item className='d-flex'>
              <Nav.Link className='p-2' href="#home">Home</Nav.Link>
              <Nav.Link className='p-2' href="#link">About</Nav.Link>
              <Nav.Link className='p-2' href="#browse">Browse</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Button variant={value} onClick={() => setValue(value === "dark" ? "light" : "dark")}>
                {value === "dark" ? <FiSun/> : <FiMoon/>}
              </Button>
            </Nav.Item>
            {isHomepage && <Nav.Item>
              <SearchBooks onSearch={onSearch}/>
            </Nav.Item>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}