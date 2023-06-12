import { useWallet } from "@txnlab/use-wallet";

const Account = () => {
  const { activeAddress, isReady, isActive } = useWallet();
  return (    
    <div>
      <div>Address: {activeAddress}</div>
      <div>Ready: {!!isReady ? "Yes" : "No"}</div>
      <div>Active: {!!isActive ? "Yes" : "No"}</div>
    </div>
  );
}

export default Account;
