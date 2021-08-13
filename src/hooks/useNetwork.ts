import { useContext } from 'react'
import { NetworkContext } from '../NetworkContext'

const useNetwork = () => {
  const { network, setNetwork } = useContext(NetworkContext);
  return { network, setNetwork }
}

export default useNetwork
