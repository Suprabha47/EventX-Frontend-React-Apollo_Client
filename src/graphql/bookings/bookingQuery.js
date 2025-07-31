import { gql } from "@apollo/client";

export const GET_BOOKINGS = gql`
  query GetBookings {
    getBookings {
      id
      bookingDate
      createdAt
      userId {
        id
        name
        email
      }
      eventId {
        id
        name
        date
        time
        status
        availableSeats
        totalSeats
      }
    }
  }
`;

export const GET_BOOKING_BY_ID = gql`
  query GetBookingById($id: ID!) {
    getBookingById(id: $id) {
      id
      bookingDate
      createdAt
      userId {
        id
        name
        email
      }
      eventId {
        id
        name
        date
        time
      }
    }
  }
`;
