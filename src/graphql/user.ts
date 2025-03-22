import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser(
    $fullName: String!
    $email: String!
    $password: String!
    $isActive: Boolean
  ) {
    createUser(
      fullName: $fullName
      email: $email
      password: $password
      isActive: $isActive
    ) {
      success
      message
    }
  }
`;
