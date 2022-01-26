import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, NavLink, useLocation } from 'react-router-dom';

export default function AppNavBar() {
    const dropDownItems = ["Color Manager", "Sum Function", "Fighter Simulator", "Block-Element-Modifier", "Table Filter and Sort"];

    const [ expandNavBar, setExpandNavBar ] = useState(false);
    const usePathname = () => {
        const location = useLocation();
        return location.pathname;
    };
    
    const pathname = usePathname();

    useEffect(() => {
        setExpandNavBar(false);
    }, [pathname])

  return <>
    <Navbar variant="dark" bg="dark" expand="lg" expanded={expandNavBar}>
        <Container fluid>
            <Navbar.Brand as={NavLink} to="/tech-exam-1/"><span style={{ fontSize: "clamp(1rem, 5vw, 1.5rem)" }}>eWave React Assessment</span></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpandNavBar(!expandNavBar)} />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link as={NavLink} to="/tech-exam-1/">Home</Nav.Link>
                <NavDropdown title="Tasks" id="basic-nav-dropdown">
                {
                    dropDownItems.map((item, index) => {
                        return <NavDropdown.Item key={index} as={Link} to={`/tech-exam-1/task-${index + 1}`}>{item}</NavDropdown.Item>
                    })
                }
                </NavDropdown>
            </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  </>;
}
