import { Fragment } from "react"
import { useTranslation } from "react-i18next"
import { FinderLink } from "components/general"
import { Card } from "components/layout"
import { Dl, ToNow } from "components/display"
import { ReadMultiple } from "components/token"
import HistoryMessage from "../HistoryMessage"
import styles from "./HistoryItem.module.scss"
// eslint-disable-next-line
import DateRangeIcon from "@mui/icons-material/DateRange"
// eslint-disable-next-line
import GppGoodIcon from "@mui/icons-material/GppGood"
// eslint-disable-next-line
import GroupIcon from "@mui/icons-material/Group"
import { useNetworkName } from "data/wallet"
import {
  createActionRuleSet,
  createLogMatcherForActions,
  getTxCanonicalMsgs,
} from "@terra-money/log-finder-ruleset"
import { TxInfo } from "@terra-money/terra.js"

interface AccountHistoryItem {
  code?: number
  key?: string
  txhash?: string
  timestamp?: any
  msgs?: TxMessage[] | undefined
  collapsed?: number | undefined
  raw_log?: string | undefined
  tx?: any
}

const HistoryItemLcd = ({
  txhash,
  timestamp,
  ...props
}: AccountHistoryItem) => {
  // eslint-disable-next-line
  const {
    raw_log,
    collapsed,
    tx: {
      body: { memo },
      auth_info: {
        fee: { amount: fee },
        // eslint-disable-next-line
        signer_infos,
      },
    },
  } = props

  const success = props.code === 0
  const { t } = useTranslation()
  const networkName = useNetworkName()
  const data = [
    { title: t("Fee"), content: !!fee && <ReadMultiple list={fee} /> },
    { title: t("Memo"), content: !!memo && memo },
    { title: t("Log"), content: !success && raw_log },
  ]
  const ruleset = createActionRuleSet(networkName)
  const logMatcher = createLogMatcherForActions(ruleset)

  const getCanonicalMsgs = (txInfo: TxInfo) => {
    const matchedMsg = getTxCanonicalMsgs(txInfo, logMatcher)
    return matchedMsg
      ? matchedMsg
          .map((matchedLog) => matchedLog.map(({ transformed }) => transformed))
          .flat(2)
      : []
  }

  return (
    <Card
      title={
        <FinderLink tx short>
          {txhash}
        </FinderLink>
      }
      extra={<ToNow>{new Date(timestamp)}</ToNow>}
      size="small"
      bordered
    >
      <div className={styles.msgs}>
        {getCanonicalMsgs({
          txhash,
          timestamp,
          ...props,
        } as any)?.map(
          (msg, index) =>
            msg && <HistoryMessage msg={msg} success={success} key={index} />
        )}
      </div>

      {collapsed && <small>{t("{{collapsed}} more", { collapsed })}</small>}

      <footer className={styles.footer}>
        <Dl>
          {data.map(({ title, content }) => {
            if (!content) return null
            return (
              <Fragment key={title}>
                <dt>{title}</dt>
                <dd>{content}</dd>
              </Fragment>
            )
          })}
        </Dl>
      </footer>
    </Card>
  )
}

export default HistoryItemLcd
