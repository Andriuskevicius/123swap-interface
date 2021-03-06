import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { ButtonMenu, ButtonMenuItem } from '@123swap/uikit'
import useI18n from 'hooks/useI18n'

const StyledNav = styled.div`
  margin-bottom: 40px;
  text-align: center;
  & div {
    background: ${({ theme }) => theme.colors.inputSecondary};
    border-radius: 50px;
    padding: 2px;
  }
  & a {
    border: 0 !important;
    color: ${({ theme }) => theme.colors.contrast};
    padding: 5px 15px;
    height: 29px;

  }
`

function TokensaleNav({ activeIndex = 0 }: { activeIndex?: number }) {
  const TranslateString = useI18n()
  return (
    <StyledNav>
      <ButtonMenu activeIndex={activeIndex} scale="sm" variant="subtle">
        <ButtonMenuItem id="swap-nav-link" to="/tokensale" as={Link}>
          {TranslateString(1142, 'Tokensale')}
        </ButtonMenuItem>
        <ButtonMenuItem id="pool-nav-link" to="/history" as={Link}>
          {TranslateString(262, 'History')}
        </ButtonMenuItem>
        <ButtonMenuItem id="pool-nav-link" to="/referrals" as={Link}>
          {TranslateString(262, 'Referrals')}
        </ButtonMenuItem>
      </ButtonMenu>
    </StyledNav>
  )
}

export default TokensaleNav
