import { useWallet } from '@txnlab/use-wallet'
import { ellipseAddress } from '../utils/ellipseAddress'
import { getAlgodConfigFromViteEnvironment } from '../utils/network/getAlgoClientConfigs'

const Account = () => {
  const { activeAddress } = useWallet()
  const algoConfig = getAlgodConfigFromViteEnvironment()
  return (
    <div>
      <a
        className="text-xl"
        target="_blank"
        href={`https://${algoConfig.network == 'mainnet' ? '' : `${algoConfig.network}.`}algoexplorer.io/address/${activeAddress}`}
      >
        Address: {ellipseAddress(activeAddress)}
      </a>
      <div className="text-xl">Network: {algoConfig.network}</div>
    </div>
  )
}

export default Account
