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

export const GET_INVOICES_FOR_ADVERTISER = gql`
  query GetInvoicesForAdvertiser {
    getInvoicesForAdvertiser {
      id
      invoiceNumber
      campaign
      amount
      paymentDate
      reference
      paymentMethod
      status
    }
  }
`;

export const PAY_INVOICE = gql`
  mutation PayInvoice($invoiceId: ID!, $paymentMethodId: String!) {
    payInvoice(invoiceId: $invoiceId, paymentMethodId: $paymentMethodId) {
      success
      message
    }
  }
`;
