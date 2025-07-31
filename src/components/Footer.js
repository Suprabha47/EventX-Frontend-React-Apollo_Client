import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#0e0e0e",
        color: "#ccc",
        padding: "60px 0",
        fontSize: "14px",
      }}
    >
      <Container>
        <Row className="mb-5">
          {/* Brand/Info */}
          <Col md={3}>
            <h5 style={{ letterSpacing: "2px", color: "#fff" }}>EventX</h5>
            <p>
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered
            </p>
          </Col>

          {/* Navigation */}
          <Col md={3}>
            <ul className="list-unstyled">
              <li>
                <a href="/" className="text-decoration-none text-light">
                  Home
                </a>
              </li>
              <li>
                <a href="/" className="text-decoration-none text-light">
                  About
                </a>
              </li>
              <li>
                <a href="/" className="text-decoration-none text-light">
                  Event
                </a>
              </li>
              <li>
                <a href="/" className="text-decoration-none text-light">
                  Blog
                </a>
              </li>
            </ul>
          </Col>

          {/* Navigation 2 */}
          <Col md={3}>
            <ul className="list-unstyled">
              <li>
                <a href="/" className="text-decoration-none text-light">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/" className="text-decoration-none text-light">
                  Careers
                </a>
              </li>
              <li>
                <a href="/" className="text-decoration-none text-light">
                  Our Approach
                </a>
              </li>
              <li>
                <a href="/" className="text-decoration-none text-light">
                  Contact
                </a>
              </li>
            </ul>
          </Col>

          {/* Contact Info */}
          <Col md={3}>
            <ul className="list-unstyled">
              <li className="mb-2">
                <FaMapMarkerAlt /> 303 South lorem Street, Charlotte, NC
              </li>
              <li className="mb-2">
                <FaPhoneAlt /> 777-444-2220
              </li>
              <li>
                <FaEnvelope /> Info@eventsociethy.com
              </li>
            </ul>
          </Col>
        </Row>

        <hr style={{ borderColor: "#333" }} />

        {/* Bottom Row */}
        <Row className="d-flex justify-content-between align-items-center">
          <Col md={6}>
            <p className="mb-0 text-light">
              © 2025 All rights reserved by SocieTHY
            </p>
          </Col>
          <Col md={3} className="d-flex gap-3 justify-content-end">
            <FaFacebookF className="text-light" />
            <FaTwitter className="text-light" />
            <FaLinkedinIn className="text-light" />
            <FaYoutube className="text-light" />
          </Col>
          <Col md={3} className="text-end">
            <a href="/" className="text-light text-decoration-none me-3">
              Terms & Conditions
            </a>
            <a href="/" className="text-light text-decoration-none">
              Privacy Policy
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
