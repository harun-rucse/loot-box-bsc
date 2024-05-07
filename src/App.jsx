import { Toaster } from "react-hot-toast";
import Card from "./components/Card";
import Header from "./components/Header";
import { PreSaleProvider } from "./context/PreSaleContext";

import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";

// 1. Get projectId
const projectId = "862e2544b694a246addaff50ba2ab87e";

// 2. Set chains
const mainnet = {
  chainId: 1,
  name: "Ethereum",
  currency: "ETH",
  explorerUrl: "https://etherscan.io",
  rpcUrl: "https://cloudflare-eth.com",
};

const sepolia = {
  chainId: 11155111,
  name: "Sepolia",
  currency: "ETH",
  explorerUrl: "https://rpc.sepolia.org",
  rpcUrl: "https://1rpc.io/sepolia",
};

// 3. Create a metadata object
const metadata = {
  name: "My Website",
  description: "My Website description",
  url: "https://mywebsite.com", // origin must match your domain & subdomain
  icons: ["https://avatars.mywebsite.com/"],
};

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,

  /*Optional*/
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
  rpcUrl: "...", // used for the Coinbase SDK
  defaultChainId: 1, // used for the Coinbase SDK
});

// 5. Create a Web3Modal instance
createWeb3Modal({
  ethersConfig,
  chains: [sepolia],
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
});

export default function App() {
  return (
    <PreSaleProvider>
      <div className="container lg:max-w-7xl mx-auto px-3 lg:px-0 pb-10">
        <Header />
        <Card />
        <Toaster containerStyle={{ zIndex: 999999 }} />
      </div>
    </PreSaleProvider>
  );
}
