import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { ButtonMenu, ButtonMenuItem } from '@123swap/uikit'
import useI18n from 'hooks/useI18n'

const StyledNav = styled.div`
  margin-bottom: 40px;
`

function LaunchpadTokensaleNav({ activeIndex = 0, projectId = 0 }: { activeIndex?: number , projectId?: number }) {
  const TranslateString = useI18n()
  return (
    <StyledNav>
      <ButtonMenu activeIndex={activeIndex} scale="sm" variant="subtle">
        <ButtonMenuItem id="swap-nav-link" to={`/launchpad/${projectId}`} as={Link}>
          {TranslateString(1142, 'Tokensale')}
        </ButtonMenuItem>
        <ButtonMenuItem id="pool-nav-link" to={`/launchpad/${projectId}/history`} as={Link}>
          {TranslateString(262, 'History')}
        </ButtonMenuItem>
      </ButtonMenu>
    </StyledNav>
  )
}

export default LaunchpadTokensaleNav
