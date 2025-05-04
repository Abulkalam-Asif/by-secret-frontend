import { gql } from "@apollo/client";

export const GET_APPROVED_ADS_CAMPAIGNS = gql`
  query GetApprovedAdsCampaigns {
    getApprovedAdsCampaigns {
      id
      name
      advertiser
      dateCreated
      startDate
      endDate
      budget
    }
  }
`;
