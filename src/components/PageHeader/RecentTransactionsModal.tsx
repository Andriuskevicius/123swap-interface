import React, { useMemo } from 'react'
import { CheckmarkCircleIcon, ErrorIcon, Flex, LinkExternal, Text, Modal, Button } from '@123swap/uikit'
import styled from "styled-components";
import { useActiveWeb3React } from 'hooks'
import { getBscScanLink } from 'utils'
import { isTransactionRecent, useAllTransactions } from 'state/transactions/hooks'
import { TransactionDetails } from 'state/transactions/reducer'
import Loader from 'components/Loader'

type RecentTransactionsModalProps = {
  onDismiss?: () => void
  translateString: (translationId: number, fallback: string) => string
}

// TODO: Fix UI Kit typings
const defaultOnDismiss = () => null

const newTransactionsFirst = (a: TransactionDetails, b: TransactionDetails) => b.addedTime - a.addedTime

const getRowStatus = (sortedRecentTransaction: TransactionDetails) => {
  const { hash, receipt } = sortedRecentTransaction

  if (!hash) {
    return { icon: <Loader />, color: 'text' }
  }

  if (hash && receipt?.status === 1) {
    return { icon: <CheckmarkCircleIcon color="success" />, color: 'success' }
  }

  return { icon: <ErrorIcon color="failure" />, color: 'failure' }
}

const RecentTransactionsModal = ({ onDismiss = defaultOnDismiss, translateString }: RecentTransactionsModalProps) => {
  const { account, chainId } = useActiveWeb3React()
  const allTransactions = useAllTransactions()

  // Logic taken from Web3Status/index.tsx line 175
  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions)
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
  }, [allTransactions])

const StyledFlex = styled(Flex)`
  background: ${({ theme }) => theme.colors.inputSecondary};
  border-radius: 8px;
  padding-top: 5px;

`

const StyledModal = styled(Modal)`
  max-width: 90%;

  @media (min-width: 768px) { {
    min-width: 600px;
  }

`

  return (
    <StyledModal title={translateString(1202, 'Recent transactions')} onDismiss={onDismiss}>
      {!account && (
        <StyledFlex justifyContent="center" flexDirection="column" alignItems="center" borderRadius="8px">
          <Text m="15px" bold>
            Please connect your wallet to view your recent transactions
          </Text>
        </StyledFlex>
      )}
      {account && chainId && sortedRecentTransactions.length === 0 && (
        <StyledFlex justifyContent="center" flexDirection="column" alignItems="center">
          <Text mb="8px" bold>
            No recent transactions
          </Text>
        </StyledFlex>
      )}
      {account &&
        chainId &&
        sortedRecentTransactions.map((sortedRecentTransaction) => {
          const { hash, summary } = sortedRecentTransaction
          const { icon, color } = getRowStatus(sortedRecentTransaction)

          return (
            <>
              <Flex key={hash} alignItems="center" justifyContent="space-between" mb="4px">
                <LinkExternal href={getBscScanLink(chainId, hash, 'transaction')} color={color}>
                  {summary ?? hash}
                </LinkExternal>
                {icon}
              </Flex>
            </>
          )
        })}
    </StyledModal>
  )
}

export default RecentTransactionsModal
