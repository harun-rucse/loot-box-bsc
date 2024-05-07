import { createContext, useContext, useEffect, useState } from "react";
import { preSales, paymentTypes } from "../data";

const PreSaleContext = createContext();

function PreSaleProvider({ children }) {
  const [preSalesData, setPreSalesData] = useState([]);
  const [paymentTypesData, setPaymentTypesData] = useState([]);
  const [selectedPaymentType, setSelectedPaymentType] = useState({});
  const [selectedPreSale, setSelectedPreSale] = useState({});
  const [showPurchase, setShowPurchase] = useState(false);

  useEffect(() => {
    setPreSalesData(preSales);
    setPaymentTypesData(paymentTypes);
    setSelectedPreSale(preSales[0]);
  }, []);

  function handleSelectPayment(paymentType) {
    setSelectedPaymentType(paymentType);
    setShowPurchase(true);
  }

  function handleSelectPreSale(preSale) {
    setSelectedPreSale(preSale);
  }

  return (
    <PreSaleContext.Provider
      value={{
        preSalesData,
        paymentTypesData,
        selectedPaymentType,
        handleSelectPayment,
        showPurchase,
        setShowPurchase,
        selectedPreSale,
        handleSelectPreSale,
      }}
    >
      {children}
    </PreSaleContext.Provider>
  );
}

function usePreSale() {
  const context = useContext(PreSaleContext);
  if (context === undefined)
    throw new Error("PreSaleContext was used outside of PreSale Provider");

  return context;
}

export { PreSaleProvider, usePreSale };
