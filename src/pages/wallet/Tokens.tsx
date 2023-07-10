import { useTranslation } from "react-i18next"
import { useCustomTokensIBC } from "data/settings/CustomTokens"
import { useCustomTokensCW20 } from "data/settings/CustomTokens"
import { InternalButton } from "components/general"
import { Card } from "components/layout"
import IBCAsset from "./IBCAsset"
import CW20Asset from "./CW20Asset"
import AddTokens from "./AddTokens"
import Asset from "./Asset"
import { useCW20Whitelist, useIBCWhitelist } from "data/Terra/TerraAssets"
import { useOpzCW20Whitelist, useOpzIBCWhitelist } from "data/moneies/OpzAssets"

const Tokens = () => {
  const { t } = useTranslation()
  let { list: ibc } = useCustomTokensIBC()
  let { list: cw20 } = useCustomTokensCW20()
  const { data: ibcs } = useIBCWhitelist()
  const { data: cw20s } = useCW20Whitelist()
  const { data: opzibc } = useOpzIBCWhitelist()
  const { data: opzcw20 } = useOpzCW20Whitelist()

  const render = () => {
    if (!ibc.length && !cw20.length && !cw20s && !ibcs && opzcw20 && opzibc)
      return null

    if (cw20s && opzcw20) {
      const cw20arr = Object.values<CW20TokenItem>(cw20s)
      const opzcw20arr = Object.values<CW20TokenItem>(opzcw20)
      const cw20arr_ = cw20arr.filter(
        (obj) => !opzcw20arr.some((obj_) => obj.token === obj_.token)
      )
      const res = cw20.filter((obj) => {
        return cw20arr_.some((tokenObj) => tokenObj.token === obj.token)
      })
      cw20 = res
    }

    if (ibcs && opzibc) {
      const ibcarr = Object.values<IBCTokenItem>(ibcs)
      const opzibcarr = Object.values<IBCTokenItem>(opzibc)
      const ibcarr_ = ibcarr.filter(
        (obj) => !opzibcarr.some((obj_) => obj.denom === obj_.denom)
      )
      const res = ibc.filter((obj) => {
        return ibcarr_.some((tokenObj) => tokenObj.denom === obj.denom)
      })
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
      title={t("Tokens")}
      extra={
        <AddTokens>
          {(open) => (
            <InternalButton onClick={open} chevron>
              {t("Add tokens")}
            </InternalButton>
          )}
        </AddTokens>
      }
    >
      {render()}
    </Card>
  )
}

export default Tokens
