import Th from "../../components/general/Th";
import Td from "../../components/general/Td";
import { GET_INVOICES_FOR_ADVERTISER } from "../../graphql/invoice";
import { useQuery } from "@apollo/client";
import { useMemo, useState } from "react";
import Loader from "../../components/general/Loader";
import PaymentModal from "../../components/advertiser/PaymentModal";

// Define Invoice type
interface Invoice {
  id: string;
  invoiceNumber: string;
  campaign: string;
  amount: number;
  paymentDate: string | null;
  reference: string | null;
  paymentMethod: string | null;
  status: string;
}

const AdvertiserInvoices = () => {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const { data, loading: loadingInvoices } = useQuery(
    GET_INVOICES_FOR_ADVERTISER
  );
  const invoicesData = useMemo(
    () => data?.getInvoicesForAdvertiser || [],
    [data?.getInvoicesForAdvertiser]
  );
  const handlePaymentClick = (invoice: Invoice) => {
    if (invoice.status === "PENDING") {
      setSelectedInvoice(invoice);
    }
  };

  const handleCloseModal = () => {
    setSelectedInvoice(null);
  };

  const handlePaymentSuccess = () => {
    // Refetch the invoices data to show updated payment status
    // This will be handled by Apollo cache updates
  };
  return (
    <>
      {selectedInvoice && (
        <PaymentModal
          invoice={selectedInvoice}
          closeModal={handleCloseModal}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
      <section>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-theme-gray">My Invoices</h1>
            <p className="text-sm text-gray-500 mt-2">
              List of all your campaign invoices and their payment status
            </p>
          </div>
          {loadingInvoices ? (
            <Loader text="Loading Invoices..." />
          ) : (
            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-fit">
                <thead>
                  <tr>
                    <Th>Invoice Number</Th>
                    <Th>Campaign</Th>
                    <Th>Total</Th>
                    <Th>Payment Date</Th>
                    <Th>Reference</Th>
                    <Th>Payment Method</Th>
                    <Th>Status</Th>
                  </tr>
                </thead>
                <tbody>
                  {invoicesData.length > 0 ? (
                    invoicesData.map(
                      (invoice: {
                        id: string;
                        invoiceNumber: string;
                        campaign: string;
                        date: string;
                        amount: number;
                        paymentDate: string;
                        reference: string;
                        paymentMethod: string;
                        status: string;
                      }) => (
                        <tr key={invoice.id}>
                          <Td>{invoice.invoiceNumber}</Td>
                          <Td>{invoice.campaign}</Td>
                          <Td>${invoice.amount.toFixed(2)}</Td>
                          <Td>
                            {invoice.paymentDate
                              ? new Date(
                                  invoice.paymentDate
                                ).toLocaleDateString()
                              : "-"}
                          </Td>
                          <Td>{invoice.reference || "-"}</Td>
                          <Td>{invoice.paymentMethod || "-"}</Td>
                          <Td>
                            <div className="flex items-center justify-between">
                              <span
                                className={`px-3 py-1 text-xs font-medium rounded-full ${
                                  invoice.status === "PAID"
                                    ? "bg-green-100 text-green-800"
                                    : invoice.status === "PENDING"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                                }`}>
                                {invoice.status}
                              </span>
                              {invoice.status === "PENDING" && (
                                <button
                                  onClick={() => handlePaymentClick(invoice)}
                                  className="ml-2 px-2 py-1 text-xs bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors cursor-pointer">
                                  Pay Now
                                </button>
                              )}
                            </div>
                          </Td>
                        </tr>
                      )
                    )
                  ) : (
                    <tr>
                      <Td colSpan={8} align="center">
                        No invoices found.
                      </Td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default AdvertiserInvoices;
