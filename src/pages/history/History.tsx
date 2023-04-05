import { useTranslation } from "react-i18next"
import {
  useIsTerraAPIAvailable,
  useIsTerraLCDAvailable,
} from "data/Terra/TerraAPI"
import { Wrong } from "components/feedback"
import { useNetwork } from "data/wallet"
//import HistoryList from "./HistoryList"

//
import HistoryListApi from "./HistoryListApi"
import HistoryListLcd from "./HistoryListLcd"
//

const History = () => {
  const { t } = useTranslation()
  const availableApi = useIsTerraAPIAvailable()
  const availableLcd = useIsTerraLCDAvailable()
  const network = useNetwork()

  switch (network.name) {
    case "mainnet":
      if (!availableApi) return <Wrong>{t("History is not supported")}</Wrong>
      return <HistoryListApi />
    case "testnet":
      if (!availableApi) return <Wrong>{t("History is not supported")}</Wrong>
      return <HistoryListApi />
    case "classic":
      if (!availableApi) return <Wrong>{t("History is not supported")}</Wrong>
      return <HistoryListApi />
    case "localterra":
      if (!availableLcd) return <Wrong>{t("History is not supported")}</Wrong>
      return <HistoryListLcd />
    default:
      return <Wrong>{t("History is not supported")}</Wrong>
  }
}

export default History
