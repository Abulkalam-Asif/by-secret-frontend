import { gql } from "@apollo/client";

export const GET_REJECTED_ADS_CAMPAIGNS = gql`
  query GetRejectedAdsCampaigns {
    getRejectedAdsCampaigns {
      id
      name
      advertiser
      dateRequested
      days
      startDate
      budget
      media
      action
    }
  }
`;
