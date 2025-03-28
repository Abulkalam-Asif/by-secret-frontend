import { gql } from "@apollo/client";

export const GET_ROULETTE_SETTINGS = gql`
  query GetRouletteSettings {
    getRouletteSettings {
      costPerView
      costPerClick
      rewardPerView
      rewardPerClick
    }
  }
`;

export const UPDATE_ROULETTE_SETTINGS = gql`
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
