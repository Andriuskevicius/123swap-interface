import { useEffect } from 'react'
import useGetPriceData from './useGetPriceData'
import { CAKE } from '../constants'

const useGetDocumentTitlePrice = () => {
  const priceData = useGetPriceData()

    // todo remove when we know price and address
  // const cakePriceUsd = priceData ? parseFloat(priceData.data[CAKE.address].price) : 0
  // const cakePriceUsd = 0.0
  // const cakePriceUsdString =
  //   Number.isNaN(cakePriceUsd) || cakePriceUsd === 0
  //     ? ''
  //     : ` - $${cakePriceUsd.toLocaleString(undefined, {
  //         minimumFractionDigits: 3,
  //         maximumFractionDigits: 3,
  //       })}`

    const cakePriceUsdString = "0.0"

  useEffect(() => {
    document.title = `123Swap ${cakePriceUsdString}`
  }, [cakePriceUsdString])
}
export default useGetDocumentTitlePrice
