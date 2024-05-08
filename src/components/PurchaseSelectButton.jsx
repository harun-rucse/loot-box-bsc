import { useEffect, useState } from "react";
import { usePreSale } from "../context/PreSaleContext";
import useContracts from "../hooks/useContracts";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { formatUnits, parseUnits } from "ethers";
import { USDT_CONTRACT_ADDRESS } from "../contracts/contracts";

function PurchaseSelectButton({ item, handleSelect }) {
  const [payamount, setPayAmount] = useState(0);
  const [usdtPayAmount, setUsdtPayAmount] = useState(0);

  const { getPayAmount } = useContracts();
  const { selectedPaymentType, selectedPreSale } = usePreSale();
  const { address, isConnected } = useWeb3ModalAccount();
  const { image } = item;

  useEffect(() => {
    const _getPayAmount = async () => {
      const _token_amount = formatUnits(item[1].toString(), "ether");

      const _payAmount = await getPayAmount(
        "0x0000000000000000000000000000000000000000",
        parseUnits(
          (_token_amount - (_token_amount * Number(item[2])) / 100).toString(),
          "ether"
        )
      );

      setPayAmount(formatUnits(_payAmount, "ether"));

      const _usdtPayAmount = await getPayAmount(
        USDT_CONTRACT_ADDRESS,
        parseUnits(
          (_token_amount - (_token_amount * Number(item[2])) / 100).toString(),
          "ether"
        )
      );

      setUsdtPayAmount(formatUnits(_usdtPayAmount, "ether"));
    };
    if (isConnected) _getPayAmount();
  }, [isConnected]);

  return (
    <button
      className="flex text-left justify-between items-center px-5 py-2.5 w-full h-auto text-lg transition-all hover:bg-[#d7f4fb]"
      type="button"
      onClick={handleSelect}
    >
      <div className="flex items-center gap-2">
        <img src={image} alt={item[0]} className="object-contain w-8 h-8" />
        <div className="flex flex-col">
          <span>{item[0]}</span>
          <span className="text-xs">
            {`${
              selectedPaymentType.name === "tBNB" ? payamount : usdtPayAmount
            } ${selectedPaymentType.name}`}{" "}
            |{" "}
            <span className="line-through">{`${(
              Number(
                selectedPaymentType.name === "tBNB" ? payamount : usdtPayAmount
              ) +
              (selectedPaymentType.name === "tBNB"
                ? payamount
                : Number(usdtPayAmount) * Number(item[2])) /
                100
            ).toFixed(2)} ${selectedPaymentType.name}`}</span>{" "}
            ({Number(item[2])}% OFF)
          </span>
        </div>
      </div>
    </button>
  );
}

export default PurchaseSelectButton;
