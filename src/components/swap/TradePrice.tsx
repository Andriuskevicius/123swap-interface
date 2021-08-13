
import React from 'react'
import { Price } from '@123swap/swap-sdk'
import { SyncAltIcon, Text } from '@123swap/uikit'
import invert from "polished/lib/color/invert";
import { StyledBalanceMaxMini } from './styleds'
import {renderCurSymbol} from "../../utils/index";

interface TradePriceProps {
  price?: Price
  showInverted: boolean
  setShowInverted: (showInverted: boolean) => void
}

export default function TradePrice({ price, showInverted, setShowInverted }: TradePriceProps) {
  const formattedPrice = showInverted ? price?.toSignificant(6) : price?.invert()?.toSignificant(6)

  const show = Boolean(price?.baseCurrency && price?.quoteCurrency)
  const label = showInverted
    ? `${renderCurSymbol(price?.quoteCurrency?.symbol)} per ${renderCurSymbol(price?.baseCurrency?.symbol)}`
    : `${renderCurSymbol(price?.baseCurrency?.symbol)} per ${renderCurSymbol(price?.quoteCurrency?.symbol)}`

  return (
    <Text fontSize="14px" style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
      {show ? (
        <>
          {formattedPrice ?? '-'} {label}
          <StyledBalanceMaxMini onClick={() => setShowInverted(!showInverted)}>
            <SyncAltIcon width="20px" color="primary" />
          </StyledBalanceMaxMini>
        </>
      ) : (
        '-'
      )}
    </Text>
  )
}
