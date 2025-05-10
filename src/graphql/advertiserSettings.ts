import { gql } from "@apollo/client";

export const GET_ADVERTISER_SETTINGS = gql`
  query GetAdvertiserSettings {
    getAdvertiserSettings {
      companyName
      fullContactName
      phone
      address
      logo
    }
  }
`;

export const UPDATE_ADVERTISER_SETTINGS = gql`
  mutation UpdateAdvertiserSettings(
    $companyName: String!
    $fullContactName: String!
    $phone: String!
    $address: String!
    $logo: String!
  ) {
    updateAdvertiserSettings(
      companyName: $companyName
      fullContactName: $fullContactName
      phone: $phone
      address: $address
      logo: $logo
    ) {
      success
      message
    }
  }
`;

export const CHANGE_ADVERTISER_PASSWORD = gql`
  mutation ChangeAdvertiserPassword(
    $currentPassword: String!
    $newPassword: String!
  ) {
    changeAdvertiserPassword(
      currentPassword: $currentPassword
      newPassword: $newPassword
    ) {
      success
      message
    }
  }
`; 