import { StatisticCard } from '@ant-design/pro-components';
import RcResizeObserver from 'rc-resize-observer';
import { useState } from 'react';
import { PurschaseIcon, RupeeIcon, SaleIcon } from '../../common/Icons';
import {
  theme,Col, Row , Divider
} from "antd";
import './Dashboard.scss';
import RecentSaleOrders from './RecentSaleOrders';
import Filters from './Filters';
import LowerStock from './LowerStock';

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
      <Filters />
      <Divider />
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
              description: "description",
              icon: <SaleIcon fill="blue" />
            }}
          />
          <StatisticCard
            className='erp-dashboard-card'
            style={{ boxShadow: token.boxShadow }}
            statistic={{
              title: 'Purchase',
              value: 10000,
              description: "description",
              icon:<PurschaseIcon fill="red" /> 
            }}
          />
          <StatisticCard
            className='erp-dashboard-card'
            style={{ boxShadow: token.boxShadow }}
            statistic={{
              title: 'Profit',
              value: 10000,
              description: "description",
              icon: <RupeeIcon fill="green" />
            }}
          />
        </StatisticCard.Group>
      <Divider />
      
      <Row gutter={[30, 0]}>
        <Col span={18} ><RecentSaleOrders /></Col>
        <Col span={6} ><LowerStock /></Col>
      </Row>
    </RcResizeObserver>
  );
};
