import { gql } from "@apollo/client";

export const GET_STRIPE_PUBLISHABLE_KEY = gql`
  query GetStripePublishableKey {
    getStripePublishableKey
  }
`;
