import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../constants'



const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}`,
  credentials: 'include',
})


export const apiBase = createApi({
  baseQuery: baseQuery,
  tagTypes: ['Posts'], // Здесь мы указываем все доступные теги
  endpoints: () => ({}),
})