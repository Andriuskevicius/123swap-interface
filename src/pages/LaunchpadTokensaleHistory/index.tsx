import React, { useContext, useMemo, useCallback, useState, useEffect } from 'react'
import styled, { ThemeContext } from 'styled-components'
import axios from "axios";
import { Heading, Text, Flex, CardBody, LinkExternal } from '@123swap/uikit'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { StyledInternalLink } from 'components/Shared'
import { LightCard } from 'components/Card'
import { RowBetween } from 'components/Row'
import { AutoColumn } from 'components/Column'
import { getBscScanLink } from 'utils'
import {RouteComponentProps} from "react-router-dom";
import { useActiveWeb3React } from 'hooks'
import useI18n from 'hooks/useI18n'
import LaunchpadTokensaleNav from "../../components/LaunchpadTokensaleCardNav/index";
import AppBody from '../AppBody'
import { MouseoverTooltip } from '../../components/Tooltip'
import {getLaunchpadConfigById} from "../Launchpad/config";

const StyledPageHeader = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  padding: 24px;
`

const Details = styled.div`
  flex: 1;
`

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL ?? ""


export interface Order {
  token_amount: string;
  chain_id: number;
  transaction: string;
  amount: string;
  currency: string;
  date_created: string;
}


export default function TokensaleHistory(props: RouteComponentProps<{ projectId: string }>) {
  const theme = useContext(ThemeContext)
  const { account } = useActiveWeb3React()
  const TranslateString = useI18n()

    const [orders, setOrders] = useState<Order[]>([]);
    const [tokenAmount, setTokenAmount] = useState(0);
    const [prices, setPrices] = useState([]);

  const {match: {params: { projectId }}} = props;

    const launchpadConfig = getLaunchpadConfigById(parseInt(projectId))

    useEffect(() => {
         axios.get(`${BACKEND_URL}/launchpad/${projectId}/?address=${account}`).then((response) => {
          setOrders(response.data);
          const allOrders = response.data as Array<any>;
          if (allOrders.length){
            const totalTokens = allOrders.map( function(elt){ // assure the value can be converted into an integer
              return parseFloat(elt.token_amount) ?? 0;
            }).reduce((a, b) => a + b, 0)
            setTokenAmount(totalTokens)
          }
      }).catch((error) => {
        console.log("Error", error);
      })
    }, [account, setOrders, projectId]);

    const orderList = orders.map((value, key) => {
        const date = new Date(parseFloat(value?.date_created) * 1000)
        return (<tr >
            <td >{value?.currency}</td>
            <td >{parseFloat(value?.amount).toFixed(4)} </td>
            <td><
                MouseoverTooltip text={date.toUTCString()}>
                    <Text fontSize="16px">{`${date.getMonth()+1}/${date.getDate()}`}</Text>
                </MouseoverTooltip>
            </td>
            <td style={{verticalAlign: "middle"}}><LinkExternal href={getBscScanLink(value?.chain_id, value?.transaction, 'transaction')}/></td>
            <td style={{textAlign:"right"}}><Text fontSize="16px">{parseFloat(value?.token_amount).toFixed(3)} </Text></td>
          </tr>)
        })

  return (
    <>

      <LaunchpadTokensaleNav activeIndex={1} projectId={parseInt(projectId)}/>

      <AppBody>

        <StyledPageHeader>
      <Flex alignItems="center">
        <Details>
          <Heading mb="8px">{launchpadConfig?.name} history</Heading>
            <Text color="textSubtle" fontSize="14px">
              Review your {launchpadConfig?.name} token purchases
            </Text>
        </Details>
      </Flex>
        </StyledPageHeader>
      <CardBody>
        <AutoColumn gap="md">

        {!account ? (
            <ConnectWalletButton width="100%" />
        ) : (
            <table>
                <thead>
                    <tr style={{fontWeight:600, textAlign:"left"}}>
                        <th style={{fontWeight:600}}>Currency</th>
                        <th style={{fontWeight:600}}>Amount</th>
                        <th style={{fontWeight:600}}>Date</th>
                        <th style={{fontWeight:600}}>Tx</th>
                        <th style={{textAlign:"right", fontWeight:600}} >Tokens</th>
                    </tr>
                </thead>
                <tbody>
                    {orderList}
                </tbody>
            </table>
            )}

        <RowBetween align="center">
            <Text fontSize="16px">{TranslateString(88, `Total ${launchpadConfig?.name} token amount`)}</Text>
            <Text fontSize="16px" style={{fontWeight:600}}>{tokenAmount}</Text>
          </RowBetween>
        </AutoColumn>
      </CardBody>
      </AppBody>
    </>
  )
}
