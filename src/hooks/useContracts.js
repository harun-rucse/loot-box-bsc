import { BrowserProvider, Contract, formatUnits, parseUnits } from "ethers";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from "@web3modal/ethers/react";
import toast from "react-hot-toast";
import {
  LOOTBOX_CONTRACT_ABI,
  LOOTBOX_CONTRACT_ADDRESS,
  USDT_CONTRACT_ADDRESS,
  USDT_CONTRACT_ABI,
  USDC_CONTRACT_ADDRESS,
} from "../contracts/contracts";

function useContracts() {
  const { walletProvider } = useWeb3ModalProvider();
  const { address } = useWeb3ModalAccount();

  const getProvider = () => {
    return new BrowserProvider(walletProvider);
  };
  const getSigner = async (provider) => {
    return provider.getSigner();
  };

  const getContract = async (address, abi, signer) => {
    const contract = new Contract(address, abi, signer);
    return contract;
  };

  const getLootBoxes = async () => {
    // 1. Get provider
    const provider = getProvider();

    // 2. Get signer
    const signer = await getSigner(provider);

    // 3. Get contract
    const contract = await getContract(
      LOOTBOX_CONTRACT_ADDRESS,
      LOOTBOX_CONTRACT_ABI,
      signer
    );

    try {
      const lootBoxes = await contract.getLootBoxes();
      return lootBoxes;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const getPayAmount = async (token, amount) => {
    // 1. Get provider
    const provider = getProvider();

    // 2. Get signer
    const signer = await getSigner(provider);

    // 3. Get contract
    const contract = await getContract(
      LOOTBOX_CONTRACT_ADDRESS,
      LOOTBOX_CONTRACT_ABI,
      signer
    );

    try {
      const payAmount = await contract.getPayAmount(token, amount);
      return payAmount;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  const buyLotteryLootBox = async (index, token, amount) => {
    // 1. Get provider
    const provider = getProvider();

    // 2. Get signer
    const signer = await getSigner(provider);

    // 3. Get contract
    const contract = await getContract(
      LOOTBOX_CONTRACT_ADDRESS,
      LOOTBOX_CONTRACT_ABI,
      signer
    );

    if (token === "0x0000000000000000000000000000000000000000") {
      try {
        const tx = await contract.buyLootBox(index, token, {
          value: parseUnits(amount.toString(), "ether"),
        });
        await tx.wait();
        toast.success("Purchase successful");
      } catch (error) {
        toast.error("Purchase failed");
      }
    } else if (token === USDT_CONTRACT_ADDRESS) {
      // buy with usdt

      // 4. Get USDT contract
      const usdtContract = await getContract(
        USDT_CONTRACT_ADDRESS,
        USDT_CONTRACT_ABI,
        signer
      );

      // approve payamount to contract && buy lootbox
      try {
        const approveTx = await usdtContract.approve(
          LOOTBOX_CONTRACT_ADDRESS,
          parseUnits(amount.toString(), "ether")
        );
        await approveTx.wait();

        const tx = await contract.buyLootBox(index, token, {
          value: 0,
        });
        await tx.wait();

        toast.success("Purchase successful");
      } catch (error) {
        console.log(error);
        toast.error("Approve failed");
        return;
      }
    } else {
      // buy with usdc
      // 4. Get USDC contract
      const usdcContract = await getContract(
        USDC_CONTRACT_ADDRESS,
        USDT_CONTRACT_ABI,
        signer
      );

      // approve payamount to contract && buy lootbox
      try {
        const approveTx = await usdcContract.approve(
          LOOTBOX_CONTRACT_ADDRESS,
          parseUnits(amount.toString(), "ether")
        );
        await approveTx.wait();

        const tx = await contract.buyLootBox(index, token, {
          value: 0,
        });
        await tx.wait();

        toast.success("Purchase successful");
      } catch (error) {
        console.log(error);
        toast.error("Approve failed");
        return;
      }
    }
  };

  return { getLootBoxes, getPayAmount, buyLotteryLootBox };
}

export default useContracts;
