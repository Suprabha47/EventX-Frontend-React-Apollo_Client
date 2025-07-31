import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { Formik, Form, Field } from "formik";
import {
  Container,
  Card,
  Button,
  Spinner,
  Alert,
  Form as BootstrapForm,
} from "react-bootstrap";
import { GET_EVENT_BY_ID } from "../../graphql/event/eventQuery";
import { UPDATE_EVENT } from "../../graphql/event/eventMutation";

const EditEventForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, loading, error } = useQuery(GET_EVENT_BY_ID, {
    variables: { id },
  });

  const [updateEvent] = useMutation(UPDATE_EVENT);

  if (loading) return <Spinner animation="border" />;
  if (error)
    return <Alert variant="danger">Error loading event: {error.message}</Alert>;

  const event = data?.getEventById;

  return (
    <Container className="py-5">
      <Card className="p-4 shadow rounded-4">
        <h3 className="mb-4 text-center">Edit Event</h3>
        <Formik
          initialValues={{
            name: event.name,
            description: event.description,
            date: event.date,
            time: event.time,
            location: event.location,
            category: event.category,
            totalSeats: event.totalSeats,
            availableSeats: event.availableSeats,
          }}
          onSubmit={async (values) => {
            try {
              await updateEvent({
                variables: {
                  id,
                  input: {
                    ...values,
                  },
                },
              });
              navigate("/events");
            } catch (err) {
              console.error("Update failed:", err.message);
            }
          }}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <BootstrapForm.Group className="mb-3">
                <BootstrapForm.Label>Name</BootstrapForm.Label>
                <Field name="name" className="form-control" />
              </BootstrapForm.Group>

              <BootstrapForm.Group className="mb-3">
                <BootstrapForm.Label>Description</BootstrapForm.Label>
                <Field
                  name="description"
                  as="textarea"
                  className="form-control"
                />
              </BootstrapForm.Group>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <BootstrapForm.Label>Date</BootstrapForm.Label>
                  <Field name="date" type="date" className="form-control" />
                </div>
                <div className="col-md-6 mb-3">
                  <BootstrapForm.Label>Time</BootstrapForm.Label>
                  <Field name="time" type="time" className="form-control" />
                </div>
              </div>

              <BootstrapForm.Group className="mb-3">
                <BootstrapForm.Label>Location</BootstrapForm.Label>
                <Field name="location" className="form-control" />
              </BootstrapForm.Group>

              <BootstrapForm.Group className="mb-3">
                <BootstrapForm.Label>Category</BootstrapForm.Label>
                <Field name="category" className="form-control" />
              </BootstrapForm.Group>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <BootstrapForm.Label>Total Seats</BootstrapForm.Label>
                  <Field
                    name="totalSeats"
                    type="number"
                    className="form-control"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <BootstrapForm.Label>Available Seats</BootstrapForm.Label>
                  <Field
                    name="availableSeats"
                    type="number"
                    className="form-control"
                  />
                </div>
              </div>

              <Button variant="primary" type="submit" className="w-100">
                Update Event
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </Container>
  );
};

export default EditEventForm;
