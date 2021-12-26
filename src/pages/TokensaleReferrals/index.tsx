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
  @media screen and (max-width:736px) {
    padding: 0;
  }
`

const StyledRowBetween = styled(RowBetween)`
  flex-wrap: wrap;
  a, button {
    width: 100%;
  }
  button {
    margin-bottom: 7px;
  }
`

const Details = styled.div`
  flex: 1;
`

const StyledInput = styled(Input)`
  border: solid 1px ${({ theme }) => theme.colors.borderColor};
`

const StyledDiv = styled.div`
  border-top: solid 1px ${({ theme }) => theme.colors.borderColor};
  padding-top: 25px;
  margin-top: 30px;
`

const StyledButton = styled(Button)`
  background: ${({ theme }) => theme.colors.inputSecondary};
  border: solid 1px ${({ theme }) => theme.colors.borderColor};
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

    const url = `https://exchange.123swap.finance/#/tokensale?referrer=${referrerData.code}`;

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

      <Flex pb="40px" maxWidth="736px" alignItems="center">
        <Details>
          <Heading mb="8px">Refferal program</Heading>
            <Text color="textSubtle" fontSize="14px">
              Share your unique link, refer friends and gain 5% 123swap tokens your friends
              have bought. Your friends will also get 2.5% bonus for using your link.
            </Text>
        </Details>
      </Flex>
      <AppBody>
        <StyledPageHeader>
          <TokensaleCardNav activeIndex={2} />
        </StyledPageHeader>
      <CardBody>
        <AutoColumn gap="md">
            {!account ? (
                <ConnectWalletButton width="100%" />
            ) : (
                <div>
                    <Text color="textMenu" paddingBottom="5px" fontSize="12px">{TranslateString(88, 'Your referral link:')}</Text>
                    <StyledInput type="text" readOnly value={url}/>
                    <Text color="textMenu" paddingBottom="5px" paddingTop="10px" fontSize="12px">{TranslateString(88, 'Share via:')}</Text>

                    <StyledRowBetween align="center">
                      <a rel="noreferrer" target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}>
                        <StyledButton type="button"><i className="fa fa-facebook"/>Facebook</StyledButton>
                      </a>
                      <a rel="noreferrer" href={`http://twitter.com/share?text=My%20123swap%20Tokensale%20referral%20link:&url=${url}`}>
                        <StyledButton type="button" className="btn btn-twitter"><i className="fa fa-twitter"/>Twitter</StyledButton>
                      </a>
                      <a rel="noreferrer" href={`mailto:?subject=123swap Tokensale Referral&body=My 123swap Tokensale referral link: ${url}`}>
                        <StyledButton type="button" className="btn"><i className="fa fa-envelope"/>Email</StyledButton>
                      </a>
                    </StyledRowBetween>
                    <StyledDiv>
                    <Text fontSize="18px" fontWeight="600">{TranslateString(88, 'Your bonuses')}</Text>
                     <RowBetween align="center">
                        <Text color="textMenu" fontSize="14px">{TranslateString(88, 'Referred bonus (2.5%)')}</Text>
                        <Text fontSize="14px" style={{fontWeight:600}}>{parseFloat(referrerData.referrer_bonus).toPrecision(3)}</Text>
                      </RowBetween>
                     <RowBetween align="center">
                        <Text color="textMenu" fontSize="14px">{TranslateString(88, 'Referring bonus (5%)')}</Text>
                        <Text fontSize="14px" style={{fontWeight:600}}>{parseFloat(referrerData.referring_bonus).toPrecision(3)}</Text>
                      </RowBetween>
                    </StyledDiv>
                </div>)}
        </AutoColumn>
      </CardBody>
      </AppBody>
    </>
  )
}
