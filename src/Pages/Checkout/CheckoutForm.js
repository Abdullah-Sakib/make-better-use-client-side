import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const CheckoutForm = ({product}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState('');
  const [clientSecret, setClientSecret] = useState("");
  const [success, setSuccess] = useState('');
  const [transectionId, setTransectionId] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({price: product?.productPrice}),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [product]);


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const {error} = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      setCardError(error.message);
      console.log(error);
    } else {
      setCardError('');
    }

    setProcessing(true);

    const {paymentIntent, error:confirmError} = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: product?.userName,
            email: product?.userEmail
          },
        },
      },
    );

    if(confirmError){
      setCardError(confirmError.message);
    }

    if(paymentIntent.status === 'succeeded'){
      setSuccess('Congratulations!! Your payment has been successfull.');
      toast.success('Payment successful.');
      setTransectionId(paymentIntent.id)
    }

    setProcessing(false);

  };

  return (
   <form onSubmit={handleSubmit}>
      <CardElement
      className='border bg-base-100 p-4 rounded-lg mt-5'
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <p className='text-error mt-1'>{cardError}</p>
      {success && <>
      <p className='text-success mt-2'>{success}</p>
      <p className=' mt-1'>Your transection Id : {transectionId}</p>
      </>}
      <button type="submit" className='btn btn-primary px-6 mt-4' disabled={!stripe || processing}>
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;