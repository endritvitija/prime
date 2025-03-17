import { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { Paper } from '@mui/material';

// Task 1
function SalesByBrandChart({ salesData }) {
  const chartOptions = useMemo(() => {
    if (!salesData) {
      return null;
    }

    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
        valueFormatter: (value) => value.toFixed(2),
      },
      dataZoom: [
        {
          show: true,
          start: 0,
          end: 100,
        },
      ],
      xAxis: {
        type: 'category',
        data: [], // TODO: insert here
        axisLabel: {
          show: true,
          interval: 0,
          rotate: 90,
          overflow: 'truncate',
          width: 60,
        },
        axisTick: {
          alignWithLabel: true,
        },
      },
      grid: {
        bottom: '30%',
      },
      yAxis: {
        type: 'value',
      },
      series: [], // TODO: insert here
    };
  }, [salesData]);

  return (
    <>
      <Paper elevation={2} className='w-full h-96'>
        <ReactECharts
          option={chartOptions}
          style={{
            height: '100%',
            width: '100%',
          }}
        />
      </Paper>
    </>
  );
}

export default SalesByBrandChart;
