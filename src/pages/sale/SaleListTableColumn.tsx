import React from 'react';
import { Space, Table, Tag, Row, Col, Button, Input, Dropdown } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { MenuProps } from 'antd';
import {
    EditOutlined,
    DownOutlined,
    EyeOutlined,
    DeleteOutlined,
    PlusOutlined,
    MoreOutlined
  } from "@ant-design/icons";

interface DataType {
    key: string;
    product_name: string;
    stock: number;
    description: string;
    categories: string[];
}
const items: MenuProps['items'] = [
    { key: 'view', label: 'View', icon: <EyeOutlined /> },
    { key: 'edit', label: 'Edit', icon: <EditOutlined /> },
    { key: 'delete', label: 'Delete', icon: <DeleteOutlined />, danger: true, },
];

const columns: ColumnsType<DataType> = [
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Sale Voice Number',
        dataIndex: 'description',
        key: 'description',
        // responsive: ['xs'],
    },
    {
        title: 'Customer Name',
        dataIndex: 'stock',
        key: 'stock',
        // responsive: ['xs'],
    },
    {
        title: 'Payment',
        key: 'payment',
        dataIndex: 'payment',
        render: (_, { categories }) => (
            <>
                {categories.map((tag) => {
                    let color = tag === 'paid' ? 'success' : 'error';
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        )
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <Dropdown menu={{items}} ><MoreOutlined /></Dropdown>
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
        categories: ['paid'],
    },
    {
        key: '2',
        product_name: 'Jim Green',
        stock: 42,
        description: 'London No. 1 Lake Park',
        categories: ['unpaid'],
    },
    {
        key: '3',
        product_name: 'Joe Black',
        stock: 32,
        description: 'Sydney No. 1 Lake Park',
        categories: ['paid'],
    },
];
export { columns, data }
