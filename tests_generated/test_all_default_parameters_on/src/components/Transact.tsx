import { DEFAULT_NODE_BASEURL, DEFAULT_NODE_PORT, DEFAULT_NODE_TOKEN, useWallet } from '@txnlab/use-wallet'
import * as algokit from '@algorandfoundation/algokit-utils'
import { useState } from 'react'
import algosdk from 'algosdk'
import { useSnackbar } from 'notistack'

interface TransactInterface {
  openModal: boolean
  setModalState: (value: boolean) => void
}

const Transact = ({ openModal, setModalState }: TransactInterface) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [receiverAddress, setReceiverAddress] = useState<string>('')

  const algodClient = algokit.getAlgoClient({
    server: import.meta.env.VITE_ALGOD_NODE_CONFIG_SERVER ?? DEFAULT_NODE_BASEURL,
    port: import.meta.env.VITE_ALGOD_NODE_CONFIG_PORT ?? DEFAULT_NODE_PORT,
    token: import.meta.env.VITE_ALGOD_NODE_CONFIG_TOKEN ?? DEFAULT_NODE_TOKEN,
  })

  const { enqueueSnackbar } = useSnackbar()

  const { signer, activeAddress, signTransactions, sendTransactions } = useWallet()

  const handleSubmitAlgo = async () => {
    setLoading(true)

    if (!signer || !activeAddress) {
      enqueueSnackbar('Please connect wallet first', { variant: 'warning' })
      return
    }

    const suggestedParams = await algodClient.getTransactionParams().do()

    const transaction = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      from: activeAddress,
      to: receiverAddress,
      amount: 1e6,
      suggestedParams,
    })

    const encodedTransaction = algosdk.encodeUnsignedTransaction(transaction)

    const signedTransactions = await signTransactions([encodedTransaction])

    const waitRoundsToConfirm = 4

    try {
      enqueueSnackbar('Sending transaction...', { variant: 'info' })
      const { id } = await sendTransactions(signedTransactions, waitRoundsToConfirm)
      enqueueSnackbar(`Transaction sent: ${id}`, { variant: 'success' })
      setReceiverAddress('')
    } catch (e) {
      enqueueSnackbar('Failed to send transaction', { variant: 'error' })
    }

    setLoading(false)
  }

  return (
    <dialog id="transact_modal" className={`modal ${openModal ? 'modal-open' : ''} bg-slate-200`}>
      <form method="dialog" className="modal-box">
        <h3 className="font-bold text-lg">Send payment transaction</h3>
        <br />
        <input
          type="text"
          placeholder="Provide wallet address"
          className="input input-bordered w-full"
          value={receiverAddress}
          onChange={(e) => {
            setReceiverAddress(e.target.value)
          }}
        />
        <div className="modal-action ">
          <button className="btn" onClick={() => setModalState(!openModal)}>
            Close
          </button>
          <button className={`btn ${receiverAddress.length === 58 ? '' : 'btn-disabled'} lo`} onClick={handleSubmitAlgo}>
            {loading ? <span className="loading loading-spinner" /> : 'Send 1 Algo'}
          </button>
        </div>
      </form>
    </dialog>
  )
}

export default Transact
