import React, { HTMLProps, useCallback } from 'react'
import { Link } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'

// A button that triggers some onClick result, but looks like a link.
export const LinkStyledButton = styled.button<{ disabled?: boolean }>`
  border: none;
  text-decoration: none;
  background: none;

  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  color: ${({ theme, disabled }) => (disabled ? theme.colors.textSubtle : theme.colors.primary)};
  font-weight: 500;

  :hover {
    text-decoration: ${({ disabled }) => (disabled ? null : 'underline')};
  }

  :focus {
    outline: none;
    text-decoration: ${({ disabled }) => (disabled ? null : 'underline')};
  }

  :active {
    text-decoration: none;
  }
`

// An internal link from the react-router-dom library that is correctly styled
export const StyledInternalLink = styled(Link)`
  text-decoration: underline;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary};
  background: -webkit-linear-gradient(109.32deg, #EB5757 -12.08%, #F2C94C 58.46%, #F2994A 127.54%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
  border-bottom: solid 1px;

  :hover {
    border-bottom: solid 1px;
  }

  :focus {
    outline: none;
    border-bottom: 0;
  }

  :active {
    border-bottom: 0;
  }
`

const StyledLink = styled.a`
  text-decoration: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;

  :hover {
    text-decoration: underline;
  }

  :focus {
    outline: none;
    text-decoration: underline;
  }

  :active {
    text-decoration: none;
  }
`

/**
 * Outbound link that handles firing google analytics events
 */
export function ExternalLink({
  target = '_blank',
  href,
  rel = 'noopener noreferrer',
  ...rest
}: Omit<HTMLProps<HTMLAnchorElement>, 'as' | 'ref' | 'onClick'> & { href: string }) {
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (!(target === '_blank' || event.ctrlKey || event.metaKey)) {
        event.preventDefault()
      }
    },
    [target]
  )
  return <StyledLink target={target} rel={rel} href={href} onClick={handleClick} {...rest} />
}

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const Spinner = styled.img`
  animation: 2s ${rotate} linear infinite;
  width: 16px;
  height: 16px;
`
