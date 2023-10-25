import { StatisticCard } from '@ant-design/pro-components';
import RcResizeObserver from 'rc-resize-observer';
import { useState } from 'react';
import { PurschaseIcon, RupeeIcon, SaleIcon } from '../../common/Icons';
import {
  theme,
} from "antd";
import './Dashboard.scss';

const { Statistic } = StatisticCard;

export default () => {
  const [responsive, setResponsive] = useState(false);
  const { token } = theme.useToken();
console.log("AAAAAA", token)
  return (
    <RcResizeObserver
      key="resize-observer"
      onResize={(offset) => {
        setResponsive(offset.width < 596);
      }}
    >
      {/* <ProCard split={responsive ? 'horizontal' : 'vertical'}> */}
        <StatisticCard.Group
          colSpan={responsive ? 24 : 18}
          direction={responsive ? 'column' : undefined}
          className='erp-StatisticCard-group'
        >
          <StatisticCard
            className='erp-dashboard-card'
            style={{ boxShadow: token.boxShadow }}
            statistic={{
              title: 'Sale',
              value: 1000,
              description: <Statistic title="Percentage" value="61.5%" />,
              icon: <SaleIcon fill="blue" />,
              // tip:"tip"
              valueStyle:{color: 'red' }
            }}
          />
          <StatisticCard
            className='erp-dashboard-card'
            style={{ boxShadow: token.boxShadow }}
            statistic={{
              title: 'Purchase',
              value: 10000,
              description: <Statistic title="Percentage" value="61.5%" />,
              icon:<PurschaseIcon fill="red" /> 
            }}
          />
          <StatisticCard
            className='erp-dashboard-card'
            style={{ boxShadow: token.boxShadow }}
            statistic={{
              title: 'Profit',
              value: 10000,
              description: <Statistic title="Percentage" value="38.5%" />,
              icon: <RupeeIcon fill="green" />
            }}
          />
        </StatisticCard.Group>
      {/* </ProCard> */}
    </RcResizeObserver>
  );
};
