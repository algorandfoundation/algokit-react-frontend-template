import { WalletProvider } from "@txnlab/use-wallet";
import { useAlgoWallet } from "./hooks/useAlgoWalletProvider";
import ConnectWallet from "./components/ConnectWallet";
import Transact from "./components/Transact";
import logo from "./logo.svg";
import { Button} from "react-daisyui";
import { useState } from "react";

export default function App() {
  const [openWalletModal, setOpenWalletModal] = useState<boolean>(false);
  const [openDemoModal, setOpenDemoModal] = useState<boolean>(false);

  const toggleWalletModal = () => {
    setOpenWalletModal(!openWalletModal);
  };

  const toggleDemoModal = () => {
    setOpenDemoModal(!openDemoModal);
  };

  const walletProviders = useAlgoWallet({
    nodeToken: import.meta.env.VITE_ALGOD_NODE_CONFIG_TOKEN,
    nodeServer: import.meta.env.VITE_ALGOD_NODE_CONFIG_SERVER,
    nodePort: import.meta.env.VITE_ALGOD_NODE_CONFIG_PORT,
    network: import.meta.env.VITE_ALGOD_NETWORK,
    autoConnect: true,
  });

  return (
    <>
      {/* <img src={logo} alt="logo" /> */}
      <Button>Learn Algorand</Button>

      <WalletProvider value={walletProviders.walletProviders}>
        <Button onClick={toggleWalletModal}>Connect to Wallet</Button>
        <ConnectWallet openModal={openWalletModal} closeModal={toggleWalletModal}/>

        <Button onClick={toggleDemoModal}>Client Demo</Button>
        <Transact openModal={openDemoModal} setModalState={setOpenDemoModal}/>

      </WalletProvider>
    </>
  );
}
