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
