import { apiBase } from './api'
import { IAnalyticsData } from '../features/cartSlice/types'


export const analyticsApi = apiBase.injectEndpoints?.({
  endpoints: (builder) => ({
    getAnalytics: builder.query<IAnalyticsData, void>({
      query: () => ({
        url: `/analytics`,
        method: 'GET'
      })
    })
  })
})

export const {useGetAnalyticsQuery} = analyticsApi