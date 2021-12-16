import React from 'react'
import styled from 'styled-components'
import { Card } from '@123swap/uikit'

export const BodyWrapper = styled(Card)`
  position: relative;
  max-width: 736px;
  width: 100%;
  z-index: 5;
  padding: 20px;
  background: ${({ theme }) => theme.colors.secondBackground};
  border: solid 1px ${({ theme }) => theme.colors.borderColor};
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children }: { children: React.ReactNode }) {
  return <BodyWrapper>{children}</BodyWrapper>
}
