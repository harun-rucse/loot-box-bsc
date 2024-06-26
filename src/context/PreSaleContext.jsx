import { createContext, useContext, useEffect, useState } from "react";
import { preSales, paymentTypes } from "../data";
import useContracts from "../hooks/useContracts";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";

const PreSaleContext = createContext();

function PreSaleProvider({ children }) {
  const [preSalesData, setPreSalesData] = useState([]);
  const [paymentTypesData, setPaymentTypesData] = useState([]);
  const [selectedPaymentType, setSelectedPaymentType] = useState({});
  const [selectedPreSale, setSelectedPreSale] = useState({});
  const [showPurchase, setShowPurchase] = useState(false);

  const { address, isConnected } = useWeb3ModalAccount();
  const { getLootBoxes, getPayAmount } = useContracts();

  useEffect(() => {
    const _getlootBoxes = async () => {
      const lootBoxes = await getLootBoxes();
      console.log(lootBoxes[0]);
      setPreSalesData(lootBoxes);
      setSelectedPreSale(lootBoxes.length > 0 ? lootBoxes[0] : {});
    };
    setPaymentTypesData(paymentTypes);

    if (isConnected) _getlootBoxes();
  }, [isConnected]);

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
