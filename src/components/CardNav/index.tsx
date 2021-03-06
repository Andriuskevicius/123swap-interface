import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { ButtonMenu, ButtonMenuItem } from '@123swap/uikit'
import useI18n from 'hooks/useI18n'

const StyledNav = styled.div`
  margin: auto;
  margin-bottom: 10px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  max-width: 50%;
  
  @media (max-width: 576px) {
    max-width: 100%;
  }
  
  a {
    flex-basis: 100%;
    height: 25px;
    padding: 5px 40px;
    background: transparent !important;
    border-radius: 0 !important;
    
    @media (max-width: 576px) {
      padding: 5px 25px;
    }
  }
`

function Nav({ activeIndex = 0 }: { activeIndex?: number }) {
  const TranslateString = useI18n()
  return (
    <StyledNav>
      <ButtonMenu activeIndex={activeIndex} variant="subtle">
        <ButtonMenuItem id="swap-nav-link" to="/swap" as={Link}>
          {TranslateString(1142, 'Swap')}
        </ButtonMenuItem>
        <ButtonMenuItem id="pool-nav-link" to="/pool" as={Link}>
          {TranslateString(262, 'Liquidity')}
        </ButtonMenuItem>
        <ButtonMenuItem
          id="pool-nav-link"
          as="a"
          href="https://www.binance.org/en/bridge?utm_source=123Swap"
          target="_blank"
          rel="noreferrer noopener"
        >
          Bridge
        </ButtonMenuItem>
      </ButtonMenu>
    </StyledNav>
  )
}

export default Nav
