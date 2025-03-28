import { gql } from "@apollo/client";

export const GET_ADS_SETTINGS = gql`
  query GetAdsSettings {
    getAdsSettings {
      costPerView
      costPerClick
      rewardPerView
      rewardPerClick
    }
  }
`;

export const UPDATE_ADS_SETTINGS = gql`
  mutation UpdateAdsSettings(
    $costPerView: Float
    $costPerClick: Float
    $rewardPerView: Float
    $rewardPerClick: Float
  ) {
    updateAdsSettings(
      costPerView: $costPerView
      costPerClick: $costPerClick
      rewardPerView: $rewardPerView
      rewardPerClick: $rewardPerClick
    ) {
      success
      message
    }
  }
`;
