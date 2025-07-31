import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <>
      {/* Hero Section */}
      <div
        className="text-light py-5"
        style={{
          backgroundImage: "linear-gradient(to right, #0d0d0d, #1a1a1a)",
        }}
      >
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h1 className="fw-bold">
                Book your
                <br />{" "}
                <span style={{ color: "#ffffff" }}>Tickets for Event!</span>
              </h1>
              <ul className="mt-4">
                <li>Safe, Secure, Event Booking</li>
                <li>Your ticket is just a tap away!</li>
              </ul>
              <Button
                variant="light"
                className="mt-3"
                onClick={() => navigate("/events")}
              >
                View More
              </Button>
            </Col>
            <Col md={6}>
              <img src="/hero-art.png" alt="hero" className="img-fluid" />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Featured Events */}
      <Container className="mt-5">
        <h4 className="mb-4 text-white">Featured Events</h4>
        <Row>
          {[
            "Digital Thinkers",
            "Web Design Conference",
            "Digital Economy 2025",
          ].map((title, i) => (
            <Col md={4} key={i} className="mb-4">
              <Card
                bg="dark"
                text="light"
                className="shadow-sm"
                style={{ border: "1px solid #333" }}
              >
                <Card.Img variant="top" src="/dummy-img.jpg" />
                <Card.Body>
                  <Card.Title>{title}</Card.Title>
                  <Card.Text>2hrs • 5:30PM</Card.Text>
                  <Button variant="light">Get Tickets</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Trending Categories */}
      <Container className="mt-5 mb-5">
        <h4 className="mb-4 text-white">Trending Categories</h4>
        <Row>
          {["Fashion", "Watches", "Health", "Art"].map((category, i) => (
            <Col md={3} key={i} className="mb-4">
              <Card className="text-white border-0 shadow-sm">
                <Card.Img src="/dummy-img.jpg" />
                <Card.ImgOverlay
                  className="d-flex justify-content-end flex-column p-3"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent)",
                  }}
                >
                  <h5 className="fw-bold">{category}</h5>
                  <Button size="sm" variant="light">
                    Explore
                  </Button>
                </Card.ImgOverlay>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
