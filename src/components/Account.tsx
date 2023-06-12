import { useWallet } from '@txnlab/use-wallet'
import { ellipseAddress } from '../utils/ellipseAddress'

const Account = () => {
  const { activeAddress } = useWallet()
  return (
    <div>
      <div className="text-xl">Address: {ellipseAddress(activeAddress)}</div>
    </div>
  )
}

export default Account
