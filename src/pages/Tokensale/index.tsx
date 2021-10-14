import React, { useContext, useMemo, useCallback, useState, useEffect } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { Pair, CurrencyAmount } from '@123swap/swap-sdk'
import axios from "axios";
import { maxAmountSpend } from 'utils/maxAmountSpend'
import { Heading, Text, Flex, CardBody, Button } from '@123swap/uikit'
import useTransferCallback from 'hooks/useTransferCallback';
import ConnectWalletButton from 'components/ConnectWalletButton'
import { useTokenBalancesWithLoadingIndicator } from 'state/wallet/hooks'
import TokensaleCardNav from 'components/TokensaleCardNav'
import { StyledInternalLink } from 'components/Shared'
import { LightCard } from 'components/Card'
import { RowBetween } from 'components/Row'
import { AutoColumn } from 'components/Column'

import { useActiveWeb3React } from 'hooks'
import { usePairs } from 'data/Reserves'
import { toV2LiquidityToken, useTrackedTokenPairs } from 'state/user/hooks'
import useI18n from 'hooks/useI18n'
import AppBody from '../AppBody'
import CurrencyInputPanel from "../../components/CurrencyInputPanel/index";
import {tryParseAmount, useDerivedSwapInfo, useSwapState} from "../../state/swap/hooks";
import {calculateTokenAmount, calculateMinimumAmountValue} from "../../utils/prices";

const StyledPageHeader = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  padding: 24px;
`

const Details = styled.div`
  flex: 1;
