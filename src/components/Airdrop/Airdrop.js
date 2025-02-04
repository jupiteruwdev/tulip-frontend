import React, { useRef, useState } from 'react'
import {
  Button,
  Card,
  GU,
  textStyle,
  TransactionProgress,
  useViewport,
} from '@1hive/1hive-ui'
import PlaceHolder from './PlaceHolder'
import { getNetworkConfig } from '../../networks'
import { useClaim } from '../../hooks/useAirdrop'
import { useWallet } from 'use-wallet'
import xCombImage from '../../assets/tulip/xComb.svg'

const Airdrop = React.memo(() => {
  const [visible, setVisible] = useState(false)
  const {
    status,
    _web3ReactContext: { chainId },
  } = useWallet()
  const { width: vw, below } = useViewport()
  const small = below('medium')
  const opener = useRef()
  const [balance, claim, claimed, tokens, txHash, working] = useClaim()
  const networks = getNetworkConfig(chainId)

  let tokenImage = xCombImage
  let tokenName = 'xComb'
  if (networks.token) {
    tokenImage = networks.token.image
    tokenName = networks.token.name
  }

  if (working !== visible) {
    setVisible(working)
  }
  const transactionTime = new Date()
  transactionTime.setSeconds(transactionTime.getSeconds() + 8)

  return status === 'connected' ? (
    <>
      <TransactionProgress
        transactionHashUrl={`${networks.txUrl + txHash.hash}`}
        progress={1}
        visible={visible}
        endTime={transactionTime}
        onClose={() => setVisible(false)}
        opener={opener}
        slow={false}
      />
      <div
        css={`
          padding-top: ${small ? 3 * GU : 8 * GU}px;
          display: flex;
          flex-direction: column;
          align-items: center;
        `}
        ref={opener}
      >
        <Card width={small ? vw - 3 * GU : 58.2 * GU} height={67.5 * GU}>
          <span
            css={`
              ${textStyle('title3')};
              font-family: Overpass;
              font-weight: 700;
            `}
          >
            Claim your {tokenName} Airdrop
          </span>
          <span
            css={`
              padding: ${small
                ? `${GU}px ${2 * GU}px 0 ${3 * GU}px;`
                : `${GU}px ${3 * GU}px 0 ${4 * GU}px`};
              ${textStyle('body2')};
              font-weight: 300;
              margin-top: ${2 * GU}px;
            `}
          >
            Welcome to 1Hive's automated investment strategies platform,
            qualifying addresses are eligible to claim {tokenName} tokens.
          </span>
          <Card
            height={6.25 * GU}
            width={small ? vw - 4.5 * GU : 52 * GU}
            css={`
              margin-top: ${3 * GU}px;
            `}
          >
            <div
              css={`
                display: flex;
                flex-direction: row;
                width: 100%;
                justify-content: space-between;
                padding: 0 ${2.5 * GU}px 0 ${2.5 * GU}px;
              `}
            >
              <span
                css={`
                  align-self: center;
                  font-weight: 300;
                `}
              >
                Unclaimed {tokenName}
              </span>
              <div
                css={`
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                `}
              >
                <img height={25} src={tokenImage} />
                <span
                  css={`
                    margin-left: ${GU}px;
                    font-family: Overpass;
                    ${textStyle('title3')};
                    font-weight: 700;
                  `}
                >
                  {tokens}
                </span>
              </div>
            </div>
          </Card>
          <div
            css={`
              display: flex;
              flex-direction: column;
              width: ${small ? vw - 4.5 * GU : 52 * GU}px;
              padding: 0 ${2.5 * GU}px 0 ${2.5 * GU}px;
              margin-top: ${3 * GU}px;
              font-weight: 300;
            `}
          >
            <div
              css={`
                display: flex;
                flex-direction: row;
                justify-content: space-between;
              `}
            >
              <span>Available to Claim</span>
              <span>{claimed}</span>
            </div>
            <div
              css={`
                margin-top: ${GU}px;
                height: ${0.125 * GU}px;
                width: 100%;
                background-color: #efefef;
              `}
            />
            <div
              css={`
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                margin-top: ${GU}px;
              `}
            >
              <span>Balance</span>
              <span>{balance}</span>
            </div>
          </div>
          <span
            css={`
              color: #0792af;
              margin-top: ${4 * GU}px;
              width: ${small ? vw - 4.5 * GU : 52 * GU}px;
              padding: 0 ${2.5 * GU}px 0 ${2.5 * GU}px;
              font-family: Overpass;
              font-weight: 300;
              ${textStyle('body3')};
            `}
          >
            <b>NOTE:</b> Your tokens are vested in the contract and will be
            released linearly with time. You can withdraw and use your released
            anytime. Come back later and there will be more tokens released for
            you to claim until the full balance is claimed.
          </span>
          <Button
            css={`
              margin-top: ${GU * 3}px;
              /* background colors doesn't exist on current theme */
              background: linear-gradient(90deg, #aaf5d4, #7ce0d6);
              width: ${GU * 22}px;
              height: ${GU * 5}px;
            `}
            id="Claim"
            label="Claim"
            onClick={() => {
              claim()
            }}
          />
        </Card>
      </div>
    </>
  ) : (
    <PlaceHolder />
  )
})

export default Airdrop
