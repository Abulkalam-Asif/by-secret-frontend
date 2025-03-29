import { gql } from "@apollo/client";

export const GET_WIKI = gql`
  query GetWiki {
    getWiki {
      content
      updatedAt
    }
  }
`;

export const UPDATE_WIKI = gql`
  mutation UpdateWiki($content: String!) {
    updateWiki(content: $content) {
      success
      message
    }
  }
`;
