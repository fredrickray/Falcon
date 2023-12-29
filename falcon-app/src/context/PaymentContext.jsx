import React, {createContext, useState, useContext} from 'react';

const paymentContext = createContext (null);

const PaymentContextProvider = ({children}) => {
  const [data, setData] = useState ();
  const addDataToPaymentContext = arg => {
    setData (arg);
  };
  return (
    <paymentContext.Provider value={{data, addDataToPaymentContext}}>
      {children}
    </paymentContext.Provider>
  );
};
const usePaymentContext = () => {
  const context = useContext(paymentContext);
  return context;
};
export  {PaymentContextProvider, usePaymentContext};
