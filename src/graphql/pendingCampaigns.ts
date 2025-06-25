import { gql } from "@apollo/client";

export const GET_PENDING_ADS_CAMPAIGNS = gql`
  query GetPendingAdsCampaigns {
    getPendingAdsCampaigns {
      id
      name
      advertiser
      dateRequested
      days
      startDate
      budget
      media
      action
    }
  }
`;

export const APPROVE_ADS_CAMPAIGN = gql`
  mutation ApproveAdsCampaign($id: ID!) {
    approveAdsCampaign(id: $id) {
      success
      message
    }
  }
`;

export const REJECT_ADS_CAMPAIGN = gql`
  mutation RejectAdsCampaign($id: ID!, $rejectionReason: String!) {
    rejectAdsCampaign(id: $id, rejectionReason: $rejectionReason) {
      success
      message
    }
  }
`;

export const GET_PENDING_ROULETTE_CAMPAIGNS = gql`
  query GetPendingRouletteCampaigns {
    getPendingRouletteCampaigns {
      id
      name
      advertiser
      dateRequested
      days
      startDate
      mainPrize
      mainPrizeAmount
      secPrize1
      amount1
      secPrize2
      amount2
      secPrize3
      amount3
      budget
    }
  }
`;

export const GET_PENDING_BEMIDIA_CAMPAIGNS = gql`
  query GetPendingBeMidiaCampaigns {
    getPendingBeMidiaCampaigns {
      id
      name
      advertiser
      dateRequested
      days
      startDate
      startHour
      endDate
      endHour
      budget
      media
      action
    }
  }
`;

export const APPROVE_ROULETTE_CAMPAIGN = gql`
  mutation ApproveRouletteCampaign($id: ID!) {
    approveRouletteCampaign(id: $id) {
      success
      message
    }
  }
`;

export const APPROVE_BEMIDIA_CAMPAIGN = gql`
  mutation ApproveBeMidiaCampaign($id: ID!) {
    approveBeMidiaCampaign(id: $id) {
      success
      message
    }
  }
`;

export const REJECT_ROULETTE_CAMPAIGN = gql`
  mutation RejectRouletteCampaign($id: ID!, $rejectionReason: String!) {
    rejectRouletteCampaign(id: $id, rejectionReason: $rejectionReason) {
      success
      message
    }
  }
`;

export const REJECT_BEMIDIA_CAMPAIGN = gql`
  mutation RejectBeMidiaCampaign($id: ID!, $rejectionReason: String!) {
    rejectBeMidiaCampaign(id: $id, rejectionReason: $rejectionReason) {
      success
      message
    }
  }
`;
