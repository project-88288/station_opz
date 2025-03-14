import { StrictMode } from "react"
import { render } from "react-dom"
import { HashRouter } from "react-router-dom"
import { ReactQueryDevtools } from "react-query/devtools"
import { RecoilRoot } from "recoil"
import { getChainOptions } from "@terra-money/wallet-controller"
import { WalletProvider } from "@terra-money/wallet-provider"
import "tippy.js/dist/tippy.css"

import "config/lang"
// eslint-disable-next-line
import { BRIDGE } from "config/constants"
// eslint-disable-next-line
import { debug } from "utils/env"

import "index.scss"
// eslint-disable-next-line
import ScrollToTop from "app/ScrollToTop"
// eslint-disable-next-line
import InitNetworks from "app/InitNetworks"
// eslint-disable-next-line
import InitWallet from "app/InitWallet"
// eslint-disable-next-line
import InitTheme from "app/InitTheme"
// eslint-disable-next-line
import ElectronVersion from "app/ElectronVersion"
// eslint-disable-next-line
import App from "app/App"

const connectorOpts = { bridge: BRIDGE }

getChainOptions().then((chainOptions) =>
  render(
    <StrictMode>
      <RecoilRoot>
        <HashRouter>
          <ScrollToTop />
          <WalletProvider {...chainOptions} connectorOpts={connectorOpts}>
            <InitNetworks>
              <InitWallet>
                <InitTheme />
                <ElectronVersion />
                <App />
              </InitWallet>
            </InitNetworks>
          </WalletProvider>
          {debug.query && <ReactQueryDevtools position="bottom-right" />}
        </HashRouter>
      </RecoilRoot>
    </StrictMode>,
    document.getElementById("station")
  )
)
