import React, { useState } from 'react';
import { Space, Table, FloatButton, Row, Col, Button, Input } from 'antd';
import { columns, data } from './PurchaseListTableColumn';
import {
    PlusOutlined,
    ReloadOutlined,
    PlusCircleOutlined,
    SearchOutlined
} from "@ant-design/icons";
import AddPurchase from './AddPurchase';
import useScreenSize from '../../common/hooks/useScreenSize';

const PurchaseList: React.FC = () => {
    const [showDrawer, setShowDrawer] = useState(false);
    const screenSize = useScreenSize();
    return <>
        {showDrawer ? <AddPurchase isShow={showDrawer} onDrawerClose={() => setShowDrawer(false)} /> : null}
        <Row style={{ marginBlock: '0.8rem' }} justify={{ lg: "space-between" }}>
            {screenSize === "mobile" ? null : <Col><Button type="primary" onClick={() => setShowDrawer(true)} icon={<PlusCircleOutlined />} >New Purchase Order</Button></Col>}
            <Col> <Space size={4} align="baseline" > <Input /> <Button type="primary" icon={<SearchOutlined />}>Search</Button> <Button icon={<ReloadOutlined />}>Reset</Button> </Space> </Col>
        </Row>
        <Table columns={columns} dataSource={data} />
        {screenSize === "mobile" ? <FloatButton
            onClick={() => setShowDrawer(true)}
            type="primary"
            icon={<PlusOutlined />}
            tooltip="New purchase order"
        /> : null}
    </>
};

export default PurchaseList;