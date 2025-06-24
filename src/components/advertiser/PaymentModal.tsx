import React, { useMemo, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Modal from "../general/Modal";
import Button from "../general/Button";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_INVOICES_FOR_ADVERTISER,
  PAY_INVOICE,
} from "../../graphql/invoice";
import { useAlert } from "../../contexts/AlertContext";
import { AlertType } from "../../types";
import { GET_STRIPE_PUBLISHABLE_KEY } from "../../graphql/stripeKey";
import Loader from "../general/Loader";

type InvoiceType = {
  id: string;
  invoiceNumber: string;
  amount: number;
};

type PaymentModalProps = {
  invoice: InvoiceType;
  closeModal: () => void;
  onPaymentSuccess: () => void;
};

const PaymentForm = ({
  invoice,
  closeModal,
  onPaymentSuccess,
}: PaymentModalProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [payInvoice] = useMutation(PAY_INVOICE, {
    refetchQueries: [GET_INVOICES_FOR_ADVERTISER],
  });

  const { showAlert } = useAlert();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    setLoading(true);

    // Get a reference to the CardElement
    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setLoading(false);
      return;
    }

    try {
      // Create payment method
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        console.error("[error]", error);
        showAlert({
          message: error.message || "Payment failed",
          type: "error",
        });
        setLoading(false);
        return;
      }

      // Process payment with backend
      const result = await payInvoice({
        variables: {
          invoiceId: invoice.id,
          paymentMethodId: paymentMethod.id,
        },
      });

      if (result.data?.payInvoice?.success) {
        showAlert({
          message: "Payment successful!",
          type: "success",
        });
        onPaymentSuccess();
      } else {
        showAlert({
          message: result.data?.payInvoice?.message || "Payment failed",
          type: "error",
        });
      }
    } catch (err: Error | unknown) {
      console.error("[payment error]", err);
      const errorMessage =
        err instanceof Error
          ? err.message
          : "An error occurred during payment processing";
      showAlert({
        message: errorMessage,
        type: "error" as AlertType["type"],
      });
    } finally {
      setLoading(false);
      closeModal();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-theme-gray mb-1">
          Pay Invoice: {invoice.invoiceNumber}
        </h2>
        <p className="text-sm text-gray-500">
          Amount to be charged: ${invoice.amount.toFixed(2)}
        </p>
      </div>
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-theme-gray">
          Credit Card Information
        </label>
        <div className="border border-gray-300 rounded-md p-3">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>
      </div>{" "}
      <div className="flex gap-3">
        <Button
          type="button"
          onClick={closeModal}
          text="Cancel"
          className="bg-gray-300 hover:bg-gray-400 text-gray-800"
        />
        <Button
          type="submit"
          text={loading ? "Processing..." : "Pay Now"}
          disabled={loading || !stripe}
          onClick={() => {}} // This is needed for TypeScript but will be overridden by form submit handler
        />
      </div>
    </form>
  );
};

const PaymentModal = ({
  invoice,
  closeModal,
  onPaymentSuccess,
}: PaymentModalProps) => {
  const {
    data,
    loading: loadingStripeKey,
    error: stripeKeyError,
  } = useQuery(GET_STRIPE_PUBLISHABLE_KEY, {
    errorPolicy: "all", // This allows us to handle both data and errors
    notifyOnNetworkStatusChange: true,
  });

  const stripePublishableKey = useMemo(
    () => data?.getStripePublishableKey || "",
    [data?.getStripePublishableKey]
  );
  const stripePromise = useMemo(() => {
    if (stripePublishableKey && stripePublishableKey.trim() !== "") {
      return loadStripe(stripePublishableKey);
    }
    return null;
  }, [stripePublishableKey]);

  // Show loading state while fetching Stripe key
  if (loadingStripeKey) {
    return (
      <Modal closeModal={closeModal}>
        <div className="text-center py-8">
          <Loader text="Loading payment options... Please wait." />
        </div>
      </Modal>
    );
  }

  // Handle GraphQL errors
  if (stripeKeyError) {
    return (
      <Modal closeModal={closeModal}>
        <div className="text-center py-8">
          <div className="text-red-600 mb-4">
            <svg
              className="w-12 h-12 mx-auto mb-2"
              fill="currentColor"
              viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <h3 className="text-lg font-semibold">Connection Error</h3>
          </div>{" "}
          <p className="text-gray-600 mb-4">
            Unable to connect to payment service. Please contact support if this
            issue persists.
          </p>
          <Button
            type="button"
            onClick={closeModal}
            text="Close"
            className="bg-gray-300 hover:bg-gray-400 text-gray-800"
          />
        </div>
      </Modal>
    );
  }
  // Handle missing, empty, or invalid Stripe key
  if (!stripePublishableKey || stripePublishableKey.trim() === "") {
    return (
      <Modal closeModal={closeModal}>
        <div className="text-center py-8">
          <div className="text-red-600 mb-4">
            <svg
              className="w-12 h-12 mx-auto mb-2"
              fill="currentColor"
              viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <h3 className="text-lg font-semibold">
              Payment Configuration Error
            </h3>
          </div>{" "}
          <p className="text-gray-600 mb-4">
            {!stripePublishableKey || stripePublishableKey.trim() === ""
              ? "Payment processing is not configured. Please contact support."
              : "Invalid payment configuration detected. Please contact support."}
          </p>
          <Button
            type="button"
            onClick={closeModal}
            text="Close"
            className="bg-gray-300 hover:bg-gray-400 text-gray-800"
          />
        </div>
      </Modal>
    );
  }

  // Handle Stripe promise not being created
  if (!stripePromise) {
    return (
      <Modal closeModal={closeModal}>
        <div className="text-center py-8">
          <Loader text="Initializing payment system..." />
        </div>
      </Modal>
    );
  }

  // Render the payment form when everything is ready
  return (
    <Modal closeModal={closeModal}>
      <Elements stripe={stripePromise}>
        <PaymentForm
          invoice={invoice}
          closeModal={closeModal}
          onPaymentSuccess={onPaymentSuccess}
        />
      </Elements>
    </Modal>
  );
};

export default PaymentModal;
