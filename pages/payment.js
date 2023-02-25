import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import Cookies from 'js-cookie';
import CheckoutWizard from '../components/CheckoutWizard';
import { toast } from 'react-toastify';

export default function Shipping() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress, paymentMethod } = cart;

  useEffect(() => {
    if (!shippingAddress.address) {
      router.push('/shipping');
    } else {
      setSelectedPaymentMethod(paymentMethod || '');
    }
  }, [paymentMethod, router, shippingAddress.address]);
  const submitHandler = (e) => {
    e.preventDefault();
    if (!selectedPaymentMethod) {
      toast.error('Payment method is required');
    } else {
      dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: selectedPaymentMethod });

      Cookies.set(
        'cart',
        JSON.stringify({
          ...cart,
          paymentMethod: selectedPaymentMethod,
        })
      );

      router.push('/placeorder');
    }
  };
  return (
    <Layout title="Payment Method">
      <CheckoutWizard activeStep={2} />
      <form className="mx-auto max-w-screen-md" onSubmit={submitHandler}>
        <h1 className="mb-4 text-xl">Payment Method</h1>

        {['PayPal', 'Stripe', 'Cash'].map((payment) => (
          <div key={payment} className="mb-4">
            <input
              name="paymentMethod"
              className="p-2 outline-none focus:ring-0"
              id={payment}
              type="radio"
              checked={selectedPaymentMethod === payment}
              onChange={() => setSelectedPaymentMethod(payment)}
            />
            <label className="p-2" htmlFor={payment}>
              {payment}
            </label>
          </div>
        ))}

        <div className="mb-4 flex justify-between">
          <button
            onClick={() => router.push('/shipping')}
            type="button"
            className="default-button w-40 mx-2"
          >
            Back
          </button>
          <button className="primary-button">Next</button>
        </div>
      </form>
    </Layout>
  );
}
