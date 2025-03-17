import { internalApi } from './internalApi';
import { TAG_TYPE } from '@/enums/tagTypes';

export const projectsApi = internalApi.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: (parentId) => ({
        url: 'projects',
        params: {
          _page: 1,
          _per_page: 100000,
          parentId: !!parentId? parentId: 'null',
        },
        method: 'GET',
      }),
      transformResponse: (data, _, parentId) => {
        return {
          ...data,
          data: data.data.filter((p) => !!parentId ? p.parentId === parentId : !p.parentId)
        }
      },
      providesTags: (_, __, parentId) => [
        { type: TAG_TYPE.Project, parentId: parentId ?? 'INITIAL' },
      ],
    }),
    getProject: builder.query({
      query: (id) => ({
        url: `projects/${id}`,
        method: 'GET',
      }),
      providesTags: (_, __, id) => [{ type: TAG_TYPE.Project, id }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetProjectsQuery, useLazyGetProjectsQuery, useGetProjectQuery } = projectsApi;
