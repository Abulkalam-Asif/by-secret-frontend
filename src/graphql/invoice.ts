import { gql } from "@apollo/client";

export const GET_INVOICES_FOR_ADMIN = gql`
  query GetInvoicesForAdmin {
    getInvoicesForAdmin {
      id
      invoiceNumber
      advertiser
      campaign
      date
      amount
      status
      paymentDate
      reference
      paymentMethod
    }
  }
`;
