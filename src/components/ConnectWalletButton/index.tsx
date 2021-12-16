// @ts-nocheck
import React from 'react'
import { Button, ButtonProps, useWalletModal, ArrowRightIcon} from '@123swap/uikit'
import useI18n from 'hooks/useI18n'
import useAuth from 'hooks/useAuth'
import useNetwork from "../../hooks/useNetwork";

const UnlockButton: React.FC<ButtonProps> = (props) => {
  const TranslateString = useI18n()
  const { network, setNetwork } = useNetwork()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout, network, setNetwork)

  return (
    <Button endIcon={<ArrowRightIcon />} onClick={onPresentConnectModal} {...props}>
      {TranslateString(292, 'Unlock Wallet')}
    </Button>
  )
}

export default UnlockButton
