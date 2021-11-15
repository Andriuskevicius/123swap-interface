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
    const [isMinimumBought, setIsMinimumBought] = useState(false);

    useEffect(() => {
      axios.get(`${BACKEND_URL}/presale/prices`).then((response) => {
        setPrices(response.data);
      }).catch((error) => {
        console.log("Error", error);
      })
    }, []);

     useEffect(() => {
      axios.get(`${BACKEND_URL}/presale/order/?address=${account}`).then((response) => {
          const allOrders = response.data as Array<any>;
          if (allOrders.length){
            const totalTokens = allOrders.map( function(elt){ // assure the value can be converted into an integer
              return parseFloat(elt.token_amount) ?? 0;
            }).reduce((a, b) => a + b, 0);
            if (totalTokens >= 133000){
                setIsMinimumBought(true)
            }
          }
      }).catch((error) => {
        console.log("Error", error);
      })
    }, [account, setIsMinimumBought]);

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
                        "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
                        "0xaD6D458402F60fD3Bd25163575031ACDce07538D",
                        "0x19860CCB0A68fd4213aB9D8266F7bBf05A8dDe98",
                        "0xc7198437980c041c805A1EDcbA50c1Ce5db95118",
                        "0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664",
                        "0x049d68029688eAbF473097a2fC38ef61633A3C7A",
                        "0x04068DA6C83AFCFA0e13ba15A6696662335D5B75",
                        "0xB44a9B6905aF7c801311e8F4E76932ee959c663C",
                        "0x5D9ab5522c64E1F6ef5e3627ECCc093f56167818",
                        "0xE3F5a90F9cb311505cd691a46596599aA1A0AD7D",
                        "0x0aB43550A6915F9f67d0c454C2E90385E6497EaA",
                        "0x985458E523dB3d53125813eD68c274899e9DfAb4",
                        "0x3C2B8Be99c50593081EAA2A724F0B8285F5aba8f"]}
                    id="swap-currency-input"
                  />
                {!account ? (
                    <ConnectWalletButton width="100%" />
                ) : !currency ? (
                    <Button id="join-pool-button" disabled>{TranslateString(168, 'Select currency')}</Button>
                ) : !currencyAmount ? (
                    <Button id="join-pool-button" disabled>{TranslateString(168, 'Enter an amount')}</Button>
                ) : ((minimumAmount > tokenAmount) && !isMinimumBought)? (
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
