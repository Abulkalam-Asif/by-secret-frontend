import { gql } from "@apollo/client";

export const getRouletteSettings = gql`
  query GetRouletteSettings {
    getRouletteSettings {
      costPerView
      costPerClick
      rewardPerView
      rewardPerClick
    }
  }
`;

export const updateRouletteSettings = gql`
  mutation UpdateRouletteSettings(
    $costPerView: Float
    $costPerClick: Float
    $rewardPerView: Float
    $rewardPerClick: Float
  ) {
    updateRouletteSettings(
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
