import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLoaderData } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(process.env.REACT_APP_stripe_pk);

const Checkout = () => {
  const product = useLoaderData();

  return (
    <div>
      <h2 className="text-2xl font-semibold">
        Checkout for {product.productName}
      </h2>
      <div className="w-1/2">
        <Elements stripe={stripePromise}>
          <CheckoutForm product={product} />
        </Elements>
      </div>
    </div>
  );
};

export default Checkout;
