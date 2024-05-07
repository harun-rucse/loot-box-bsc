import Modal from "./Modal";
import PaymentType from "./PaymentType";
import PurchaseConfirm from "./PurchaseConfirm";
import { usePreSale } from "../context/PreSaleContext";
import { cn } from "../utils";

function CardItem({ item, className }) {
  const { showPurchase, handleSelectPreSale } = usePreSale();
  const { title, image, offer, totalUsdt, totalToken } = item;

  return (
    <div
      className={cn(
        "relative flex-shrink-0 w-[260px] select-none cursor-pointer inline-block transition-all duration-500 overflow-hidden opacity-100 scale-100",
        className
      )}
    >
      <div className="p-4 bg-white border shadow rounded-3xl">
        <p className="w-full mb-2 text-xl font-bold text-center uppercase">
          {title}
        </p>
        <p className="mb-6 text-xl font-medium text-center uppercase">
          {offer}% Off
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
              {totalUsdt} <span className="text-sm">USDT</span>
            </span>
            <span>{totalToken} Token</span>
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
              {showPurchase ? <PurchaseConfirm /> : <PaymentType />}
            </div>
          </Modal.Body>
        </Modal>

        <p className="mt-6 text-center">Limited Time Offer</p>
      </div>
    </div>
  );
}

export default CardItem;
