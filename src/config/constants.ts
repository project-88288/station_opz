/* query */
export const LAZY_LIMIT = 999

/* connection */
export const BRIDGE = "https://walletconnect.terra.dev"

/* api */
export const ASSETS = "https://terra.opzlabs.com/assets"
export const OBSERVER = "wss://observer.terra.dev"

/* terra api map */
export const terraFCDURL = (name?: String) => {
  switch (name) {
    case "mainnet":
      return "https://phoenix-fcd.terra.dev"
    case "testnet":
      return "https://pisco-fcd.terra.dev"
    case "classic":
      return "https://columbus-fcd.terra.dev"
    case "localterra":
      return "http://localhost:3060"
    default:
      return ""
  }
}
export const terraLCDURL = (name?: String) => {
  switch (name) {
    case "mainnet":
      return "https://phoenix-lcd.terra.dev"
    case "testnet":
      return "https://pisco-lcd.terra.dev"
    case "classic":
      return "https://columbus-lcd.terra.dev"
    case "localterra":
      return "http://localhost:1317"
    default:
      return ""
  }
}
export const terraAPIURL = (name?: String) => {
  switch (name) {
    case "mainnet":
      return "https://phoenix-api.terra.dev"
    case "testnet":
      return "https://pisco-api.terra.dev"
    case "classic":
      return "https://api.terrarebels.net"
    default:
      return ""
  }
}

/* website */
export const FINDER = "https://finder.opz.life/#"
export const STATION = "https://station.opz.life"

export const EXTENSION =
  "https://chrome.google.com/webstore/detail/aiifbnbfobpmeekipheeijimdpnlpgpp"
export const TUTORIAL =
  "https://docs.terra.money/learn/terra-station/Download/terra-station-desktop.html"

/* website: stake */
export const TERRA_VALIDATORS =
  "https://github.com/terra-money/validator-profiles/tree/master/validators/"

export const STAKE_ID = "https://stake.id/#/validator/"

/* ledger */
export const LEDGER_TRANSPORT_TIMEOUT = 120000

/* tx */
export const DEFAULT_GAS_ADJUSTMENT = 2
export const CLASSIC_DEFAULT_GAS_ADJUSTMENT = 3

/* swap */
export const TERRASWAP_COMMISSION_RATE = 0.003

/* placeholder */
// https://github.com/terra-money/localterra
export const SAMPLE_ADDRESS = "terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v"
