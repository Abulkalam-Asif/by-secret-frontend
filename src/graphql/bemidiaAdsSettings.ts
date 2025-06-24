import { gql } from "@apollo/client";

export const GET_BEMIDIA_ADS_SETTINGS = gql`
  query GetBemidiaAdsSettings {
    getBemidiaAdsSettings {
      costPerView
      costPerClick
      rewardPerView
      rewardPerClick
    }
  }
`;

export const UPDATE_BEMIDIA_ADS_SETTINGS = gql`
  mutation UpdateBemidiaAdsSettings(
    $costPerView: Float
    $costPerClick: Float
    $rewardPerView: Float
    $rewardPerClick: Float
  ) {
    updateBemidiaAdsSettings(
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
