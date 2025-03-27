import { gql } from "@apollo/client";

export const GET_ALL_ADMINS = gql`
  query GetAllAdmins {
    getAllAdmins {
      fullName
      username
      isActive
    }
  }
`;

export const LOGIN_ADMIN = gql`
  mutation LoginAdmin($username: String!, $password: String!) {
    loginAdmin(username: $username, password: $password) {
      success
      message
      token
    }
  }
`;

export const CREATE_ADMIN = gql`
  mutation CreateAdmin(
    $fullName: String!
    $username: String!
    $password: String!
    $isActive: Boolean!
  ) {
    createAdmin(
      fullName: $fullName
      username: $username
      password: $password
      isActive: $isActive
    ) {
      success
      message
    }
  }
`;

export const VERIFY_TOKEN = gql`
  mutation VerifyToken($token: String!) {
    verifyToken(token: $token) {
      success
      message
    }
  }
`;
