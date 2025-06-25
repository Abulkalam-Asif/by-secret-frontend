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

export const GET_APPROVED_ROULETTE_CAMPAIGNS = gql`
  query GetApprovedRouletteCampaigns {
    getApprovedRouletteCampaigns {
      id
      name
      advertiser
      dateCreated
      startDate
      endDate
      mainPrize
      mainPrizeAmount
      secPrize1
      amount1
      secPrize2
      amount2
      secPrize3
      amount3
      budget
    }
  }
`;

export const GET_APPROVED_BEMIDIA_CAMPAIGNS = gql`
  query GetApprovedBeMidiaCampaigns {
    getApprovedBeMidiaCampaigns {
      id
      name
      advertiser
      dateCreated
      startDate
      startHour
      endDate
      endHour
      budget
    }
  }
`;
