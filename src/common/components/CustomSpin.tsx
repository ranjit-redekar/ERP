import React from 'react';
import { Spin } from 'antd';

interface CustomSpinProps {
  spinning: boolean;
}

const CustomSpin: React.FC<CustomSpinProps> = ({ spinning }) => (
  <div
    style={{ 
      position: 'fixed', 
      top: 0, 
      right: 0, 
      bottom: 0, 
      left: 0, 
      zIndex: 1010, // Make sure this is higher than the Drawer's z-index
      display: spinning ? 'flex' : 'none',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'rgba(255, 255, 255, 0.8)' // Optional: for better visibility
    }}
  >
    <Spin spinning={spinning} />
  </div>
);

export default CustomSpin;
