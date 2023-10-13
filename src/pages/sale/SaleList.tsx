import React, { useState } from 'react';
import { Space, Table, Tag, Row, Col, Button, Input } from 'antd';
import { columns, data } from './SaleListTableColumn';
import { useNavigate } from "react-router-dom";
import {
    DoubleRightOutlined,
    LogoutOutlined,
    ReloadOutlined,
    PlusCircleOutlined,
    SearchOutlined
  } from "@ant-design/icons";
import AddSale from './AddSale';

const SaleList: React.FC = () => {
    const navigate = useNavigate();
    const [showDrawer, setShowDrawer] = useState(false);
    return <>
        {showDrawer ? <AddSale isShow={showDrawer} onDrawerClose={() => setShowDrawer(false) } /> : null }
        <Row style={{ marginBlock: '0.8rem' }} justify={{lg: "space-between"}}>
            <Col><Button type="primary" onClick={() => setShowDrawer(true)} icon={<PlusCircleOutlined />} >New Sale Order</Button></Col>
            <Col> <Space size={4} align="baseline" > <Input /> <Button type="primary" icon={<SearchOutlined />}>Search</Button> <Button icon={<ReloadOutlined />}>Reset</Button> </Space> </Col>
        </Row>
        {/* <Row> */}
            <Table columns={columns} dataSource={data} />
        {/* </Row> */}
    </>
};

export default SaleList;