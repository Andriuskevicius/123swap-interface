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
import {useHistory} from "react-router";

import { useActiveWeb3React } from 'hooks'
import { usePairs } from 'data/Reserves'
import { toV2LiquidityToken, useTrackedTokenPairs } from 'state/user/hooks'
import useI18n from 'hooks/useI18n'
import AppBody from '../AppBody'
import CurrencyInputPanel from "../../components/CurrencyInputPanel/index";
import {tryParseAmount, useDerivedSwapInfo, useSwapState} from "../../state/swap/hooks";
import {calculateTokenAmount, calculateMinimumAmountValue} from "../../utils/prices";
import { useCurrencyBalance } from '../../state/wallet/hooks';

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
    const TOKEN_PRICE = 0.075;
    const MINIMUM_AMOUNT = 13333;
    const theme = useContext(ThemeContext)
    const { account } = useActiveWeb3React()
    const TranslateString = useI18n()
    const history = useHistory()
    const [amount, setAmount] = useState("0");
    const [tokenAmount, setTokenAmount] = useState(0);
    const [prices, setPrices] = useState([]);
    const [minimumAmount, setMinimumAmount] = useState(MINIMUM_AMOUNT);
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
            if (totalTokens >= MINIMUM_AMOUNT * 0.95) {
                setIsMinimumBought(true)
            }
          }
      }).catch((error) => {
        console.log("Error", error);
      })
    }, [account, setIsMinimumBought]);

  const { independentField, typedValue, recipient } = useSwapState()
  const { v2Trade, currencyBalances, parsedAmount, currencies, inputError: swapInputError } = useDerivedSwapInfo()
    const maxAmountInput: CurrencyAmount | undefined = maxAmountSpend(currencyBalances.INPUT)

    const [currency, setCurrency] = useState(currencies.INPUT);
    const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined);

  const handleInputSelect = useCallback(
    (inputCurrency) => {
      setCurrency(inputCurrency)
      const ta = calculateTokenAmount(amount, inputCurrency, prices, TOKEN_PRICE)
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
      const ta = calculateTokenAmount(value, currency, prices, TOKEN_PRICE)
      setTokenAmount(ta)
        const mav = calculateMinimumAmountValue(minimumAmount, currency, prices, TOKEN_PRICE).toPrecision(5)
      setMinimumAmountValue(mav)
    },
    [setAmount, setTokenAmount, currency, prices, setMinimumAmountValue, minimumAmount]
  )

  const currencyAmount = tryParseAmount(amount, currency);
    const success = () => {
        history.push(`history`)
    };
  const [approveACallback] = useTransferCallback(PRESALE_RECEIVER_ADDRESS, success, currencyAmount);
    
  return (
    <>
      <TokensaleCardNav />
      <AppBody>
        <StyledPageHeader>
          <Flex alignItems="center">
            <Details>
              <Heading mb="8px">Tokensale (PRIVATE)</Heading>
                <Text color="textSubtle" fontSize="14px">
                   Minimum buy amount {MINIMUM_AMOUNT} tokens
                </Text>
                <Text color="textSubtle" fontSize="14px">
                  Maximum (total amount) is limited to 18.000.000 tokens
                </Text>
                <Text color="textSubtle" fontSize="14px">
                  Buy private sale tokens now for ${TOKEN_PRICE} per token
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
                ) : (selectedCurrencyBalance && selectedCurrencyBalance.lessThan(currencyAmount)) ? (
                    <Button id="join-pool-button" disabled>{TranslateString(168, `Not enought balance`)}</Button>
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
