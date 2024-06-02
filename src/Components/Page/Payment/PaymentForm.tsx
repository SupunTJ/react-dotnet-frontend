import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { toastNotify } from "../../../Helper";
import { orderSummaryProps } from "../Order/OrderSummaryProps";
import { apiResponse, cartItemModel } from "../../../Interfaces";
import { useCreateOrderMutation } from "../../../Apis/orderApi";
import { SD_Status } from "../../../Utility/SD";

const PaymentForm = ({ data, userInput }: orderSummaryProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [createOrder] = useCreateOrderMutation();
  const [isProcessing, setIsProcessing] = useState(false);
  console.log("data");
  console.log(data);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "https://example.com/order/123/complete",
      },
      redirect: "if_required",
    });

    if (result.error) {
      toastNotify("An unexpected error occurred.", "error");
      console.log(result.error.message);
    } else {
      console.log(result);

      let grandTotal = 0;
      let totalItems = 0;

      const orderDetailsDTO: any = [];
      data.cartItems.forEach((item: cartItemModel) => {
        const temOrderDetail: any = {};
        temOrderDetail["menuItemId"] = item.menuItem?.id;
        temOrderDetail["quantity"] = item.quantity;
        temOrderDetail["itemName"] = item.menuItem?.name;
        temOrderDetail["price"] = item.menuItem?.price;
        orderDetailsDTO.push(temOrderDetail);
        grandTotal += item.quantity! * item.menuItem?.price!;
        totalItems += item.quantity!;
      });
      const response: apiResponse = await createOrder({
        pickupName: userInput.name,
        pickupPhoneNumber: userInput.phoneNumber,
        pickupEmail: userInput.email,
        totalItems: totalItems,
        orderTotal: grandTotal,
        orderDetailsDTO: orderDetailsDTO,
        stripePaymentIntentID: data.stripePaymentIntentId,
        applicationUserId: data.userId,
        status:
          result.paymentIntent.status === "succeeded"
            ? SD_Status.CONFIRMED
            : SD_Status.PENDING,
      });
      console.log(response);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button className="btn btn-success mt-5 w-100" disabled={isProcessing}>
        {isProcessing ? "Processing..." : "Submit"}
      </button>
    </form>
  );
};

export default PaymentForm;
