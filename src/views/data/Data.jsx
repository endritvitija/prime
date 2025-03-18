import { useGetSalesQuery } from '@/api/salesApi.js';
import {
  Button,
  Grid,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  LinearProgress,
} from '@mui/material';
import GeneralError from '@/components/organisms/EmptyContent/GeneralError.jsx';
import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import AssetContainer from '@/components/molecules/AssetCard/AssetContainer.jsx';
import { Add } from '@mui/icons-material';
import { useSearchParams } from 'react-router-dom';
import usePermissions from '@/hooks/usePermissions';

const asset = {
  name: 'Title',
};

const ITEMS_PER_PAGE = 50;

const CATEGORY_OPTIONS = ['MOGAS', 'Diesel', 'Tobacco', 'LPG'];
const CUSTOMER_SEGMENT_OPTIONS = ['Families', 'Students', 'Elderly People', 'Young Adults'];
const SORT_OPTIONS = ['volume', 'numberOfTransactions'];

function AssetItem({ id, brandName, categoryName, customerSegment, volume, numberOfTransactions }) {
  const [count, setCount] = useState(0);
  const { permissions, loading, error } = usePermissions();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogTitle, setDialogTitle] = useState('');

  const onIncrease = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const onDelete = () => {
    if (permissions.canDeleteAsset) {
      setDialogTitle('Asset Deleted');
      setDialogMessage(`Asset ${id} has been successfully deleted.`);
      setDialogOpen(true);
      console.log('Deleting asset...');
    } else {
      setDialogTitle('Permission Denied');
      setDialogMessage('You do not have permission to delete this asset.');
      setDialogOpen(true);
      console.log('No permission to delete asset');
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <AssetContainer asset={asset} className='h-full' onDelete={onDelete}>
        <div>
          {id}: {brandName} - {categoryName} - {count}
        </div>
        {customerSegment && <div>Customer Segment: {customerSegment}</div>}
        {volume && <div>Volume: {volume}</div>}
        {numberOfTransactions && <div>Transactions: {numberOfTransactions}</div>}
        <Button onClick={onIncrease} startIcon={<Add />}>
          Increment
        </Button>
      </AssetContainer>

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color='primary' autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

function Data() {
  const { data, isFetching, isError } = useGetSalesQuery(null, { refetchOnMountOrArgChange: true });
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
  const observerTarget = useRef(null);
  const [loadingMore, setLoadingMore] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const [categoryFilter, setCategoryFilter] = useState(searchParams.get('category') || '');
  const [customerSegmentFilter, setCustomerSegmentFilter] = useState(
    searchParams.get('segment') || '',
  );
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || '');
  const [sortOrder, setSortOrder] = useState(searchParams.get('sortOrder') || 'asc');

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (categoryFilter) {
      params.set('category', categoryFilter);
    } else {
      params.delete('category');
    }

    if (customerSegmentFilter) {
      params.set('segment', customerSegmentFilter);
    } else {
      params.delete('segment');
    }

    if (sortBy) {
      params.set('sortBy', sortBy);
      params.set('sortOrder', sortOrder);
    } else {
      params.delete('sortBy');
      params.delete('sortOrder');
    }

    setSearchParams(params);
  }, [categoryFilter, customerSegmentFilter, sortBy, sortOrder, setSearchParams]);

  const filteredAndSortedData = useMemo(() => {
    if (!data) return [];

    let result = [...data];

    if (categoryFilter) {
      result = result.filter((item) => item.categoryName === categoryFilter);
    }

    if (customerSegmentFilter) {
      result = result.filter((item) => item.customerSegment === customerSegmentFilter);
    }

    if (sortBy) {
      result.sort((a, b) => {
        const valueA = a[sortBy] || 0;
        const valueB = b[sortBy] || 0;

        return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
      });
    }

    return result;
  }, [data, categoryFilter, customerSegmentFilter, sortBy, sortOrder]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          filteredAndSortedData &&
          visibleItems < filteredAndSortedData.length
        ) {
          setLoadingMore(true);
          setTimeout(() => {
            setVisibleItems((prev) => Math.min(prev + ITEMS_PER_PAGE, filteredAndSortedData.length));
            setLoadingMore(false);
          }, 500);
        }
      },
      { threshold: 0.1 },
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
  }, [filteredAndSortedData, visibleItems]);

  useEffect(() => {
    setVisibleItems(ITEMS_PER_PAGE);
  }, [categoryFilter, customerSegmentFilter, sortBy, sortOrder]);

  const handleCategoryChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  const handleCustomerSegmentChange = (event) => {
    setCustomerSegmentFilter(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  useEffect(() => {
    document.title = 'Data';
    return () => {
      document.title = 'Prime Interview Assignment';
    };
  }, []);

  if (isFetching && !data) {
    return <CircularProgress className='m-auto' />;
  }

  if (isError) {
    return <GeneralError />;
  }

  if (!data) {
    return (
      <>
        {isFetching && <LinearProgress />}
        {!isFetching && <></>}
      </>
    );
  }

  const visibleData = filteredAndSortedData.slice(0, visibleItems);

  return (
    <>
      {isFetching && (
        <LinearProgress
          color='success'
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
          }}
        />
      )}
      <div className='p-4'>
        <Box sx={{ mb: 4 }}>
          <Typography variant='h5' sx={{ mb: 2 }}>
            Filters and Sorting
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select value={categoryFilter} label='Category' onChange={handleCategoryChange}>
                  <MenuItem value=''>All Categories</MenuItem>
                  {CATEGORY_OPTIONS.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>Customer Segment</InputLabel>
                <Select
                  value={customerSegmentFilter}
                  label='Customer Segment'
                  onChange={handleCustomerSegmentChange}
                >
                  <MenuItem value=''>All Segments</MenuItem>
                  {CUSTOMER_SEGMENT_OPTIONS.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>Sort By</InputLabel>
                <Select value={sortBy} label='Sort By' onChange={handleSortChange}>
                  <MenuItem value=''>No Sorting</MenuItem>
                  {SORT_OPTIONS.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {sortBy && (
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  variant='outlined'
                  onClick={toggleSortOrder}
                  fullWidth
                  sx={{ height: '56px' }}
                >
                  Order: {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
                </Button>
              </Grid>
            )}
          </Grid>
        </Box>

        <Grid container spacing={2}>
          {visibleData.map(
            ({ id, brandName, categoryName, customerSegment, volume, numberOfTransactions }) => (
              <Grid item key={id} xs={12} sm={6} md={4} lg={3}>
                <AssetItem
                  id={id}
                  brandName={brandName}
                  categoryName={categoryName}
                  customerSegment={customerSegment}
                  volume={volume}
                  numberOfTransactions={numberOfTransactions}
                />
              </Grid>
            ),
          )}
          {visibleItems < filteredAndSortedData.length && (
            <Grid item xs={12} ref={observerTarget}>
              {loadingMore && (
                <LinearProgress
                  color='success'
                  sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 9999,
                  }}
                />
              )}
            </Grid>
          )}
        </Grid>
      </div>
    </>
  );
}

export default Data;
