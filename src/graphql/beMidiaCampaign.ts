import { gql } from "@apollo/client";

export const GET_BEMIDIA_CAMPAIGNS = gql`
  query GetBeMidiaCampaigns {
    getBeMidiaCampaigns {
      id
      name
      adImage
      action
      startDate
      startHour
      endDate
      endHour
      budget
      status
      rejectionReason
    }
  }
`;

export const CREATE_BEMIDIA_CAMPAIGN = gql`
  mutation CreateBeMidiaCampaign(
    $name: String!
    $adImage: String!
    $action: String!
    $startDate: String!
    $startHour: String!
    $endDate: String!
    $endHour: String!
    $budget: String!
  ) {
    createBeMidiaCampaign(
      name: $name
      adImage: $adImage
      action: $action
      startDate: $startDate
      startHour: $startHour
      endDate: $endDate
      endHour: $endHour
      budget: $budget
    ) {
      success
      message
    }
  }
`;

export const UPDATE_BEMIDIA_CAMPAIGN = gql`
  mutation UpdateBeMidiaCampaign(
    $id: ID!
    $name: String
    $adImage: String
    $action: String
    $startDate: String
    $startHour: String
    $endDate: String
    $endHour: String
    $budget: String
  ) {
    updateBeMidiaCampaign(
      id: $id
      name: $name
      adImage: $adImage
      action: $action
      startDate: $startDate
      startHour: $startHour
      endDate: $endDate
      endHour: $endHour
      budget: $budget
    ) {
      success
      message
    }
  }
`;
