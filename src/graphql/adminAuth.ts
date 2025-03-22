import { gql } from "@apollo/client";

export const LOGIN_ADMIN = gql`
  mutation LoginAdmin($username: String!, $password: String!) {
    loginAdmin(username: $username, password: $password) {
      success
      message
      token
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
