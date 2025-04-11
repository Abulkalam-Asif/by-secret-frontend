import { gql } from "@apollo/client";

export const AUTHORIZE_ADVERTISER = gql`
  query AuthorizeAdvertiser {
    authorizeAdvertiser {
      email
    }
  }
`;

export const SUBMIT_ADVERTISER_STEP1 = gql`
  mutation SubmitAdvertiserStep1(
    $companyName: String!
    $fullContactName: String!
    $email: String!
  ) {
    submitAdvertiserStep1(
      companyName: $companyName
      fullContactName: $fullContactName
      email: $email
    ) {
      success
      message
    }
  }
`;

export const SUBMIT_ADVERTISER_STEP3 = gql`
  mutation SubmitAdvertiserStep3(
    $password: String!
    $phone: String!
    $address: String!
    $logo: String!
    $token: String!
  ) {
    submitAdvertiserStep3(
      password: $password
      phone: $phone
      address: $address
      logo: $logo
      token: $token
    ) {
      success
      message
    }
  }
`;

export const LOGIN_ADVERTISER = gql`
  mutation LoginAdvertiser($email: String!, $password: String!) {
    loginAdvertiser(email: $email, password: $password) {
      success
      message
    }
  }
`;

export const LOGOUT_ADVERTISER = gql`
  mutation LogoutAdvertiser {
    logoutAdvertiser {
      success
      message
    }
  }
`;
