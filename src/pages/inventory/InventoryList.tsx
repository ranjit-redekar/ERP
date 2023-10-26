import React, { useState } from 'react';
import { Space, Table, FloatButton, Row, Col, Button, Input } from 'antd';
import { columns, data } from './InventoryListTableColumn';
import {
    PlusOutlined,
    ReloadOutlined,
    PlusCircleOutlined,
    SearchOutlined
  } from "@ant-design/icons";
import AddInventory from './AddInventory';
import useScreenSize from '../../common/hooks/useScreenSize';

const InventoryList: React.FC = () => {
    const [showDrawer, setShowDrawer] = useState(false);
    const screenSize = useScreenSize();
    return <>
        {showDrawer ? <AddInventory isShow={showDrawer} onDrawerClose={() => setShowDrawer(false) } /> : null }
        <Row style={{ marginBlock: '0.8rem' }} justify={{lg: "space-between"}}>
            {screenSize === "mobile" ? null : <Col><Button type="primary" onClick={() => setShowDrawer(true)} icon={<PlusCircleOutlined />} >Add Product</Button></Col>}
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

export default InventoryList;