import React from 'react';
import { Table, Result, Space, Flex } from 'antd';
import { Link } from 'react-router-dom';

const LowerStock: React.FC = () => {
    const dataSource = [
        {
            key: '1',
            product_name: 'Item 1',
            available_stock: 4,
        },
        {
            key: '2',
            product_name: 'Item 2',
            available_stock: 8,
        },
    ];

    const columns = [
        {
            title: 'Customer Name',
            dataIndex: 'product_name',
            key: 'product_name',
        },
        {
            title: 'Available Stock',
            dataIndex: 'available_stock',
            key: 'available_stock',
        }
    ];
    return (
        <div>
            <div style={{ display: 'Flex', justifyContent: "space-between", alignItems: 'center' }} >
                <h4 style={{ margin: '12px 4px' }} >Lower Stock</h4><a>View more</a>
            </div>
            <Table bordered dataSource={dataSource} columns={columns} size="small" pagination={false} />
        </div>
    );
}

export default LowerStock;