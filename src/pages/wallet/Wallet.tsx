import { Auto, Page } from "components/layout"
import Coins from "./Coins"
import Tokens from "./Tokens"
import Vesting from "./Vesting"
// eslint-disable-next-line
import Rewards from "./Rewards"
// eslint-disable-next-line
import LinkEcosystem from "./LinkEcosystem"
import Moneies from "./Moneies"

const Wallet = () => {
  return (
    <Page title="Wallet">
      <Auto
        columns={[
          <>
            <Coins />
            <Vesting />
            <Moneies />
            <Tokens />
          </>,
          <>
            <Rewards />
            <LinkEcosystem />
          </>,
        ]}
      />
    </Page>
  )
}

export default Wallet
