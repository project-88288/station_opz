// eslint-disable-next-line
import { Fragment, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useInfiniteQuery } from "react-query"
import axios from "axios"
import { queryKey } from "data/query"
import { Button } from "components/general"
import { Card, Col, Page } from "components/layout"
import { Empty } from "components/feedback"
import { useTerraLCDURL } from "data/Terra/TerraAPI"
import useAddress from "auth/hooks/useAddress"
import HistoryItemLcd from "../HistoryItemLcd"

interface AccountHistory {
  next: number | false
  pagination: {
    total: string
    next_key: string | null
  }
  tx_responses: AccountHistoryItem[]
}

const HistoryListLcd = () => {
  const { t } = useTranslation()
  const address = useAddress()
  const baseURL = useTerraLCDURL()
  // @typescript-eslint/no-unused-vars
  // const LIMIT = 10

  /* query */
  const fetchAccountHistory = useCallback(
    async ({ pageParam = 0 }) => {
      const { data } = await axios.get<AccountHistory>(
        `/cosmos/tx/v1beta1/txs?events=message.sender=%27${address}%27&pagination.reverse=true&order_by=ORDER_BY_DESC`, //&pagination.limit=${LIMIT}`,
        { baseURL, params: { offset: pageParam || undefined } }
      )
      return data
    },
    [address, baseURL]
  )

  const { data, error, fetchNextPage, ...state } = useInfiniteQuery(
    [queryKey.History, "history", baseURL, address],
    fetchAccountHistory,
    { getNextPageParam: ({ next }) => next, enabled: !!(address && baseURL) }
  )

  const { hasNextPage, isFetchingNextPage } = state

  const getPages = () => {
    if (!data) return []
    const { pages } = data
    const [{ tx_responses }] = data.pages
    return tx_responses.length ? pages : []
  }

  const pages = getPages()

  const render = () => {
    if (address && !data) return null
    return !pages.length ? (
      <Card>
        <Empty />
      </Card>
    ) : (
      <Col>
        {pages.map(({ tx_responses }, i) => (
          <Fragment key={i}>
            {tx_responses.map((item) => (
              <HistoryItemLcd {...item} key={item.txhash} />
            ))}
          </Fragment>
        ))}

        <Button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
          loading={isFetchingNextPage}
          block
        >
          {isFetchingNextPage
            ? t("Loading more...")
            : hasNextPage
            ? t("Load more")
            : t("Nothing more to load")}
        </Button>
      </Col>
    )
  }

  return (
    <Page {...state} title={t("History")}>
      {render()}
    </Page>
  )
}

export default HistoryListLcd
