import { useWallet } from "@txnlab/use-wallet";
import { TransactionSignerAccount } from "@algorandfoundation/algokit-utils/types/account";
import * as algokit from "@algorandfoundation/algokit-utils";
import { useState } from "react";
import { AppDetails } from "@algorandfoundation/algokit-utils/types/app-client";
import { HelloWorldAppClient } from "../contracts/HelloWorldAppClient";
import { Button, Input, Modal } from "react-daisyui";

interface TransactInterface {
  openModal: boolean;
  setModalState: (value: boolean) => void;
}

const Transact = ({ openModal, setModalState }: TransactInterface) => {
  const [hello, setHello] = useState<string | undefined>("");
  const [message, setMessage] = useState<string>("");

  const algod = algokit.getAlgoClient({
    server: import.meta.env.VITE_ALGOD_NODE_CONFIG_SERVER,
    port: import.meta.env.VITE_ALGOD_NODE_CONFIG_PORT,
    token: import.meta.env.VITE_ALGOD_NODE_CONFIG_TOKEN,
  });

  const { signer, activeAddress } = useWallet();

  const helloWord = async () => {
    const indexer = algokit.getAlgoIndexerClient();
    const appDetails = {
      resolveBy: "creatorAndName",
      sender: { signer, addr: activeAddress } as TransactionSignerAccount,
      creatorAddress: import.meta.env.VITE_CREATOR_ADDRESS,
      findExistingUsing: indexer,
    } as AppDetails;

    const appClient = new HelloWorldAppClient(appDetails, algod);

    const response = await appClient.hello({ name: message });
    setHello(response.return);
  };

  return (
    <Modal open={openModal}>
      <Modal.Header className="font-bold">
        Hello message
      </Modal.Header>

      <Modal.Body>
        <div className="flex w-full component-preview p-4 items-center justify-center gap-2 font-sans">
          <Input onChange={(e) => setMessage(e.target.value)} />
        </div>
        <p>{hello}</p>
      </Modal.Body>

      <Modal.Actions>
        <Button onClick={helloWord}>Call hello</Button>

        <Button
          onClick={() => {
            setModalState(!openModal);
          }}
        >
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default Transact;
