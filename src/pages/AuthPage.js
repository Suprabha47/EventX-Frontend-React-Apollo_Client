import { useState } from "react";
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import "../Auth.css";
import Login from "../components/Login";
import Register from "../components/Register";

const AuthPage = () => {
  const [activeEvent, setActiveEvent] = useState("register");

  return (
    <Container fluid className="auth-container">
      <Row className="auth-box">
        <Col
          md={6}
          className="left-pane d-flex flex-column justify-content-center align-items-center text-white"
        >
          <h2>Welcome Page</h2>
          <p className="text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            pharetra lacinia maximus.
          </p>
          <div className="social-icons mt-3">
            <i className="bi bi-twitter me-3"></i>
            <i className="bi bi-google me-3"></i>
            <i className="bi bi-facebook"></i>
          </div>
        </Col>
        <Col md={6} className="right-pane">
          <Tab.Container activeKey={activeEvent}>
            <Nav variant="tabs" className="justify-content-end mt-3 me-3">
              <Nav.Item>
                <Nav.Link
                  eventKey="signin"
                  onClick={() => setActiveEvent("signin")}
                  style={{ color: "black" }}
                >
                  <span style={{ color: "black" }}>Sign In </span>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="register"
                  onClick={() => setActiveEvent("register")}
                >
                  <span style={{ color: "black" }}>Register</span>
                </Nav.Link>
              </Nav.Item>
            </Nav>

            <Tab.Content className="p-3">
              <Tab.Pane eventKey="signin">
                <Login />
              </Tab.Pane>
              <Tab.Pane eventKey="register">
                <Register onSwitchToLogin={() => setActiveEvent("signin")} />
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Col>
      </Row>
    </Container>
  );
};

export default AuthPage;
