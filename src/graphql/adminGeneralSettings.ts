import { gql } from "@apollo/client";

export const GET_ADMIN_GENERAL_SETTINGS = gql`
  query GetAdminGeneralSettings {
    getAdminGeneralSettings {
      companyName
      logo
      phone
      email
      address
      city
      state
      country
      zipCode
      stripeTestPublishableKey
      stripeTestSecretKey
      stripeLivePublishableKey
      stripeLiveSecretKey
      googleMapsApiKey
      oneLoginPublishableKey
      oneLoginPrivateKey
      smtpHost
      smtpPort
      smtpUsername
      smtpPassword
      smtpFromEmail
      smtpFromName
      termsAndConditions
      privacyPolicy
    }
  }
`;

export const UPDATE_ADMIN_GENERAL_SETTINGS = gql`
  mutation UpdateAdminGeneralSettings(
    $companyName: String
    $logo: String
    $phone: String
    $email: String
    $address: String
    $city: String
    $state: String
    $country: String
    $zipCode: String
    $stripeTestPublishableKey: String
    $stripeTestSecretKey: String
    $stripeLivePublishableKey: String
    $stripeLiveSecretKey: String
    $googleMapsApiKey: String
    $oneLoginPublishableKey: String
    $oneLoginPrivateKey: String
    $smtpHost: String
    $smtpPort: String
    $smtpUsername: String
    $smtpPassword: String
    $smtpFromEmail: String
    $smtpFromName: String
    $termsAndConditions: String
    $privacyPolicy: String
  ) {
    updateAdminGeneralSettings(
      companyName: $companyName
      logo: $logo
      phone: $phone
      email: $email
      address: $address
      city: $city
      state: $state
      country: $country
      zipCode: $zipCode
      stripeTestPublishableKey: $stripeTestPublishableKey
      stripeTestSecretKey: $stripeTestSecretKey
      stripeLivePublishableKey: $stripeLivePublishableKey
      stripeLiveSecretKey: $stripeLiveSecretKey
      googleMapsApiKey: $googleMapsApiKey
      oneLoginPublishableKey: $oneLoginPublishableKey
      oneLoginPrivateKey: $oneLoginPrivateKey
      smtpHost: $smtpHost
      smtpPort: $smtpPort
      smtpUsername: $smtpUsername
      smtpPassword: $smtpPassword
      smtpFromEmail: $smtpFromEmail
      smtpFromName: $smtpFromName
      termsAndConditions: $termsAndConditions
      privacyPolicy: $privacyPolicy
    ) {
      success
      message
    }
  }
`;
