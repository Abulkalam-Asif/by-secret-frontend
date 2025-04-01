import { gql } from "@apollo/client";

export const GET_ALL_ADMINS = gql`
  query GetAllAdmins {
    getAllAdmins {
      fullName
      email
      isActive
    }
  }
`;

export const AUTHORIZE_ADMIN = gql`
  query AuthorizeAdmin {
    authorizeAdmin {
      email
    }
  }
`;

export const LOGIN_ADMIN = gql`
  mutation LoginAdmin($email: String!, $password: String!) {
    loginAdmin(email: $email, password: $password) {
      success
      message
    }
  }
`;

export const CREATE_ADMIN = gql`
  mutation CreateAdmin(
    $fullName: String!
    $email: String!
    $password: String!
    $isActive: Boolean!
  ) {
    createAdmin(
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

export const CHANGE_ADMIN_STATUS = gql`
  mutation ChangeAdminStatus($email: String!) {
    changeAdminStatus(email: $email) {
      success
      message
    }
  }
`;

export const CHANGE_ADMIN_PASSWORD = gql`
  mutation ChangeAdminPassword($email: String!, $newPassword: String!) {
    changeAdminPassword(email: $email, newPassword: $newPassword) {
      success
      message
    }
  }
`;

export const LOGOUT_ADMIN = gql`
  mutation LogoutAdmin {
    logoutAdmin {
      success
      message
    }
  }
`;
