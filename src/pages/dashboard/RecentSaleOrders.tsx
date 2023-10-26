import React from 'react';
import { Table, Result, Space } from 'antd';
import { Link } from 'react-router-dom';

const RecentSaleOrders: React.FC = () => {
  const dataSource = [
    {
      key: '1',
      customer_name: 'Ram',
      products: 4,
      price: '2500',
      date_time: ""
    },
    {
      key: '2',
      customer_name: 'Shyam',
      products: 8,
      price: '2000',
      date_time: ''
    },
  ];

  const columns = [
    {
      title: 'Customer Name',
      dataIndex: 'customer_name',
      key: 'customer_name',
    },
    {
      title: 'Products',
      dataIndex: 'products',
      key: 'products',
    },
    {
      title: 'Purchased Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Date and Time',
      dataIndex: 'date_time',
      key: 'date_time',
    },
  ];
  return (
      <div>
        <div style={{ display: 'Flex', justifyContent: "space-between", alignItems: 'center' }} >
            <h4 style={{ margin: '12px 4px' }} >Recent sale orders</h4><a>View more</a>
          </div>
        <Table bordered dataSource={dataSource} columns={columns} size="small" pagination={false} />
      </div>
  );
}

export default RecentSaleOrders;