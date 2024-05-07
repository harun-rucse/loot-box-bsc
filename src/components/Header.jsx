import toast from "react-hot-toast";
import { useWeb3Modal } from "@web3modal/ethers/react";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";

function Header() {
  const { open } = useWeb3Modal();
  const { address, chainId, isConnected } = useWeb3ModalAccount();

  function handleConnect() {
    console.log("Connect");
    toast.success("Connected");
  }

  return (
    <header className="flex items-center flex-col lg:flex-row justify-between py-6 gap-4 lg:gap-0">
      <div className="flex">
        <img
          src="/images/apemax_rocket.png"
          alt="Logo"
          className="w-20 h-20 object-contain hidden lg:block"
        />
        <div className="flex items-center justify-between">
          <img
            src="/images/svgexport-1.svg"
            alt=""
            className="w-8 h-8 object-contain self-start"
          />
          <div className="font-bold">
            <span className="text-[#acf0ff] text-5xl uppercase drop-shadow-[-1px_2px_1px_#000000]">
              LootBox
            </span>
          </div>
          <img
            src="/images/svgexport-2.svg"
            alt=""
            className="w-8 h-8 object-contain self-end"
          />
        </div>
      </div>
      <button
        className="w-full py-3 text-lg font-bold transition-all bg-white shadow lg:w-56 rounded-2xl hover:bg-[#338afc] hover:text-white"
        onClick={isConnected ? () => open("Account") : () => open("Connect")}
      >
        {isConnected
          ? address.slice(0, 6) + "***" + address.slice(-4)
          : "Connect Wallet"}
      </button>
    </header>
  );
}

export default Header;
