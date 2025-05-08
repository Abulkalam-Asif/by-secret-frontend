import { gql } from "@apollo/client";

export const GET_ROULETTE_CAMPAIGNS = gql`
  query GetRouletteCampaigns {
    getRouletteCampaigns {
      id
      name
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
      status
      rejectionReason
    }
  }
`;

export const GET_ROULETTE_CAMPAIGNS_COUNT = gql`
  query GetRouletteCampaignsCount {
    getRouletteCampaignsCount {
      pending
      approved
      rejected
    }
  }
`;

export const GET_ALL_ROULETTE_CAMPAIGNS_COUNT = gql`
  query GetAllRouletteCampaignsCount {
    getAllRouletteCampaignsCount {
      pending
      approved
      rejected
    }
  }
`;

export const CREATE_ROULETTE_CAMPAIGN = gql`
  mutation CreateRouletteCampaign(
    $name: String!
    $startDate: String!
    $endDate: String!
    $mainPrize: String!
    $mainPrizeAmount: String!
    $secPrize1: String
    $amount1: String
    $secPrize2: String
    $amount2: String
    $secPrize3: String
    $amount3: String
    $budget: String!
  ) {
    createRouletteCampaign(
      name: $name
      startDate: $startDate
      endDate: $endDate
      mainPrize: $mainPrize
      mainPrizeAmount: $mainPrizeAmount
      secPrize1: $secPrize1
      amount1: $amount1
      secPrize2: $secPrize2
      amount2: $amount2
      secPrize3: $secPrize3
      amount3: $amount3
      budget: $budget
    ) {
      success
      message
    }
  }
`;

export const UPDATE_ROULETTE_CAMPAIGN = gql`
  mutation UpdateRouletteCampaign(
    $id: ID!
    $name: String
    $startDate: String
    $endDate: String
    $mainPrize: String
    $mainPrizeAmount: String
    $secPrize1: String
    $amount1: String
    $secPrize2: String
    $amount2: String
    $secPrize3: String
    $amount3: String
    $budget: String
  ) {
    updateRouletteCampaign(
      id: $id
      name: $name
      startDate: $startDate
      endDate: $endDate
      mainPrize: $mainPrize
      mainPrizeAmount: $mainPrizeAmount
      secPrize1: $secPrize1
      amount1: $amount1
      secPrize2: $secPrize2
      amount2: $amount2
      secPrize3: $secPrize3
      amount3: $amount3
      budget: $budget
    ) {
      success
      message
    }
  }
`;
