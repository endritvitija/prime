import { useGetProjectQuery } from '@/api/projectsApi';
import AssetCard from '@/components/molecules/AssetCard/AssetCard';
import { ArrowBack } from '@mui/icons-material';
import { Divider, Grid, IconButton, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import GeneralError from '../../components/organisms/EmptyContent/GeneralError';
import { useEffect, useState } from 'react';

function Project() {
  const { t } = useTranslation();
  const { projectId } = useParams();
  const [assets, setAssets] = useState()

  const {
    data: project,
    isFetching,
    isError,
  } = useGetProjectQuery(projectId, {
    refetchOnMountOrArgChange: true,
    skip: !projectId,
  });

  useEffect(() => {
    if(!project?.assets) {
      return
    }
    setAssets(project.assets)
  }, [project])

  if (isError) {
    return <GeneralError />;
  }

  const onDelete = (assetId) => {
    setAssets((prev) => prev.filter(a => a.id !== assetId))
  }

  return (
    <div className='p-4'>
      <Stack direction='row' alignItems='center' spacing={1}>
        <Link to='/'>
          <IconButton color='info'>
            <ArrowBack />
          </IconButton>
        </Link>
        <Typography variant='h4'>{t('projectDetails')}</Typography>
      </Stack>

      {isFetching && <Typography variant='body1'>{t('loadingProjectDetails')}</Typography>}

      {project && (
        <div>
          <Typography variant='h4'>{project.name}</Typography>
          <Typography variant='body1'>{project.description}</Typography>

          {!!assets?.length && (
            <>
              <Divider className='my-4' />
              <Typography variant='h5' className='mb-2'>
                {t('assets')}
              </Typography>

              <Grid container spacing={2}>
                {assets.map((asset, index) => (
                  <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                    <AssetCard asset={asset} onDelete={() => onDelete(asset.id)} />
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Project;
