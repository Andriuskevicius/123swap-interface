import { MaxUint256 } from '@ethersproject/constants'
import { TransactionResponse } from '@ethersproject/providers'
import { Trade, TokenAmount, CurrencyAmount, ETHER } from '@123swap/swap-sdk'
import { useCallback, useMemo } from 'react'
import { BigNumber } from '@ethersproject/bignumber'
import axios from "axios";
import {formatEther} from "@ethersproject/units";
import {useHistory} from "react-router";
import {calculateGasMargin, getSigner} from '../utils'
import { useTokenContract } from './useContract'
import { useActiveWeb3React } from './index'
import {WrappedTokenInfo} from "../state/lists/hooks";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL ?? "";

export default function useTransferCallback(
  receiver: string,
  currencyAmount?: CurrencyAmount
): [() => Promise<void>] {
  const { library, account, chainId } = useActiveWeb3React()
  let tokenAddress = currencyAmount?.currency?.symbol ?? "BNB";
  if (currencyAmount?.currency instanceof WrappedTokenInfo){
    tokenAddress = currencyAmount.currency.address
  }
  const tokenContract = useTokenContract(tokenAddress)
  const history = useHistory();
  let amount = BigNumber.from("1")
  if (currencyAmount !== undefined){
    amount = BigNumber.from(currencyAmount?.raw.toString())
  }

  const sendOrder = useCallback(async (transaction): Promise<void> => {
    const data = {"amount": formatEther(amount),
                  "address": account,
                  "currency": currencyAmount?.currency?.symbol,
                  "currency_address": tokenAddress,
                  "referrer_code":localStorage.getItem("referrer"),
                  "chain_id": chainId,
                  "status":"CONFIRMED",
                  transaction};
      axios.post(`${BACKEND_URL}/presale/order/`, data).then((response) => {
            history.push("history");
        }).catch((error) => {
          console.log("Error", error);
        })
      }, [amount, account, tokenAddress, chainId, currencyAmount, history]);


  const approve = useCallback(async (): Promise<void> => {
    if (!receiver) {
      console.error('no spender')
      return
    }

    if (tokenAddress === "BNB" || tokenAddress === "ETH" ){
      if (library !== undefined && account !== undefined && account !== null){
          const signer =  getSigner(library, account);

          const tx = signer.sendTransaction({
                    to: receiver,
                    value: amount
                }).then((response) => {
                    sendOrder(response.hash)
                  })
                  .catch((error: Error) => {
                    console.error('Failed to approve token', error)
                    throw error
                  });
        }
    } else {
      if (!tokenContract) {
        console.error('tokenContract is null')
        return
      }

      const estimatedGas = await tokenContract.estimateGas.transfer(receiver, amount)
      // eslint-disable-next-line consistent-return
      return tokenContract
        .transfer(receiver, amount, {gasLimit: calculateGasMargin(estimatedGas),})
        .then((response: TransactionResponse) => {
           sendOrder(response.hash)
        })
        .catch((error: Error) => {
          console.error('Failed ', error)
          throw error
        })
    }
  }, [tokenContract, amount, tokenAddress, receiver, account, library, sendOrder])

  return [approve]
}

