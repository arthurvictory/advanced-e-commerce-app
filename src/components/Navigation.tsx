import { Nav, Navbar, Container } from "react-bootstrap";

function NavigationBar() {
    return (
      <div>
        <Navbar expand="lg" bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="/">Fake Store Project</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/cart">Cart</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </div>
    );
}

export default NavigationBar;