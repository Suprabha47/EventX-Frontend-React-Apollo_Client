import { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Spinner,
  Card,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import getUserIdFromToken from "../../utils/getUserIdFromToken";
import { CREATE_EVENT } from "../../graphql/event/eventMutation";

const CreateEventForm = () => {
  const userId = getUserIdFromToken();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "MUSIC",
    availableSeats: 0,
    totalSeats: 0,
    createdBy: userId,
  });

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success");

  const [createEvent, { loading }] = useMutation(CREATE_EVENT);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "availableSeats" || name === "totalSeats"
          ? parseInt(value)
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await createEvent({
        variables: { input: formData },
      });

      setToastMessage(`Event "${data.createEvent.name}" created successfully!`);
      setToastVariant("success");
      setShowToast(true);
      setFormData({
        name: "",
        description: "",
        date: "",
        time: "",
        location: "",
        category: "MUSIC",
        availableSeats: 0,
        totalSeats: 0,
        createdBy: userId,
      });
    } catch (err) {
      setToastMessage(`Failed to create event: ${err.message}`);
      setToastVariant("danger");
      setShowToast(true);
    }
  };

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center min-vh-100"
      style={{ background: "#0f0f0f" }}
    >
      <Card
        style={{
          backgroundColor: "#1a1a1a",
          border: "1px solid #333",
          borderRadius: "16px",
          padding: "32px",
          width: "100%",
          maxWidth: "720px",
          color: "#fff",
          boxShadow: "0 0 20px rgba(255,255,255,0.05)",
        }}
      >
        <h3 className="mb-4 text-white text-center">Create New Event</h3>

        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="text-light">Event Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-dark text-light border-secondary rounded-3"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="text-light">Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="bg-dark text-light border-secondary rounded-3"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="text-light">Time</Form.Label>
                <Form.Control
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="bg-dark text-light border-secondary rounded-3"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="text-light">Location</Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="bg-dark text-light border-secondary rounded-3"
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="text-light">Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="bg-dark text-light border-secondary rounded-3"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="text-light">Category</Form.Label>
                <Form.Select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="bg-dark text-light border-secondary rounded-3"
                >
                  <option value="MUSIC">Music</option>
                  <option value="WORKSHOP">Workshop</option>
                  <option value="SPORTS">Sports</option>
                  <option value="THEATRE">Theatre</option>
                  <option value="CONFERENCE">Conference</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="text-light">Total Seats</Form.Label>
                <Form.Control
                  type="number"
                  name="totalSeats"
                  value={formData.totalSeats}
                  onChange={handleChange}
                  className="bg-dark text-light border-secondary rounded-3"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="text-light">Available Seats</Form.Label>
                <Form.Control
                  type="number"
                  name="availableSeats"
                  value={formData.availableSeats}
                  onChange={handleChange}
                  className="bg-dark text-light border-secondary rounded-3"
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex justify-content-center mt-4">
            <Button
              type="submit"
              variant="light"
              className="px-5 py-2 fw-bold rounded-pill"
              disabled={loading}
              style={{
                backgroundColor: "#fff",
                color: "#000",
                boxShadow: "0 0 8px rgba(255,255,255,0.2)",
              }}
            >
              {loading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                "Lock-in Event"
              )}
            </Button>
          </div>
        </Form>
      </Card>

      <ToastContainer position="top-end" className="p-3">
        <Toast
          show={showToast}
          bg={toastVariant}
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
        >
          <Toast.Body className="text-white">{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
};

export default CreateEventForm;
