import { useState } from "react";
import { closePaymentModal } from "flutterwave-react-v3";

const [firstanme, setFirstname] = useState("")
const [lastname, setLastname] = useState("")
const [email, setEmail] = useState("")
const [phone, setPhone] = useState("")

const config = {
    // public_key: process.env.FLUTTERWAVE_PUBLIC_API_KEY,
    public_key: 'FLWPUBK-8bc4fc27f95377a4bf1b478af957f69f-X',
    tx_ref: Date.now (),
    amount: 100,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: email,
      phone: phone,
      name: firstanme + lastname
    },
    customizations: {
      title: 'My store',
      description: 'Payment for items in cart',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };

  const fwConfig = {
    ...config,
    text: 'Pay with Flutterwave!',
    callback: response => {
      console.log (response);
      closePaymentModal (); // this will close the modal programmatically
    },
    onClose: () => {},
  };


return { fwConfig }

