import React from 'react';
import { ProColumns } from '@ant-design/pro-table';

// Utility function to format the number as INR currency
function formatNumberAsINRCurrency(amount: number) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
}

interface InventoryItem {
    id: string;
    name: string;
    unit: string;
    hsnCode: string;
    taxRate: number;
    sellingPrice: number;
    description?: string;
  }

const data: InventoryItem[] = [
    {
      id: '1',
      name: 'Laptop',
      unit: 'pcs',
      hsnCode: '8471',
      taxRate: 18,
      sellingPrice: 45000,
      description: 'High-performance laptop',
    },
    {
      id: '2',
      name: 'Mobile Phone',
      unit: 'pcs',
      hsnCode: '8517',
      taxRate: 12,
      sellingPrice: 15000,
      description: 'Latest Android smartphone',
    },
    {
      id: '3',
      name: 'Bluetooth Headphones',
      unit: 'pcs',
      hsnCode: '8518',
      taxRate: 18,
      sellingPrice: 3000,
      description: 'Noise-cancelling headphones',
    },
    {
      id: '4',
      name: 'LED Monitor',
      unit: 'pcs',
      hsnCode: '8528',
      taxRate: 18,
      sellingPrice: 7000,
      description: '24-inch LED monitor',
    },
    {
      id: '5',
      name: 'Wireless Mouse',
      unit: 'pcs',
      hsnCode: '8471',
      taxRate: 18,
      sellingPrice: 800,
      description: 'Ergonomic wireless mouse',
    },
    {
      id: '6',
      name: 'Keyboard',
      unit: 'pcs',
      hsnCode: '8471',
      taxRate: 18,
      sellingPrice: 1200,
      description: 'Mechanical keyboard',
    },
    {
      id: '7',
      name: 'Webcam',
      unit: 'pcs',
      hsnCode: '8525',
      taxRate: 18,
      sellingPrice: 2500,
      description: 'HD webcam for video calls',
    },
    {
      id: '8',
      name: 'USB Flash Drive',
      unit: 'pcs',
      hsnCode: '8523',
      taxRate: 12,
      sellingPrice: 500,
      description: '32GB USB 3.0 flash drive',
    },
    {
      id: '9',
      name: 'External Hard Drive',
      unit: 'pcs',
      hsnCode: '8471',
      taxRate: 18,
      sellingPrice: 5000,
      description: '1TB portable hard drive',
    },
    {
      id: '10',
      name: 'Printer',
      unit: 'pcs',
      hsnCode: '8443',
      taxRate: 18,
      sellingPrice: 15000,
      description: 'All-in-one color printer',
    },
  ];
  
  
  const columns: ProColumns<InventoryItem>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      hideInSearch: true,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Unit',
      dataIndex: 'unit',
      key: 'unit',
      hideInSearch: true,
    },
    {
      title: 'HSN Code',
      dataIndex: 'hsnCode',
      key: 'hsnCode',
    },
    {
      title: 'Tax Rate',
      dataIndex: 'taxRate',
      key: 'taxRate',
      valueType: 'percent',
      hideInSearch: true,
    },
    {
      title: 'Selling Price',
      dataIndex: 'sellingPrice',
      key: 'sellingPrice',
      render: (text: number) => formatNumberAsINRCurrency(text),
      hideInSearch: true,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      hideInSearch: true,
    },
    // Add actions if necessary
  ];
export { columns, data }
