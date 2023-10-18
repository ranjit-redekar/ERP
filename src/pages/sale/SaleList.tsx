import React, { useState } from 'react';
import { Space, Table, FloatButton, Row, Col, Button, Input } from 'antd';
import { columns, data } from './SaleListTableColumn';
import { useNavigate } from "react-router-dom";
import {
    DoubleRightOutlined,
    PlusOutlined,
    ReloadOutlined,
    PlusCircleOutlined,
    SearchOutlined
  } from "@ant-design/icons";
import AddSale from './AddSale';
import useScreenSize from '../../common/hooks/useScreenSize';

const SaleList: React.FC = () => {
    const [showDrawer, setShowDrawer] = useState(false);
    const screenSize = useScreenSize();
    return <>
        {showDrawer ? <AddSale isShow={showDrawer} onDrawerClose={() => setShowDrawer(false) } /> : null }
        <Row style={{ marginBlock: '0.8rem' }} justify={{lg: "space-between"}}>
            {screenSize === "mobile" ? null : <Col><Button type="primary" onClick={() => setShowDrawer(true)} icon={<PlusCircleOutlined />} >New Sale Order</Button></Col>}
            <Col> <Space size={4} align="baseline" > <Input /> <Button type="primary" icon={<SearchOutlined />}>Search</Button> <Button icon={<ReloadOutlined />}>Reset</Button> </Space> </Col>
        </Row>
        <Table columns={columns} dataSource={data} />
        {screenSize === "mobile" ? <FloatButton
        // shape="square"
        onClick={() => setShowDrawer(true)}
        type="primary"
        // style={{ right: 30, bottom: 30}}
        icon={<PlusOutlined />}
        tooltip="New sale order"
      /> : null}
    </>
};

export default SaleList;