`

const PRESALE_RECEIVER_ADDRESS = process.env.REACT_APP_PRESALE_RECEIVER_ADDRESS ?? ""
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL ?? ""

export default function Tokensale() {
  const theme = useContext(ThemeContext)
  const { account } = useActiveWeb3React()
  const TranslateString = useI18n()

    const [amount, setAmount] = useState("0");
    const [tokenAmount, setTokenAmount] = useState(0);
    const [prices, setPrices] = useState([]);
    const [minimumAmount, setMinimumAmount] = useState(133333);
    const [minimumAmountValue, setMinimumAmountValue] = useState("0");
    const [maximumAmount, setMaximumAmount] = useState(18000000);

    useEffect(() => {
      axios.get(`${BACKEND_URL}/presale/prices`).then((response) => {
        setPrices(response.data);
      }).catch((error) => {
        console.log("Error", error);
      })
    }, []);

  const trackedTokenPairs = useTrackedTokenPairs()
  const tokenPairsWithLiquidityTokens = useMemo(
    () => trackedTokenPairs.map((tokens) => ({ liquidityToken: toV2LiquidityToken(tokens), tokens })),
    [trackedTokenPairs]
  )
  const liquidityTokens = useMemo(() => tokenPairsWithLiquidityTokens.map((tpwlt) => tpwlt.liquidityToken), [
    tokenPairsWithLiquidityTokens,
  ])
  const [v2PairsBalances, fetchingV2PairBalances] = useTokenBalancesWithLoadingIndicator(
    account ?? undefined,
    liquidityTokens
  )

  // fetch the reserves for all V2 pools in which the user has a balance
  const liquidityTokensWithBalances = useMemo(
    () =>
      tokenPairsWithLiquidityTokens.filter(({ liquidityToken }) =>
        v2PairsBalances[liquidityToken.address]?.greaterThan('0')
      ),
    [tokenPairsWithLiquidityTokens, v2PairsBalances]
  )

  const v2Pairs = usePairs(liquidityTokensWithBalances.map(({ tokens }) => tokens))
  const v2IsLoading =
    fetchingV2PairBalances || v2Pairs?.length < liquidityTokensWithBalances.length || v2Pairs?.some((V2Pair) => !V2Pair)

  const allV2PairsWithLiquidity = v2Pairs.map(([, pair]) => pair).filter((v2Pair): v2Pair is Pair => Boolean(v2Pair))

  const { independentField, typedValue, recipient } = useSwapState()
  const { v2Trade, currencyBalances, parsedAmount, currencies, inputError: swapInputError } = useDerivedSwapInfo()
    const maxAmountInput: CurrencyAmount | undefined = maxAmountSpend(currencyBalances.INPUT)

    const [currency, setCurrency] = useState(currencies.INPUT);

  const handleInputSelect = useCallback(
    (inputCurrency) => {
      setCurrency(inputCurrency)
      const ta = calculateTokenAmount(amount, inputCurrency, prices)
      setTokenAmount(ta)
    },
    [setCurrency, setTokenAmount, amount, prices]
  );

  const handleMaxInput = useCallback(() => {
    if (maxAmountInput) {
        setAmount(maxAmountInput.toFixed())
    }
  }, [maxAmountInput, setAmount])

  const handleTypeInput = useCallback(
    (value: string) => {
      setAmount(value)
      const ta = calculateTokenAmount(value, currency, prices)
      setTokenAmount(ta)
        const mav = calculateMinimumAmountValue(value, currency, prices).toPrecision(5)
      setMinimumAmountValue(mav)
    },
    [setAmount, setTokenAmount, currency, prices, setMinimumAmountValue]
  )

  const currencyAmount = tryParseAmount(amount, currency);

  const [approveACallback] = useTransferCallback(PRESALE_RECEIVER_ADDRESS, currencyAmount);
    
  return (
    <>
      <TokensaleCardNav />
      <AppBody>
        <StyledPageHeader>
          <Flex alignItems="center">
            <Details>
              <Heading mb="8px">Tokensale (PRIVATE)</Heading>
                <Text color="textSubtle" fontSize="14px">
                   Minimum buy amount 133333 tokens
                </Text>
                <Text color="textSubtle" fontSize="14px">
                  Maximum (total amount) is limited to 18.000.000 tokens
                </Text>
                <Text color="textSubtle" fontSize="14px">
                  Buy private sale tokens now for $0.075 per token
                </Text>

            </Details>
          </Flex>
        </StyledPageHeader>
      <CardBody>
        <AutoColumn gap="md">
            <CurrencyInputPanel
                    label={TranslateString(194, 'Amount')}
                    value={amount}
                    showMaxButton={false}
                    currency={currency}
                    onUserInput={handleTypeInput}
                    onMax={handleMaxInput}
                    onCurrencySelect={handleInputSelect}
                    otherCurrency={currencies.OUTPUT}
                    includedTokenList={["0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
                        "0x0dE8FCAE8421fc79B29adE9ffF97854a424Cad09",
                        "0xdAC17F958D2ee523a2206206994597C13D831ec7",
                        "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
                        "0x55d398326f99059fF775485246999027B3197955",
                        "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
                        "0x4Fabb145d64652a948d72533023f6E7A623C7C53",
                        "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",]}

                    id="swap-currency-input"
                  />
                {!account ? (
                    <ConnectWalletButton width="100%" />
                ) : !currency ? (
                    <Button id="join-pool-button" disabled>{TranslateString(168, 'Select currency')}</Button>
                ) : !currencyAmount ? (
                    <Button id="join-pool-button" disabled>{TranslateString(168, 'Enter an amount')}</Button>
                ) : (minimumAmount > tokenAmount) ? (
                    <Button id="join-pool-button" disabled>{TranslateString(168, `Amount has to bee at least ${minimumAmountValue}`)}</Button>
                ) : (maximumAmount < tokenAmount) ? (
                    <Button id="join-pool-button" disabled>{TranslateString(168, `Token amount can't reach ${maximumAmount}`)}</Button>
                ) : (
                    <Button id="join-pool-button" onClick={approveACallback}>{TranslateString(168, 'Buy tokens')}</Button>
                )}

            <RowBetween align="center">
                <Text fontSize="16px">{TranslateString(88, 'Token amount')}</Text>
                <Text fontSize="16px">{tokenAmount}</Text>
              </RowBetween>
            </AutoColumn>
        </CardBody>
      </AppBody>
    </>
  )
}
