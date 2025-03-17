import { useMemo } from 'react';
import { Paper } from '@mui/material';
import ReactECharts from 'echarts-for-react';

// Task 2
function TopSoldCategories({ salesData }) {
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
        type: 'pie',
        data: [], // TODO: add here
      },
    };
  }, [salesData]);

  return (
    <>
      <Paper elevation={2} className='w-full'>
        <ReactECharts option={chartOptions} />
      </Paper>
    </>
  );
}

export default TopSoldCategories;
