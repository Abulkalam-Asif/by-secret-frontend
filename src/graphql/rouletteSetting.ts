import { gql } from "@apollo/client";

export const getRouletteSetting = gql`
  query GetRouletteSetting {
    getRouletteSetting {
      costPerView
      costPerClick
      rewardPerView
      rewardPerClick
    }
  }
`;

export const updateRouletteSetting = gql`
  mutation UpdateRouletteSetting(
    $costPerView: Float
    $costPerClick: Float
    $rewardPerView: Float
    $rewardPerClick: Float
  ) {
    updateRouletteSetting(
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
