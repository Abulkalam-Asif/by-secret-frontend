import { gql } from "@apollo/client";

export const GET_ROULETTE_SETTINGS = gql`
  query GetRouletteSettings {
    getRouletteSettings {
      costPerView
      costPerClick
      neoDollarsCost
    }
  }
`;

export const UPDATE_ROULETTE_SETTINGS = gql`
  mutation UpdateRouletteSettings(
    $costPerView: Float
    $costPerClick: Float
    $neoDollarsCost: Float
  ) {
    updateRouletteSettings(
      costPerView: $costPerView
      costPerClick: $costPerClick
      neoDollarsCost: $neoDollarsCost
    ) {
      success
      message
    }
  }
`;
