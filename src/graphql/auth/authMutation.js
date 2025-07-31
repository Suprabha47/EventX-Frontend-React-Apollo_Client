import { gql } from "@apollo/client";

export const USER_REGISTRATION = gql`
  mutation RegisterUser($input: UserInput!) {
    userRegistration(input: $input)
  }
`;

export const USER_LOGIN = gql`
  mutation LoginUser($input: UserLoginInput!) {
    userLogin(input: $input) {
      id
      name
      email
      isAdmin
      token
    }
  }
`;
export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;
