import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      name
      email
      isAdmin
      createdAt
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!) {
    getUserById(id: $id) {
      id
      name
      email
      isAdmin
      createdAt
      bookings {
        id
        bookingDate
        eventId {
          name
          status
          time
          location
          date
        }
      }
    }
  }
`;

export const GET_BOOKINGS_BY_USER_ID = gql`
  query GetUserById($id: ID!) {
    getUserById(id: $id) {
      id
      bookings {
        eventId {
          id
        }
      }
    }
  }
`;
