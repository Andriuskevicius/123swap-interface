import React, { useState } from 'react'
import {networkLocalStorageKey, NetworkNames} from '@123swap/uikit'

export interface NetworkContextType {
  network: string;
  setNetwork: (networkId:string) => void;
}

const NetworkContext = React.createContext<NetworkContextType>({ network: NetworkNames[NetworkNames.BSC], setNetwork: (networkId:string) => null });

const NetworkContextProvider: React.FC = ({ children }) => {
  const [network, setNetworkId] = useState(() => {
    const networkUserSetting = localStorage.getItem(networkLocalStorageKey);
    return networkUserSetting || NetworkNames[NetworkNames.BSC]
  })

  const setNetwork = (networkId) => {
    setNetworkId((prevState: any) => {
      return networkId
    })
  }

  return (
      <NetworkContext.Provider value={{ network, setNetwork }}>{children}</NetworkContext.Provider>
  )
}

export { NetworkContext, NetworkContextProvider }
