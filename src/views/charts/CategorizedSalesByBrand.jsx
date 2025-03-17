import { Paper } from '@mui/material';
import ReactECharts from 'echarts-for-react';
import { useMemo } from 'react';

// Task 3
function CategorizedSalesByBrand({ salesData }) {
  const chartOptions = useMemo(() => {
    if (!salesData) {
      return null;
    }

    return {
      tooltip: {
        trigger: 'item',
        valueFormatter: (value) => value.toFixed(2),
      },
      series: {
        type: 'treemap',
        data: [], // TODO: add here
      },
    };
  }, [salesData]);

  return (
    <>
      <Paper elevation={2} className='w-full pb-4'>
        <ReactECharts option={chartOptions} />
      </Paper>
    </>
  );
}

export default CategorizedSalesByBrand;
