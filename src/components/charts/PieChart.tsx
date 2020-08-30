import React from 'react';

import { ResponsivePie, Data } from '@nivo/pie';

const PieChart = ({ data }: Data) => (
  <ResponsivePie
    data={data}
    margin={{ top: 25, right: 25, bottom: 50, left: 25 }}
    sortByValue={false}
    innerRadius={0.025}
    padAngle={0.025}
    cornerRadius={2}
    // colors={{ scheme: 'nivo' }}
    colors={(data) => data.color.toString()}
    borderWidth={2}
    borderColor={{ from: 'color', modifiers: [['darker', 0.25]] }}
    enableRadialLabels={false}
    slicesLabelsSkipAngle={0}
    slicesLabelsTextColor="#fafafa"
    sliceLabel={(data) => data.sliceLabel.toString()}
    isInteractive={false}
    animate={true}
    motionStiffness={90}
    motionDamping={15}
    legends={[
      {
        anchor: 'bottom',
        direction: 'row',
        translateY: 25,
        itemWidth: 125,
        itemHeight: 18,
        itemTextColor: '#000000de',
        itemOpacity: 0.85,
        symbolSize: 18,
        symbolShape: 'circle',
      },
    ]}
    theme={{
      legends: {
        text: {
          fontFamily: 'inherit',
          fontSize: 14,
        },
      },
      labels: {
        text: {
          fontFamily: 'inherit',
          fontSize: 20,
        },
      },
    }}
  />
);

export default PieChart;
