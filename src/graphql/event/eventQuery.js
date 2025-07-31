import { gql } from "@apollo/client";

export const GET_EVENTS = gql`
  query GetEvents {
    getEvents {
      id
      name
      date
      time
      location
      category
      createdAt
      createdBy {
        id
        name
        email
      }
    }
  }
`;

export const GET_EVENT_BY_ID = gql`
  query GetEventById($id: ID!) {
    getEventById(id: $id) {
      id
      name
      description
      date
      time
      location
      category
      availableSeats
      totalSeats
      status
      createdAt
      createdBy {
        id
        name
      }
    }
  }
`;
