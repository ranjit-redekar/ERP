import React from 'react';
import { Space, Table, Tag, Row, Col, Button, Input } from 'antd';
import { useNavigate } from "react-router-dom";
import {
    DoubleRightOutlined,
    LogoutOutlined,
    ReloadOutlined,
    PlusCircleOutlined,
    SearchOutlined
  } from "@ant-design/icons";
import { columns, data } from './InventoryListTableColumn';

const InventoryList: React.FC = () => {
    const navigate = useNavigate();
    return <>
        <Row></Row>
        <Row style={{ marginBlock: '0.8rem' }} justify={{lg: "space-between"}}>
            <Col><Button type="primary" onClick={() => navigate('/home/sales/new-sale-order')} icon={<PlusCircleOutlined />}>Add Product</Button></Col>
            <Col> <Space size={4} align="baseline" > <Input /> <Button type="primary" icon={<SearchOutlined />}>Search</Button> <Button icon={<ReloadOutlined />}>Reset</Button> </Space> </Col>
        </Row>
        {/* <Row> */}
            <Table columns={columns} dataSource={data} />
        {/* </Row> */}
    </>
};

export default InventoryList;