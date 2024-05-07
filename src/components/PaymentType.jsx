import { usePreSale } from "../context/PreSaleContext";

function PaymentType() {
  const { paymentTypesData: items, handleSelectPayment } = usePreSale();

  return (
    <div className="m-6 p-4 border rounded-xl shadow">
      <div className="flex items-center gap-4">
        <img
          src="/images/apemax_coin.png"
          alt=""
          className="w-12 object-contain"
        />
        <h3 className="text-2xl font-medium">Pay in which crypto?</h3>
      </div>

      <div className="mt-5 space-y-4">
        {items.length > 0 &&
          items.map((item, i) => (
            <button
              key={i}
              className="w-full flex items-center gap-4 px-2 py-2 bg-[#acf0ff] border-[5px] border-[#d7f7ff] rounded-xl text-center transition-all hover:bg-[#338afc] hover:border-[#338afc] hover:text-white"
              onClick={() => handleSelectPayment(item)}
            >
              <img src={item?.image} alt={item?.name} className="w-8" />
              <span className="text-lg">Pay with {item?.name}</span>
            </button>
          ))}
      </div>
    </div>
  );
}

export default PaymentType;
