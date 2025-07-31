import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER_BY_ID } from "../../graphql/auth/authQuery";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import getUserIdFromToken from "../../utils/getUserIdFromToken";

const BookedEvents = () => {
  const userId = getUserIdFromToken();

  const { data, loading, error, refetch } = useQuery(GET_USER_BY_ID, {
    variables: { id: userId },
    fetchPolicy: "network-only",
    skip: !userId,
  });

  useEffect(() => {
    if (userId) {
      refetch();
    }
  }, [userId, refetch]);

  if (!userId) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="light" />
        <p className="mt-3">Loading booked events...</p>
      </div>
    );
  }

  if (loading)
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="light" />
      </div>
    );

  if (error)
    return (
      <Alert variant="danger" className="text-center mt-4">
        Error fetching bookings: {error.message}
      </Alert>
    );

  const bookings = data?.getUserById?.bookings || [];

  return (
    <Container className="py-5">
      <h2 className="text-white mb-4">Your Booked Events</h2>
      <Row>
        {bookings.length === 0 ? (
          <Col>
            <Alert variant="info">You haven't booked any events yet.</Alert>
          </Col>
        ) : (
          bookings?.map((booking) => {
            const event = booking?.eventId;
            return (
              <Col key={booking.id} md={4} className="mb-4">
                <Card bg="dark" text="light" className="h-100 shadow">
                  <Card.Img
                    variant="top"
                    src="/event.jpg"
                    alt={event.name}
                    style={{ height: "180px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Title>{event.name}</Card.Title>
                    <Card.Text>
                      <strong>Date:</strong>{" "}
                      {new Date(parseInt(event.date)).toLocaleDateString()}
                      <br />
                      <strong>Time:</strong> {event?.time}
                      <br />
                      <strong>Location:</strong> {event?.location}
                      <br />
                      <strong>Status:</strong>{" "}
                      <span
                        className={
                          event.status === "cancelled"
                            ? "text-danger"
                            : "text-success"
                        }
                      >
                        {event?.status}
                      </span>
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer className="bg-transparent border-0 text-end">
                    <Button
                      variant="outline-light"
                      size="sm"
                      disabled={event.status === "cancelled"}
                    >
                      View Ticket
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            );
          })
        )}
      </Row>
    </Container>
  );
};

export default BookedEvents;
