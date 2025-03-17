import { useGetProjectsQuery, useLazyGetProjectsQuery } from '@/api/projectsApi';
import { ChevronRight, ExpandMore } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { TreeView } from '@mui/x-tree-view';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RecursiveTreeItem, { emptyPrefix, loadingPrefix } from './RecursiveProjectItem';
import { useTranslation } from 'react-i18next';
import GeneralError from '../../components/organisms/EmptyContent/GeneralError';

function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    data,
    isFetching: isFetchingInitialProjects,
    isError,
  } = useGetProjectsQuery(null, {
    refetchOnMountOrArgChange: true,
  });
  const {data: projects = []} = data || {}
  const [getProjects, { isFetching: isFetchingChildren }] = useLazyGetProjectsQuery();
  const [projectChildrenMap, setProjectChildrenMap] = useState({});

  function onProjectSelect(_, projectId) {
    if (projectId.startsWith(emptyPrefix) || projectId.startsWith(loadingPrefix)) return;

    navigate(`/projects/${projectId}`);
  }

  async function onProjectToggle(_, projectIds) {
    const parentId = projectIds[0];

    if (!parentId || projectChildrenMap[parentId]) {
      return;
    }

    try {
      const {data: projects} = await getProjects(parentId).unwrap();
      setProjectChildrenMap((prev) => ({ ...prev, [parentId]: projects }));
    } catch (error) {
      console.error('Failed to fetch children', error);
    }
  }

  if (isError) {
    return <GeneralError />;
  }

  return (
    <div className='p-4'>
      <Typography variant='h4' className='mb-4'>
        {t('projects')}
      </Typography>
      {isFetchingInitialProjects ? (
        <Typography variant='body1' className='mb-4'>
          {t('loadingProjects')}
        </Typography>
      ) : !projects?.length ? (
        <Typography variant='body1' className='mb-4'>
          {t('noProjects')}
        </Typography>
      ) : (
        <TreeView
          defaultCollapseIcon={<ExpandMore />}
          defaultExpandIcon={<ChevronRight />}
          onNodeSelect={onProjectSelect}
          onNodeToggle={onProjectToggle}
          disableSelection={isFetchingChildren}
        >
          {projects.map((project) => (
            <RecursiveTreeItem
              key={project.id}
              project={project}
              childrenMap={projectChildrenMap}
              disabled={isFetchingChildren}
            />
          ))}
        </TreeView>
      )}
    </div>
  );
}

export default Home;
