import { useGetSalesQuery } from '@/api/salesApi.js';
import { Button, Grid } from '@mui/material';
import GeneralError from '@/components/organisms/EmptyContent/GeneralError.jsx';
import { useState } from 'react';
import AssetContainer from '@/components/molecules/AssetCard/AssetContainer.jsx';
import { Add } from '@mui/icons-material';

const asset = {
  name: 'Title',
};

function Data() {
  const { data, isFetching, isError } = useGetSalesQuery(null, { refetchOnMountOrArgChange: true });
  const [countData, setCountData] = useState({});

  if (isFetching) {
    return <></>;
  }

  if (isError) {
    return <GeneralError />;
  }

  const onIncrease = (id) => {
    setCountData((prev) => ({
      ...prev,
      [id]: (prev[id] ?? 0) + 1,
    }));
  };

  return (
    <Grid className='p-4' container spacing={2}>
      {data.map(({ id, brandName, categoryName }) => (
        <Grid item key={id} xs={12} sm={6} md={4} lg={3}>
          <AssetContainer asset={asset}>
            <div>
              {id}: {brandName} - {categoryName} - {countData[id] ?? 0}
            </div>
            <Button
              onClick={() => onIncrease(id)}
              startIcon={<Add />}
            >
              Increment
            </Button>
          </AssetContainer>
        </Grid>
      ))}
    </Grid>
  );
}

export default Data;
