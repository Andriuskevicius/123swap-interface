import styled from 'styled-components'

const Card = styled.div<any>`
  width: 100%;
  border-radius: 8px;
  padding: 1.25rem;
  padding: ${({ padding }) => padding};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};
`
export default Card

export const LightCard = styled(Card)`
  background-color: ${({ theme }) => theme.colors.tertiary};
`

export const GreyCard = styled(Card)`
  background-color: ${({ theme }) => theme.colors.tertiary};
`
