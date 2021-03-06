// @ts-nocheck
import React, { useContext } from 'react'
import BigNumber from 'bignumber.js'
import { Menu as UikitMenu} from '@123swap/uikit'
import { useWeb3React } from '@web3-react/core'
import { allLanguages } from 'constants/localisation/languageCodes'
import { LanguageContext } from 'hooks/LanguageContext'
import useTheme from 'hooks/useTheme'
import useNetwork from 'hooks/useNetwork'
import useGetPriceData from 'hooks/useGetPriceData'
import useGetLocalProfile from 'hooks/useGetLocalProfile'
import useAuth from 'hooks/useAuth'
import links from './config'
import { CAKE } from '../../constants'

const Menu: React.FC = (props) => {
  const { account } = useWeb3React()
  const { login, logout } = useAuth()
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext)
  const { isDark, toggleTheme } = useTheme()
  const { network, setNetwork } = useNetwork()
  const priceData = useGetPriceData()
    // todo uncoment, when we have prices and deployed contract
  // const cakePriceUsd = priceData ? Number(priceData.data[CAKE.address].price) : undefined
     const cakePriceUsd = 0.123;


  const profile = useGetLocalProfile()

  return (
    <UikitMenu
      links={links}
      account={account as string}
      login={login}
      logout={logout}
      network={network}
      setNetwork={setNetwork}
      isDark={isDark}
      toggleTheme={toggleTheme}
      currentLang={selectedLanguage?.code || ''}
      langs={allLanguages}
      setLang={setSelectedLanguage}
      cakePriceUsd={cakePriceUsd}
      profile={profile}
      {...props}
    />
  )
}

export default Menu
