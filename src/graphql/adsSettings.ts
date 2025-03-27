import { gql } from "@apollo/client";

export const getAdsSettings = gql`
  query GetAdsSettings {
    getAdsSettings {
      costPerView
      costPerClick
      rewardPerView
      rewardPerClick
    }
  }
`;

export const updateAdsSettings = gql`
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
