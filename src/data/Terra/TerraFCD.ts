import { useQuery } from "react-query"
import axios, { AxiosError } from "axios"
import { useNetwork } from "data/wallet"
import { useNetworks } from "app/InitNetworks"
import { queryKey, RefetchOptions } from "../query"
import { terraFCDURL } from "../../config/constants"

/* terra FCD map*/
export const useTerraFCDURL = (mainnet?: true) => {
  const network = useNetwork()
  const networks = useNetworks()
  return mainnet
    ? terraFCDURL(networks["mainnet"].name)
    : terraFCDURL(network.name)
}
//
export const useIsTerraFCDAvailable = () => {
  const url = useTerraFCDURL()
  return !!url
}
//
export const useTerraFCD = <T>(path: string, params?: object, fallback?: T) => {
  const baseURL = useTerraFCDURL()
  const available = useIsTerraFCDAvailable()
  const shouldFallback = !available && fallback

  return useQuery<T, AxiosError>(
    [queryKey.TerraAPI, baseURL, path, params],
    async () => {
      if (shouldFallback) return fallback
      const { data } = await axios.get(path, { baseURL, params })
      return data
    },
    { ...RefetchOptions.INFINITY, enabled: !!(baseURL || shouldFallback) }
  )
}

/* fee */
export type GasPrices = Record<Denom, Amount>

export const useGasPrices = () => {
  const current = useTerraFCDURL()
  const mainnet = useTerraFCDURL(true)
  const baseURL = current ?? mainnet
  const path = "/v1/txs/gas_prices"

  return useQuery(
    [queryKey.TerraAPI, baseURL, path],
    async () => {
      const { data } = await axios.get<GasPrices>(path, { baseURL })
      return data
    },
    { ...RefetchOptions.INFINITY, enabled: !!baseURL }
  )
}
