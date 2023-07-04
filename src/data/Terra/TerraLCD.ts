import { useQuery } from "react-query"
import axios, { AxiosError } from "axios"
import { useNetwork } from "data/wallet"
import { useNetworks } from "app/InitNetworks"
import { queryKey, RefetchOptions } from "../query"
import { terraLCDURL } from "../../config/constants"

/* terra LCD map*/
//
export const useTerraLCDURL = (mainnet?: true) => {
  const network = useNetwork()
  const networks = useNetworks()
  return mainnet
    ? terraLCDURL(networks["mainnet"].name)
    : terraLCDURL(network.name)
}
//
export const useIsTerraLCDAvailable = () => {
  const url = useTerraLCDURL()
  return !!url
}
//
export const useTerraLCD = <T>(path: string, params?: object, fallback?: T) => {
  const baseURL = useTerraLCDURL()
  const available = useIsTerraLCDAvailable()
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
