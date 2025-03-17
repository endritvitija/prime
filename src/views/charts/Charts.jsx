import { useGetSalesQuery } from '@/api/salesApi';
import SalesByBrandChart from './SalesByBrandChart';
import TopSoldCategories from './TopSoldCategories';
import CategorizedSalesByBrand from './CategorizedSalesByBrand';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import GeneralError from '../../components/organisms/EmptyContent/GeneralError';

function Charts() {
  const { t } = useTranslation();
  const { data: salesData, isError } = useGetSalesQuery();

  if (isError) {
    return <GeneralError />;
  }

  return (
    <div className='p-4'>
      {!salesData ? (
        <Typography variant='body1' className='mb-4'>
          {t('charts.loadingCharts')}
        </Typography>
      ) : (
        <>
          <Typography variant='h5' className='mb-4'>
            {t('charts.salesByBrand')}
          </Typography>
          <SalesByBrandChart salesData={salesData} />

          <Typography variant='h5' className='my-4'>
            {t('charts.topSoldCategories', { count: 4 })}
          </Typography>
          <TopSoldCategories salesData={salesData} />

          <Typography variant='h5' className='my-4'>
            {t('charts.categorizedSalesByBrand')}
          </Typography>
          <CategorizedSalesByBrand salesData={salesData} />
        </>
      )}
    </div>
  );
}

export default Charts;
