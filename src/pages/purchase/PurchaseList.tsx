import React from 'react';
import { Space, Table, Tag, Row, Col, Button, Input } from 'antd';
import { columns, data } from './PurchaseListTableColumn';
import { useNavigate } from "react-router-dom";
import {
    DoubleRightOutlined,
    LogoutOutlined,
    ReloadOutlined,
    PlusCircleOutlined,
    SearchOutlined
  } from "@ant-design/icons";


const PurchaseList: React.FC = () => {
    const navigate = useNavigate();
    return <>
        <Row></Row>
        <Row style={{ marginBlock: '0.8rem' }} justify={{lg: "space-between"}}>
            <Col><Button type="primary" onClick={() => navigate('/home/sales/new-sale-order')} icon={<PlusCircleOutlined />} >New Purchase Order</Button></Col>
            <Col> <Space size={4} align="baseline" > <Input /> <Button type="primary" icon={<SearchOutlined />}>Search</Button> <Button icon={<ReloadOutlined />}>Reset</Button> </Space> </Col>
        </Row>
        <Row><h4>Purchase List</h4></Row>
        {/* <Row> */}
            <Table columns={columns} dataSource={data} />
        {/* </Row> */}
    </>
};

export default PurchaseList;