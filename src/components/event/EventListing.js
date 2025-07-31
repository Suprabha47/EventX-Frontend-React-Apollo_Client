import { useState, useMemo } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Table,
  InputGroup,
  Spinner,
  Alert,
  Button,
} from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { useQuery, useMutation } from "@apollo/client";
import { useSelector } from "react-redux";
import { GET_EVENTS } from "../../graphql/event/eventQuery";
import { CREATE_BOOKING } from "../../graphql/bookings/bookingMutation";
import { DELETE_EVENT } from "../../graphql/event/eventMutation";
import getUserIdFromToken from "../../utils/getUserIdFromToken";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const EventListing = () => {
  const { data, loading, error } = useQuery(GET_EVENTS);
  const [createBooking] = useMutation(CREATE_BOOKING);
  const navigate = useNavigate();

  const [deleteEvent, { loading: deleting }] = useMutation(DELETE_EVENT, {
    refetchQueries: ["GetEvents"], // ✅ Refetch the event list
    onCompleted: (data) => {
      if (data?.deleteEvent?.success) {
        toast.success("Event deleted successfully!");
      } else {
        toast.error(data?.deleteEvent?.message || "Delete failed.");
      }
    },
    onError: (error) => {
      toast.error("Error deleting event: " + error.message);
    },
  });

  const isAdmin = useSelector((state) => state.user.isAdmin);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const events = data?.getEvents || [];

  const categories = [
    "all",
    ...new Set(events.map((e) => e.category).filter(Boolean)),
  ];

  const filteredEvents = useMemo(() => {
    let filtered = events.filter((event) => {
      const name = event.name?.toLowerCase() || "";
      const speaker = event.createdBy?.name?.toLowerCase() || "";
      const matchesSearch =
        name.includes(searchTerm.toLowerCase()) ||
        speaker.includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || event.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    if (sortBy === "date") {
      filtered.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    } else if (sortBy === "category") {
      filtered.sort((a, b) =>
        (a.category || "").localeCompare(b.category || "")
      );
    }

    return filtered;
  }, [events, searchTerm, sortBy, selectedCategory]);

  const handleRegister = async (eventId) => {
    const userId = getUserIdFromToken();
    if (!userId) {
      toast.warn("Please login to book this event.");
      return;
    }

    try {
      const { data } = await createBooking({
        variables: {
          input: {
            userId,
            eventId,
          },
        },
      });

      if (data?.createBooking) {
        toast.success("Booking successful!");
      }
    } catch (err) {
      console.error("Booking error:", err);
      toast.error("Already Booked or something went wrong.");
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      deleteEvent({ variables: { id } });
    }
  };

  if (loading)
    return (
      <div className="text-center mt-5 mb-5 pb-5">
        <Spinner
          animation="border"
          variant="primary"
          className="mt-5 mb-5 pb-5"
        />
      </div>
    );

  if (error)
    return (
      <Alert variant="danger" className="mt-5 text-center">
        Error loading events: {error.message}
      </Alert>
    );

  return (
    <Container className="mt-5">
      <div className="text-center mb-4">
        <h6 className="text-muted">eventX</h6>
        <h2>Upcoming Events</h2>
      </div>

      <Row className="align-items-center mb-4">
        <Col md={5}>
          <InputGroup>
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search by event name/speaker"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Col>

        <Col md={4}>
          <Form.Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "all" ? "All Categories" : cat}
              </option>
            ))}
          </Form.Select>
        </Col>

        <Col md={3} className="text-end">
          <Form.Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="date">Sort by Date</option>
            <option value="category">Sort by Category</option>
          </Form.Select>
        </Col>
      </Row>

      <Table bordered hover responsive className="align-middle">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Event Name</th>
            <th>Category</th>
            <th>Created By</th>
            <th>Date & Time</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, idx) => (
              <tr key={event.id}>
                <td>{idx + 1}</td>
                <td>{event.name}</td>
                <td>{event.category || "N/A"}</td>
                <td>
                  <div className="d-flex align-items-center">
                    <img
                      src={`https://i.pravatar.cc/40?img=${(idx % 10) + 1}`}
                      alt={event.createdBy?.name || "User"}
                      className="rounded-circle me-2"
                      width={40}
                      height={40}
                    />
                    <div>
                      <strong>{event.createdBy?.name || "Unknown"}</strong>
                      <div
                        className="text-muted"
                        style={{ fontSize: "0.85rem" }}
                      >
                        {event.createdBy?.email || "No email"}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div>
                    <strong>
                      {new Date(parseInt(event.date)).toLocaleDateString()}
                    </strong>
                  </div>
                  <div className="text-muted">{event.time}</div>
                </td>
                <td className="text-center">
                  {isAdmin ? (
                    <>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        className="me-2"
                        onClick={() => handleDelete(event.id)}
                        disabled={deleting}
                      >
                        {deleting ? "Deleting..." : "DELETE"}
                      </Button>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => navigate(`/edit-event/${event.id}`)}
                      >
                        UPDATE
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="outline-dark"
                      size="sm"
                      onClick={() => handleRegister(event.id)}
                    >
                      REGISTER
                    </Button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4">
                No events found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default EventListing;
