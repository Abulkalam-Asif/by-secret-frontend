import { gql } from "@apollo/client";

export const getAdsSetting = gql`
  query GetAdsSetting {
    getAdsSetting {
      costPerView
      costPerClick
      rewardPerView
      rewardPerClick
    }
  }
`;

export const updateAdsSetting = gql`
  mutation UpdateAdsSetting(
    $costPerView: Float
    $costPerClick: Float
    $rewardPerView: Float
    $rewardPerClick: Float
  ) {
    updateAdsSetting(
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
