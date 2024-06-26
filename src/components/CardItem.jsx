import Modal from "./Modal";
import PaymentType from "./PaymentType";
import PurchaseConfirm from "./PurchaseConfirm";
import { usePreSale } from "../context/PreSaleContext";
import { cn } from "../utils";
import { useEffect, useState } from "react";
import useContracts from "../hooks/useContracts";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { formatUnits, parseUnits } from "ethers";
import { USDT_CONTRACT_ADDRESS } from "../contracts/contracts";

function CardItem({ item, className }) {
  const { title, image, offer, totalUsdt, totalToken } = item;

  const [payamount, setPayAmount] = useState(0);
  const [usdtPayAmount, setUsdtPayAmount] = useState(0);

  const { showPurchase, handleSelectPreSale, selectedPaymentType } =
    usePreSale();
  const { getPayAmount, buyLotteryLootBox } = useContracts();
  const { address, isConnected } = useWeb3ModalAccount();

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
    <div
      className={cn(
        "relative flex-shrink-0 w-[260px] select-none cursor-pointer inline-block transition-all duration-500 overflow-hidden opacity-100 scale-100",
        className
      )}
    >
      <div className="p-4 bg-white border shadow rounded-3xl">
        <p className="w-full mb-2 text-xl font-bold text-center uppercase">
          {item[0]}
        </p>
        <p className="mb-6 text-xl font-medium text-center uppercase">
          {Number(item[2])}% Off
        </p>
        <div className="relative h-56 border rounded-2xl">
          <img
            src="/images/blue_swirl_background.png"
            alt=""
            className="absolute inset-0 w-full h-full bg-[#d7f4fb] object-cover rounded-2xl"
          />
          <img
            src={image}
            alt={title}
            className="absolute inset-0 z-10 object-contain w-full h-40 mt-8"
          />
        </div>
        <div className="flex justify-center">
          <div className="inline-flex flex-col items-center justify-center px-4 py-1 text-center -translate-y-1/2 bg-white border rounded-full">
            <span className="font-semibold text-2xl/none">
              {usdtPayAmount} <span className="text-sm">USDT</span>
            </span>
            <span>{formatUnits(item[1].toString(), "ether")} Token</span>
          </div>
        </div>

        <Modal>
          <Modal.Open opens="modal">
            <button
              className="block mx-auto font-semibold text-lg bg-[#acf0ff] border-[5px] border-[#d7f7ff] w-full px-2 py-2 rounded-xl text-center transition-all hover:bg-[#338afc] hover:border-[#338afc] hover:text-white"
              onClick={() => handleSelectPreSale(item)}
            >
              Buy with Crypto
            </button>
          </Modal.Open>
          <Modal.Body name="modal">
            <div className="flex items-center justify-center border-b px-6 py-3">
              <p className="text-lg font-medium">Buy with Cryptocurrency</p>
            </div>

            <div className="mb-4">
              {showPurchase ? (
                <PurchaseConfirm
                  payamount={
                    selectedPaymentType.name === "tBNB"
                      ? payamount
                      : usdtPayAmount
                  }
                />
              ) : (
                <PaymentType />
              )}
            </div>
          </Modal.Body>
        </Modal>

        <p className="mt-6 text-center">Limited Time Offer</p>
      </div>
    </div>
  );
}

export default CardItem;
