import React, { useState } from 'react';
import { DatePicker, Space, Segmented, TimeRangePickerProps } from 'antd';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

const { RangePicker } = DatePicker;

const Filters: React.FC = () => {
  const [showDateRange, setShowDateRange] = useState(false);

  const options: Array<{label: string, value: string}> = [
    {label: 'Daily', value: 'daily'},
    {label: 'Weekly', value: 'weekly'},
    {label: 'Monthly', value: 'monthly'},
    {label: 'Quarterly', value: 'quarterly'},
    {label: 'Yearly', value: 'yearly'},
    {label: 'Custom', value: 'custom'},
  ];
  
  const rangePresets: TimeRangePickerProps['presets'] = [
    { label: 'Last 7 Days', value: [dayjs().add(-7, 'd'), dayjs()] },
    { label: 'Last 14 Days', value: [dayjs().add(-14, 'd'), dayjs()] },
    { label: 'Last 30 Days', value: [dayjs().add(-30, 'd'), dayjs()] },
    { label: 'Last 90 Days', value: [dayjs().add(-90, 'd'), dayjs()] },
  ];

  const onRangeChange = (dates: null | (Dayjs | null)[], dateStrings: string[]) => {
    if (dates) {
      console.log('From: ', dates[0], ', to: ', dates[1]);
      console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
    } else {
      console.log('Clear');
    }
  };

  const onSegmentedChange = (val: any) => {
    console.log(val, 'abcd')
    val.toLowerCase() === 'custom' ? setShowDateRange(true) : setShowDateRange(false)
  }

  return (
    <>
      <Space>
        <Segmented onChange={(val) => onSegmentedChange(val)} options={options} />
        {showDateRange ? <RangePicker presets={rangePresets} onChange={onRangeChange} /> : null} 
      </Space>
    </>
  );
}

export default Filters;