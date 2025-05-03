import { gql } from "@apollo/client";

export const GET_ADS_CAMPAIGNS = gql`
  query GetAdsCampaigns {
    getAdsCampaigns {
      id
      name
      adImage
      action
      startDate
      endDate
      budget
      status
    }
  }
`;

export const CREATE_ADS_CAMPAIGN = gql`
  mutation CreateAdsCampaign(
    $name: String!
    $adImage: String!
    $action: String!
    $startDate: String!
    $endDate: String!
    $budget: String!
  ) {
    createAdsCampaign(
      name: $name
      adImage: $adImage
      action: $action
      startDate: $startDate
      endDate: $endDate
      budget: $budget
    ) {
      success
      message
    }
  }
`;
