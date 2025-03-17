import { internalApi } from './internalApi';
import { TAG_TYPE } from '@/enums/tagTypes.js';

export const salesApi = internalApi.injectEndpoints({
  endpoints: (builder) => ({
    getSales: builder.query({
      query: () => ({
        url: 'chartData',
        method: 'GET',
      }),
      providesTags: (_, __) => [
        { type: TAG_TYPE.Data },
      ],
    }),
  }),
  overrideExisting: false,
});

export const { useGetSalesQuery } = salesApi;
