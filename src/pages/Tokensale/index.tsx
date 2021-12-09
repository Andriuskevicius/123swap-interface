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
    const TOKEN_PRICE = 0.12;
    const MINIMUM_AMOUNT = 8333;
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
                <Text color="textSubtle" fontSize="16px">
                   Private sale ongoing <a style={{color: "#f7941e", fontWeight: 500}} href="mailto:ceo@123swap.finance">ceo@123swap.finance</a>
                </Text>
            </Details>
          </Flex>
        </StyledPageHeader>
      </AppBody>
    </>
  )
}
