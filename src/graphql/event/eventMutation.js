import { gql } from "@apollo/client";

export const CREATE_EVENT = gql`
  mutation CreateEvent($input: EventInput!) {
    createEvent(input: $input) {
      id
      name
      description
      date
      time
      location
      category
      availableSeats
      totalSeats
      createdAt
      createdBy {
        id
        name
      }
    }
  }
`;
export const UPDATE_EVENT = gql`
  mutation UpdateEvent($id: ID!, $input: EventUpdateInput!) {
    updateEvent(id: $id, input: $input) {
      id
      name
      description
      date
      time
      location
      category
      availableSeats
      totalSeats
    }
  }
`;

export const DELETE_EVENT = gql`
  mutation DeleteEvent($id: ID!) {
    deleteEvent(id: $id) {
      success
      message
    }
  }
`;
