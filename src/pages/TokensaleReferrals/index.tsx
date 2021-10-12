import React, { useContext, useMemo, useCallback, useState, useEffect } from 'react'
import styled, { ThemeContext } from 'styled-components'
import axios from "axios";
import { Heading, Text, Flex, CardBody, Button, Input } from '@123swap/uikit'
import ConnectWalletButton from 'components/ConnectWalletButton'
import TokensaleCardNav from 'components/TokensaleCardNav'
import { StyledInternalLink } from 'components/Shared'
import { LightCard } from 'components/Card'
import { RowBetween } from 'components/Row'
import { AutoColumn } from 'components/Column'
import { getBscScanLink } from 'utils'
import { useActiveWeb3React } from 'hooks'
import useI18n from 'hooks/useI18n'
import AppBody from '../AppBody'

const StyledPageHeader = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  padding: 24px;
`

const Details = styled.div`
  flex: 1;
`

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL ?? ""

class ReferrerReturn {
  code = "";

  address = "";

  referring_bonus = "0";

  referrer_bonus = "0";

}

export default function TokensaleReferrals() {
  const theme = useContext(ThemeContext)
  const { account } = useActiveWeb3React()
  const TranslateString = useI18n()
    const [referrerData, setReferrerData] = useState(new ReferrerReturn());

    const url = `${BACKEND_URL}/#/tokensale?referrer=${referrerData.code}`;

    useEffect(() => {

      if (account){
          axios.post(`${BACKEND_URL}/presale/referrer/`, {address:account}).then((response) => {
            const data = response.data as ReferrerReturn;
            setReferrerData(data);
          }).catch((error) => {
            console.log("Error", error);
          })
      }
    }, [account, setReferrerData]);
  return (
    <>

      <TokensaleCardNav activeIndex={2} />

      <AppBody>

        <StyledPageHeader>
      <Flex alignItems="center">
        <Details>
          <Heading mb="8px">Refferal program</Heading>
            <Text color="textSubtle" fontSize="14px">
              Share your unique link, refer friends and gain 10% 123swap tokens your friends
              have bought. Your friends will also get 5% bonus for using your link.
            </Text>
        </Details>
      </Flex>
        </StyledPageHeader>
      <CardBody>
        <AutoColumn gap="md">
            {!account ? (
                <ConnectWalletButton width="100%" />
            ) : (
                <div>
                    <Text paddingBottom="5px" fontSize="16px">{TranslateString(88, 'Your referral link:')}</Text>
                    <Input type="text" readOnly value={url}/>
                    <Text paddingBottom="5px" paddingTop="10px" fontSize="16px">{TranslateString(88, 'Share via:')}</Text>

                    <RowBetween align="center">
                      <a rel="noreferrer" target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}>
                        <Button type="button"><i className="fa fa-facebook"/>Facebook</Button>
                      </a>
                      <a rel="noreferrer" href={`http://twitter.com/share?text=My%20Entry%20Money%20Tokensale%20referral%20link:&url=${url}`}>
                        <Button type="button" className="btn btn-twitter"><i className="fa fa-twitter"/>Twitter</Button>
                      </a>
                      <a rel="noreferrer" href={`mailto:?subject=123swap Tokensale Referral&body=My 123swap Tokensale referral link: ${url}`}>
                        <Button type="button" className="btn"><i className="fa fa-envelope"/>Email</Button>
                      </a>
                    </RowBetween>

                        <br/>
                        <br/>
                        <br/>

                    <Text fontSize="18px" fontWeight="600">{TranslateString(88, 'Your bonuses')}</Text>
                     <RowBetween align="center">
                        <Text fontSize="16px">{TranslateString(88, 'Referred bonus (5%):')}</Text>
                        <Text fontSize="16px" style={{fontWeight:600}}>{parseFloat(referrerData.referrer_bonus).toPrecision(3)}</Text>
                      </RowBetween>
                     <RowBetween align="center">
                        <Text fontSize="16px">{TranslateString(88, 'Referring bonus (10%):')}</Text>
                        <Text fontSize="16px" style={{fontWeight:600}}>{parseFloat(referrerData.referring_bonus).toPrecision(3)}</Text>
                      </RowBetween>
                </div>)}
        </AutoColumn>
      </CardBody>
      </AppBody>
    </>
  )
}
