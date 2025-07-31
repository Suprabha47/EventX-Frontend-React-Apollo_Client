import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import { GET_USER_BY_ID } from "../../graphql/auth/authQuery";
import { GET_BOOKINGS } from "../../graphql/bookings/bookingQuery";
import getUserIdFromToken from "../../utils/getUserIdFromToken";

const BookedEvents = () => {
  const userId = getUserIdFromToken();
  const { isAdmin } = useSelector((state) => state.user);

  // Admin: Fetch all bookings
  const {
    data: adminData,
    loading: adminLoading,
    error: adminError,
    refetch: refetchAdmin,
  } = useQuery(GET_BOOKINGS, {
    skip: !isAdmin,
    fetchPolicy: "network-only",
  });

  // Regular user: Fetch user bookings
  const {
    data: userData,
    loading: userLoading,
    error: userError,
    refetch: refetchUser,
  } = useQuery(GET_USER_BY_ID, {
    variables: { id: userId },
    skip: isAdmin || !userId,
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (userId) {
      isAdmin ? refetchAdmin() : refetchUser();
    }
  }, [userId, isAdmin, refetchAdmin, refetchUser]);

  if (!userId) {
    return (
      <Container className="text-center py-5">
        <Alert variant="warning">Please login to view booked events.</Alert>
      </Container>
    );
  }

  if ((isAdmin && adminLoading) || (!isAdmin && userLoading)) {
    return (
      <div className="text-center py-lg-5">
        <Spinner animation="border" variant="light" />
        <p className="mt-3 mb-5 pb-5">Loading booked events...</p>
      </div>
    );
  }

  if ((isAdmin && adminError) || (!isAdmin && userError)) {
    const error = isAdmin ? adminError : userError;
    return (
      <Alert variant="danger" className="text-center mt-4">
        Error fetching bookings: {error.message}
      </Alert>
    );
  }

  const bookings = isAdmin
    ? adminData?.getBookings || []
    : userData?.getUserById?.bookings || [];

  return (
    <Container className="py-5">
      <h2 className="text-dark mb-4 text-center">
        {isAdmin ? "All Bookings" : "Your Booked Events"}
      </h2>
      <Row>
        {bookings.length === 0 ? (
          <Col>
            <Alert variant="info">No bookings found.</Alert>
          </Col>
        ) : (
          bookings.map((booking) => {
            const event = booking?.eventId;
            if (!event) return null;

            return (
              <Col key={booking.id} md={4} className="mb-4">
                <div className="custom-card rounded-4 shadow overflow-hidden position-relative">
                  <div
                    className="card-img-wrapper position-relative"
                    style={{ height: "220px", overflow: "hidden" }}
                  >
                    <img
                      src="/event.jpg"
                      alt={event?.name || "Event"}
                      className="w-100 h-100 object-fit-cover"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="card-overlay p-3 position-absolute bottom-0 w-100">
                    <h5 className="fw-bold mb-1">
                      {event?.name || "Untitled Event"}
                    </h5>
                    <p className="mb-1 small">
                      {event?.time || "TBD"} •{" "}
                      {event?.date
                        ? new Date(parseInt(event.date)).toLocaleDateString()
                        : "TBD"}
                    </p>
                    <div className="d-flex flex-wrap gap-2 mt-2">
                      <span className="badge bg-light text-dark rounded-pill px-3">
                        {event?.status || "Scheduled"}
                      </span>
                      {isAdmin && booking.userId?.name && (
                        <span className="badge bg-dark-subtle text-dark rounded-pill px-3">
                          {booking.userId.name}
                        </span>
                      )}
                    </div>
                    {isAdmin && (
                      <div className="mt-2 small text-white-50">
                        Seats: {event.availableSeats ?? "N/A"} /{" "}
                        {event.totalSeats ?? "N/A"}
                      </div>
                    )}
                  </div>
                </div>
              </Col>
            );
          })
        )}
      </Row>
    </Container>
  );
};

export default BookedEvents;
