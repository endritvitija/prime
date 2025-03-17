
import { useGetSalesQuery } from '@/api/salesApi.js';
import { Button, Grid, CircularProgress } from '@mui/material';
import GeneralError from '@/components/organisms/EmptyContent/GeneralError.jsx';
import { useState, useCallback, useRef, useEffect } from 'react';
import AssetContainer from '@/components/molecules/AssetCard/AssetContainer.jsx';
import { Add } from '@mui/icons-material';

const asset = {
  name: 'Title',
};

const ITEMS_PER_PAGE = 50;

function AssetItem({ id, brandName, categoryName }) {
  const [count, setCount] = useState(0);
  
  const onIncrease = () => {
    setCount(prevCount => prevCount + 1);
  };
  
  return (
    <AssetContainer asset={asset}>
      <div>
        {id}: {brandName} - {categoryName} - {count}
      </div>
      <Button
        onClick={onIncrease}
        startIcon={<Add />}
      >
        Increment
      </Button>
    </AssetContainer>
  );
}

function Data() {
  const { data, isFetching, isError } = useGetSalesQuery(null, { refetchOnMountOrArgChange: true });
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
  const observerTarget = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && data && visibleItems < data.length) {
          setVisibleItems((prev) => Math.min(prev + ITEMS_PER_PAGE, data.length));
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [data, visibleItems]);

  if (isFetching && !data) {
    return <CircularProgress className="m-auto" />;
  }

  if (isError) {
    return <GeneralError />;
  }

  if (!data) {
    return <></>;
  }

  const visibleData = data.slice(0, visibleItems);

  return (
    <Grid className='p-4' container spacing={2}>
      {visibleData.map(({ id, brandName, categoryName }) => (
        <Grid item key={id} xs={12} sm={6} md={4} lg={3}>
          <AssetItem 
            id={id}
            brandName={brandName}
            categoryName={categoryName}
          />
        </Grid>
      ))}
      {visibleItems < data.length && (
        <Grid item xs={12} ref={observerTarget}>
          <CircularProgress size={30} />
        </Grid>
      )}
    </Grid>
  );
}

export default Data;

