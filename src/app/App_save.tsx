import { getErrorMessage } from "utils/error"
import Layout, { Page } from "components/layout"
// eslint-disable-next-line
import { Banner, Content, Header, Actions, Sidebar } from "components/layout"
import { ErrorBoundary, Wrong } from "components/feedback"

/* routes */
import { useNav } from "./routes"

/* banner */

/* sidebar */
import Nav from "./sections/Nav"
import Aside from "./sections/Aside"

/* header */
import NetworkName from "./sections/NetworkName"
// eslint-disable-next-line
import IsClassicNetwork from "./sections/IsClassicNetwork"
import Refresh from "./sections/Refresh"
import Preferences from "./sections/Preferences"
import SelectTheme from "./sections/SelectTheme"
import ConnectWallet from "./sections/ConnectWallet"

/* extra */
import LatestTx from "./sections/LatestTx"
import ValidatorButton from "./sections/ValidatorButton"
import DevTools from "./sections/DevTools"

/* init */
// eslint-disable-next-line
import InitBankBalance from "./InitBankBalance"

const App = () => {
  // eslint-disable-next-line
  const { element: routes } = useNav()

  return (
    <Layout>
      <Sidebar>
        <Nav />
        <Aside />
      </Sidebar>

      <Header>
        <NetworkName />

        <Actions>
          <DevTools />
          <section>
            <Refresh />
            <Preferences />
            <SelectTheme />
          </section>
          <ValidatorButton />
          <ConnectWallet />
        </Actions>
        <LatestTx />
      </Header>

      <Content>
        <ErrorBoundary fallback={fallback}>
          <InitBankBalance>{routes}</InitBankBalance>
        </ErrorBoundary>
      </Content>
    </Layout>
  )
}

export default App

/* error */
export const fallback = (error: Error) => (
  <Page>
    <Wrong>{getErrorMessage(error)}</Wrong>
  </Page>
)
