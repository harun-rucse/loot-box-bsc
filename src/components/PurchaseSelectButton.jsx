import { usePreSale } from "../context/PreSaleContext";

function PurchaseSelectButton({ item, handleSelect }) {
  const { selectedPaymentType } = usePreSale();
  const { title, image, newPrice, oldPrice, offer } = item;

  return (
    <button
      className="flex text-left justify-between items-center px-5 py-2.5 w-full h-auto text-lg transition-all hover:bg-[#d7f4fb]"
      type="button"
      onClick={handleSelect}
    >
      <div className="flex items-center gap-2">
        <img src={image} alt={title} className="object-contain w-8 h-8" />
        <div className="flex flex-col">
          <span>{title}</span>
          <span className="text-xs">
            {`${newPrice} ${selectedPaymentType.name}`} |{" "}
            <span className="line-through">{`${oldPrice} ${selectedPaymentType.name}`}</span>{" "}
            ({offer}% OFF)
          </span>
        </div>
      </div>
    </button>
  );
}

export default PurchaseSelectButton;
