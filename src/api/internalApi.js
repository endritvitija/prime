import { TAG_TYPE } from '@/enums/tagTypes';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = "http://localhost:3000"

export const internalApi = createApi({
  reducerPath: 'internalApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: () => ({}),
  tagTypes: [...Object.values(TAG_TYPE)],
});
