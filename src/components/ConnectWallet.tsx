import { useWallet } from "@txnlab/use-wallet";
import { useEffect } from "react";
import { Button, Modal } from "react-daisyui";
import Account from "./Account";

interface ConnectWalletInterface {
  openModal: boolean;
  closeModal: () => void;
}

const ConnectWallet = ({ openModal, closeModal }: ConnectWalletInterface) => {
  const { providers, activeAddress } = useWallet();

  useEffect(() => {
    (async () => {
      await Promise.all((providers ?? []).map(async (p) => p.reconnect()));
    })();
  }, [providers]);

  return (
    <Modal open={openModal}>
      <Modal.Header className="font-bold">
        Select the wallet that you will use to sign your transactions.
      </Modal.Header>

      <Modal.Body>
        {providers?.map((provider) => (
          <Button
            key={`provider-${provider.metadata.id}`}
            color="primary"
            onClick={() => {
              return provider.isConnected
                ? provider.setActiveProvider()
                : provider.connect();
            }}
          >
            <img width={30} height={30} alt="" src={provider.metadata.icon} />
            <span>{provider.metadata.name}</span>
          </Button>
        ))}

        <Account />
      </Modal.Body>

      <Modal.Actions>
        {(activeAddress || providers?.find((p) => p.isActive)) && (
          <Button
            onClick={() => {
              providers?.find((p) => p.isActive)?.disconnect();
            }}
          >
            Disconnect
          </Button>
        )}

        <Button
          onClick={() => {
            closeModal();
          }}
        >
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
export default ConnectWallet;
