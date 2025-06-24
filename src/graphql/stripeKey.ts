import { gql } from "@apollo/client";

export const GET_STRIPE_TEST_PUBLISHABLE_KEY = gql`
  query GetStripeTestPublishableKey {
    getStripeTestPublishableKey
  }
`;

export const GET_STRIPE_LIVE_PUBLISHABLE_KEY = gql`
  query GetStripeLivePublishableKey {
    getStripeLivePublishableKey
  }
`;
