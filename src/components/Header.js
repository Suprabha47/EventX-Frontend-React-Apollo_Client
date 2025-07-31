import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { changeUserState } from "../redux/userSlice";
import "../Header.css";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(
      changeUserState({
        name: "",
        email: "",
        isAdmin: false,
        status: false,
      })
    );
    navigate("/auth");
  };

  return (
    <Navbar expand="lg" variant="dark" className="eventx-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/">
          EventX
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="mx-auto gap-4">
            <Nav.Link as={Link} to="/" className="nav-link">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/events" className="nav-link">
              Events
            </Nav.Link>
            <Nav.Link as={Link} to="/bookings" className="nav-link">
              Bookings
            </Nav.Link>
            {user?.isAdmin ? (
              <Nav.Link as={Link} to="/create-event" className="nav-link">
                Create Event
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/" className="nav-link">
                Contact
              </Nav.Link>
            )}
          </Nav>

          <div className="d-flex gap-2 align-items-center">
            {user?.status ? (
              <div>
                <span className="text-white fw-bold pe-3">
                  Welcome, {user.name}
                </span>
                <Button variant="outline-light" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Button
                  variant="outline-light"
                  onClick={() => navigate("/auth")}
                >
                  Login
                </Button>
                <Button variant="light" onClick={() => navigate("/auth")}>
                  Signup
                </Button>
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
