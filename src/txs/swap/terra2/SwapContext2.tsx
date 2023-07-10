import { PropsWithChildren } from "react"
import createContext from "utils/createContext"
import { combineState } from "data/query"
import { TerraContracts } from "data/Terra/TerraAssets"
import { useCW20Pairs } from "data/Terra/TerraAssets"
import { useTerraContracts } from "data/Terra/TerraAssets"
import { Fetching } from "components/feedback"

interface Swap {
  pairs: CW20Pairs
  contracts?: TerraContracts
}

export const [useSwap2, SwapProvider] = createContext<Swap>("useSwap2")

const SwapContext2 = ({ children }: PropsWithChildren<{}>) => {
  const { data: pairs, ...cw20PairsState } = useCW20Pairs()
  const { data: contracts, ...contractsState } = useTerraContracts()

  console.log(pairs)
  console.log(contracts)

  const state = combineState(contractsState, cw20PairsState)

  const render = () => {
    if (!(pairs && contracts)) return null
    const value = { pairs, contracts }
    return <SwapProvider value={value}>{children}</SwapProvider>
  }

  return !state.isSuccess ? null : <Fetching {...state}>{render()}</Fetching>
}

export default SwapContext2
