import Th from "../../components/general/Th";
import Td from "../../components/general/Td";
import { GET_INVOICES_FOR_ADMIN } from "../../graphql/invoice";
import { useQuery } from "@apollo/client";
import { useMemo } from "react";
import Loader from "../../components/general/Loader";

const AdminInvoices = () => {
  const { data, loading: loadingInvoices } = useQuery(GET_INVOICES_FOR_ADMIN);
  const invoicesData = useMemo(
    () => data?.getInvoicesForAdmin || [],
    [data?.getInvoicesForAdmin]
  );

  return (
    <>
      <section>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-theme-gray">Invoices</h1>
            <p className="text-sm text-gray-500 mt-2">
              List of all generated invoices and their payment status
            </p>
          </div>{" "}
          {loadingInvoices ? (
            <Loader text="Loading Invoices..." />
          ) : (
            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-fit">
                <thead>
                  <tr>
                    <Th>Invoice Number</Th>
                    <Th>Advertiser</Th>
                    <Th>Date</Th>
                    <Th>Amount</Th>
                    <Th>Campaign</Th>
                    <Th>Payment Date</Th>
                    <Th>Reference</Th>
                    <Th>Payment Method</Th>
                    <Th>Status</Th>
                  </tr>
                </thead>
                <tbody>                  {invoicesData.length > 0 ? (
                    invoicesData.map(
                      (invoice: {
                        id: string;
                        invoiceNumber: string;
                        advertiser: string;
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
                          <Td>{invoice.advertiser}</Td>
                          <Td>
                            {new Date(invoice.date).toLocaleDateString()}
                          </Td>
                          <Td>${invoice.amount.toFixed(2)}</Td>
                          <Td>{invoice.campaign}</Td>
                          <Td>
                            {invoice.paymentDate
                              ? new Date(invoice.paymentDate).toLocaleDateString()
                              : "-"}
                          </Td>
                          <Td>{invoice.reference || "-"}</Td>
                          <Td>{invoice.paymentMethod || "-"}</Td>
                          <Td>
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
                          </Td>
                        </tr>
                      )
                    )
                  ) : (
                    <tr>
                      <Td colSpan={9} align="center">
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

export default AdminInvoices;
