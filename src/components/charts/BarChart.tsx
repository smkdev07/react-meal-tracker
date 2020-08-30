import React from 'react';

import { ResponsiveBar, Data } from '@nivo/bar';

interface BarChartProps extends Data {
  keys: string[] | undefined;
  indexBy: string | undefined;
}

const BarChart = ({ data, keys, indexBy }: BarChartProps) => (
  <ResponsiveBar
    data={data}
    keys={keys}
    indexBy={indexBy}
    margin={{ top: 50, right: 25, bottom: 175, left: 75 }}
    padding={0.25}
    // colors={{ scheme: 'nivo' }}
    colors={(series) => series.data[`${series.id}Color`]}
    borderWidth={2}
    borderColor={{ from: 'color', modifiers: [['darker', 0.25]] }}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: -60,
      legend: '',
      legendPosition: 'middle',
      legendOffset: 0,
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Calories',
      legendPosition: 'middle',
      legendOffset: -50,
    }}
    labelSkipWidth={14}
    labelSkipHeight={14}
    labelTextColor="#fafafa"
    legends={[
      {
        dataFrom: 'keys',
        anchor: 'top',
        direction: 'row',
        justify: false,
        translateX: 0,
        translateY: -45,
        itemWidth: 125,
        itemHeight: 18,
        itemDirection: 'left-to-right',
        itemTextColor: '#000000de',
        itemOpacity: 0.85,
        symbolSize: 18,
        symbolShape: 'circle',
      },
    ]}
    isInteractive={false}
    animate={true}
    motionStiffness={90}
    motionDamping={15}
    theme={{
      axis: {
        ticks: {
          line: {
            stroke: '#00BFA6',
            strokeWidth: 2,
            strokeOpacity: 0.75,
          },
          text: {
            fontFamily: 'inherit',
            color: '#000000de',
            fontSize: 14,
          },
        },
        legend: {
          text: {
            fontFamily: 'inherit',
            fontSize: 14,
          },
        },
      },
      grid: {
        line: {
          stroke: '#000000de',
          strokeWidth: 1,
          strokeOpacity: 0.12,
        },
      },
      legends: {
        text: {
          fontFamily: 'inherit',
          fontSize: 14,
          textTransform: 'capitalize',
        },
      },
      labels: {
        text: {
          fontFamily: 'inherit',
          fontSize: 14,
        },
      },
    }}
  />
);

export default BarChart;
