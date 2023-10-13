import React from 'react';
import { Space, Table, Tag, Row, Col, Button, Input } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
    key: string;
    product_name: string;
    stock: number;
    description: string;
    categories: string[];
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Product Name',
        dataIndex: 'product_name',
        key: 'product_name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        // responsive: ['xs'],
    },
    {
        title: 'Stock',
        dataIndex: 'stock',
        key: 'stock',
        // responsive: ['xs'],
    },
    {
        title: 'Category',
        key: 'category',
        dataIndex: 'tacategorygs',
        render: (_, { categories }) => (
            <>
                {categories.map((tag) => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
        // responsive: ['xs'],
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <a>Invite {record.product_name}</a>
                <a>Delete</a>
            </Space>
        ),
    },
];
const data: DataType[] = [
    {
        key: '1',
        product_name: 'John Brown',
        stock: 32,
        description: 'New York No. 1 Lake Park',
        categories: ['nice', 'developer'],
    },
    {
        key: '2',
        product_name: 'Jim Green',
        stock: 42,
        description: 'London No. 1 Lake Park',
        categories: ['loser'],
    },
    {
        key: '3',
        product_name: 'Joe Black',
        stock: 32,
        description: 'Sydney No. 1 Lake Park',
        categories: ['cool', 'teacher'],
    },
];
export { columns, data }
