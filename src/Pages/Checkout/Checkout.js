import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLoaderData, useNavigation } from "react-router-dom";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(process.env.REACT_APP_stripe_pk);

const Checkout = () => {
  const product = useLoaderData();
  const navigation = useNavigation();

  if(navigation.state === "loading"){
    return <LoadingSpinner></LoadingSpinner>
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold">
        Checkout for - {product?.productName}
      </h2>
      <p className="text-lg font-semibold mt-4">Your card will be charged - ${product?.productPrice}</p>
      <div className="w-1/2">
        <Elements stripe={stripePromise}>
          <CheckoutForm product={product} />
        </Elements>
      </div>
    </div>
  );
};

export default Checkout;
