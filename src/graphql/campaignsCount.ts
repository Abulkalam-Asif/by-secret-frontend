import { gql } from "@apollo/client";

export const GET_ADS_CAMPAIGNS_COUNT = gql`
  query GetAdsCampaignsCount {
    getAdsCampaignsCount {
      pending
      approved
      rejected
    }
  }
`;

export const GET_ALL_ADS_CAMPAIGNS_COUNT = gql`
  query GetAllAdsCampaignsCount {
    getAllAdsCampaignsCount {
      pending
      approved
      rejected
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

export const GET_ALL_CAMPAIGNS_COUNT = gql`
  query GetAllCampaignsCount {
    getAllCampaignsCount {
      pending
      approved
      rejected
    }
  }
`;

export const GET_CAMPAIGNS_COUNT = gql`
  query GetCampaignsCount {
    getCampaignsCount {
      pending
      approved
      rejected
    }
  }
`;
