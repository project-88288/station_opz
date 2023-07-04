import { useTranslation } from "react-i18next"
import { useCustomTokensIBC } from "data/settings/CustomTokens"
import { useCustomTokensCW20 } from "data/settings/CustomTokens"
import { InternalButton } from "components/general"
import { Card } from "components/layout"
import IBCAsset from "./IBCAsset"
import CW20Asset from "./CW20Asset"
import Asset from "./Asset"
import AddMoneies from "./AddMoneies"
import { useOpzCW20Whitelist, useOpzIBCWhitelist } from "data/moneies/OpzAssets"

const Moneies = () => {
  const { t } = useTranslation()
  let { list: ibc } = useCustomTokensIBC()
  let { list: cw20 } = useCustomTokensCW20()
  const { data: opzibc } = useOpzIBCWhitelist()
  const { data: opzcw20 } = useOpzCW20Whitelist()

  const render = () => {
    if (!ibc.length && !cw20.length && !opzcw20 && !opzibc) return null

    if (opzcw20) {
      const arr = Object.values<CW20TokenItem>(opzcw20)
      const res = cw20.filter((obj) => {
        return arr.some((tokenObj) => tokenObj.token === obj.token)
      })
      //
      cw20 = res
    }

    if (opzibc) {
      const arr = Object.values<IBCTokenItem>(opzibc)
      const res = ibc.filter((obj) => {
        return arr.some((tokenObj) => tokenObj.denom === obj.denom)
      })
      //
      ibc = res
    }

    return (
      <>
        {!ibc.length
          ? null
          : ibc.map(({ denom }) => (
              <IBCAsset denom={denom} key={denom}>
                {(item) => <Asset {...item} />}
              </IBCAsset>
            ))}
        {!cw20.length
          ? null
          : cw20.map((item) => (
              <CW20Asset {...item} key={item.token}>
                {(item) => <Asset {...item} />}
              </CW20Asset>
            ))}
      </>
    )
  }

  return (
    <Card
      title={t("Moneies")}
      extra={
        <AddMoneies>
          {(open) => (
            <InternalButton onClick={open} chevron>
              {t("Add moneies")}
            </InternalButton>
          )}
        </AddMoneies>
      }
    >
      {render()}
    </Card>
  )
}

export default Moneies
