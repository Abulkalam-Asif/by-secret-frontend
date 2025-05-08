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
      rejectionReason
    }
  }
`;

export const GET_REJECTED_ROULETTE_CAMPAIGNS = gql`
  query GetRejectedRouletteCampaigns {
    getRejectedRouletteCampaigns {
      id
      name
      advertiser
      dateRequested
      days
      startDate
      mainPrize
      mainPrizeAmount
      secPrize1
      amount1
      secPrize2
      amount2
      secPrize3
      amount3
      budget
      rejectionReason
    }
  }
`;
