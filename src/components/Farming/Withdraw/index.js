import React, { useState, useRef } from 'react'
import { Button, TransactionProgress } from '@1hive/1hive-ui'
import { useWithdraw } from '../../../hooks/useWithdraw'
import { getNetworkConfig } from '../../../networks'
import { buttonGreenCss, buttonGrayCss } from '../styles'
import { useWallet } from 'use-wallet'

const Withdraw = props => {
  const {
    _web3ReactContext: { chainId },
  } = useWallet()
  const [visible, setVisible] = useState(false)
  const [txHash, setTxHash] = useState('')
  const opener = useRef()
  const withdraw = useWithdraw(props.id, chainId)
  const network = getNetworkConfig(chainId)

  const buttonCss = () => {
    if (props.disabled) {
      return buttonGrayCss
    }
    return buttonGreenCss
  }
  const transactionTime = new Date()
  transactionTime.setSeconds(transactionTime.getSeconds() + 8)

  const handleWithdraw = () => {
    withdraw()
      .then(x => {
        if (x) {
          setTxHash(x.hash)
          setVisible(true)
          x.wait()
            .then(() => {
              setVisible(false)
            })
            .catch(err => {
              props.onError(err)
            })
        }
      })
      .catch(err => {
        props.onError(err)
      })
  }
  return (
    <>
      <TransactionProgress
        transactionHash={txHash}
        transactionHashUrl={network.txUrl + txHash}
        progress={1}
        visible={visible}
        endTime={transactionTime}
        onClose={() => setVisible(false)}
        opener={opener}
        slow={false}
      />
      <Button
        disabled={props.disabled}
        css={buttonCss}
        onClick={() => {
          handleWithdraw()
        }}
        label="Withdraw"
        wide
        ref={opener}
      />
    </>
  )
}

export default Withdraw
