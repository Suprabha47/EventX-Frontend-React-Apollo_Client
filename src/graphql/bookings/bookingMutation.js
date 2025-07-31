import { gql } from "@apollo/client";

export const CREATE_BOOKING = gql`
  mutation CreateBooking($input: BookingInput!) {
    createBooking(input: $input) {
      id
      bookingDate
      createdAt
      userId {
        id
        name
      }
      eventId {
        id
        name
      }
    }
  }
`;

export const DELETE_BOOKING = gql`
  mutation DeleteBooking($id: ID!) {
    deleteBooking(id: $id)
  }
`;
