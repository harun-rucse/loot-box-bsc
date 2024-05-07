import { useState } from "react";
import PurchaseSelectButton from "./PurchaseSelectButton";
import { usePreSale } from "../context/PreSaleContext";
import toast from "react-hot-toast";
import useContracts from "../hooks/useContracts";

function PurchaseConfirm({ payamount }) {
  const [showButton, setShowButton] = useState(false);
  const [check, setCheck] = useState(false);
  const [isConnected, _] = useState(true);
  const { buyLotteryLootBox } = useContracts();

  const {
    preSalesData: items,
    handleSelectPreSale,
    selectedPreSale,
    selectedPaymentType,
    setShowPurchase,
  } = usePreSale();

  function handleSelect(item) {
    handleSelectPreSale(item);
    setShowButton(false);
  }

  const buyLootBox = async () => {
    await buyLotteryLootBox(
      0,
      "0x0000000000000000000000000000000000000000",
      payamount
    );
  };

  return (
    <div className="mx-6 my-2 p-4 border rounded-xl shadow max-h-[34rem] md:max-h-full overflow-y-auto">
      <div className="flex items-center gap-4">
        <img
          src="/images/purchase_funnel_icon_2.png"
          alt=""
          className="w-10 object-contain"
        />
        <h3 className="text-2xl font-medium">Purchase Lootbox</h3>
      </div>

      <div className="mt-4">
        <p>Selected lootbox and amount you pay ({selectedPaymentType.name})</p>
        <div className="grid grid-cols-6 md:grid-cols-12 gap-4 mt-2">
          <div className="relative col-span-8">
            {showButton && (
              <div className="bg-white shadow border divide-y rounded-2xl absolute bottom-0 left-0 w-full translate-y-full max-h-[16rem] overflow-y-auto z-[999999]">
                {items.length > 0 &&
                  items.map((item, i) => (
                    <PurchaseSelectButton
                      key={i}
                      item={item}
                      handleSelect={() => handleSelect(item)}
                    />
                  ))}
              </div>
            )}

            {/* select button info */}
            <button
              className="flex text-left justify-between items-center px-5 py-2.5 w-full h-auto text-lg border rounded-2xl transition-all hover:bg-[#d7f4fb]"
              type="button"
              onClick={() => setShowButton((prev) => !prev)}
            >
              <div className="flex items-center gap-2">
                <img
                  src={selectedPreSale.image}
                  alt={selectedPreSale.name}
                  className="object-contain w-8 h-8"
                />
                <div className="flex flex-col">
                  <span className="font-bold text-xl/none">
                    {selectedPreSale.title}
                  </span>
                  <span className="text-xs font-semibold">
                    {`${selectedPreSale.newPrice} ${selectedPaymentType.name}`}{" "}
                    |{" "}
                    <span className="line-through">{`${selectedPreSale.oldPrice} ${selectedPaymentType.name}`}</span>{" "}
                    ({selectedPreSale.offer}% OFF)
                  </span>
                </div>
              </div>
              <img src="/images/arrow-down.svg" alt="" />
            </button>
          </div>

          <button
            type="button"
            className="col-span-8 md:col-span-4 flex gap-1 px-4 py-2.5 border font-medium text-xl rounded-2xl items-center transition-all hover:bg-[#d7f4fb]"
            onClick={() => setShowPurchase(false)}
          >
            <img
              src={selectedPaymentType.image}
              alt={selectedPaymentType.name}
              className="object-contain w-6 h-6"
            />
            {selectedPaymentType.name}
            <img src="/images/arrow-down.svg" alt="" className="ml-auto" />
          </button>
        </div>

        <div className="my-3">
          <p>Amount of Token you receive</p>
          <div className="grid grid-cols-6 md:grid-cols-12 gap-4 mt-2">
            <div className="relative col-span-8">
              <input
                name="toValue"
                readOnly
                className="px-5 py-2.5 w-full h-auto text-lg border rounded-2xl"
                value={`${selectedPreSale.totalToken} (${selectedPreSale.totalFreeCoin} free coins)`}
              />
            </div>
            <div className="col-span-8 md:col-span-4 md:justify-center flex gap-1 px-4 py-2.5 border font-medium text-xl rounded-2xl items-center">
              <img
                src="/images/apemax.png"
                alt="Token"
                className="object-contain w-6 h-6"
              />
              Token
            </div>
          </div>
        </div>

        <button
          type="button"
          className="flex items-start gap-2 mt-6 text-left cursor-pointer"
          onClick={() => setCheck((prev) => !prev)}
        >
          <div
            className={`flex flex-shrink-0 items-center justify-center ${
              check && "bg-[#338afc]"
            } w-6 h-6 text-white border rounded-lg hover:bg-[#d7f4fb]`}
          >
            <img src="/images/checkbox.svg" alt="" />
          </div>
          <p className="text-xs">
            I agree to the Terms of Service, Disclaimer below, and Privacy
            Policy. I have read and understood the guide on the Risks of Buying
            Tokens. I hereby declare am not from any Banned Country.
          </p>
        </button>

        <div className="mt-6">
          {isConnected ? (
            <button
              className="flex justify-center gap-2 px-2.5 py-2 items-center w-full text-xl bg-[#acf0ff] border-[5px] border-[#d7f7ff] rounded-xl transition-all hover:bg-[#338afc] hover:border-[#338afc] hover:text-white disabled:cursor-not-allowed disabled:opacity-80"
              disabled={!check}
              onClick={buyLootBox}
            >
              Confirm Buy
            </button>
          ) : (
            <button
              className="flex justify-center gap-2 px-2.5 py-2 items-center w-full text-xl bg-[#acf0ff] border-[5px] border-[#d7f7ff] rounded-xl transition-all hover:bg-[#338afc] hover:border-[#338afc] hover:text-white disabled:cursor-not-allowed disabled:opacity-80"
              disabled={!check}
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PurchaseConfirm;
