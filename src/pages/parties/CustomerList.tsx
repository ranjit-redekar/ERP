import React, { useState, useEffect } from "react";
import {
  Button,
  Space,
  Avatar,
  Divider,
  List,
  Skeleton,
  Dropdown,
  Typography,
  Row,
  Col,
} from "antd";
import { MailOutlined } from "@ant-design/icons";
import Customer from "./Customer";
import InfiniteScroll from "react-infinite-scroll-component";
import { DownOutlined, MoreOutlined, PhoneOutlined } from "@ant-design/icons";
import useScreenSize from "../../common/hooks/useScreenSize";
import Filter from "../../common/components/Filter";
import { showConfirm, getActions } from "../../common/components/Utils";

type Geo = {
  lat: string;
  lng: string;
};

type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
};

type Company = {
  name: string;
  catchPhrase: string;
  bs: string;
};

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
};

const CustomerList: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<User[]>([]);
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedAction, setSelectedAction] = useState("new");
  const [selectedRowData, setSelectedListRowData] = useState(null);
  const screenSize = useScreenSize();

  console.log(selectedRowData, "selectedRowData");
  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((result) => {
        setData([...data, ...result]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onActionChange = (val: User | null, action: string) => {
    if (val) {
      setSelectedListRowData({
        name: val?.name,
        phoneNumber: "9876543210",
        email: val?.email,
        gstNumber: "27ABCDE1234F1Z5",
        panNumber: "ABCDE1234F",
      });
    } else {
      setSelectedListRowData(null);
    }
    setSelectedAction(action);
    if (action === "Delete") {
      showConfirm({
        onCancel: () => setSelectedListRowData(null),
        onOk: () => setSelectedListRowData(null),
      });
    } else {
      setShowDrawer(true);
    }
    console.log(val, action);
  };

  useEffect(() => {
    loadMoreData();
  }, []);
  console.log(data, "data");
  return (
    <>
      <Customer
        isShow={showDrawer}
        selectedAction={selectedAction}
        onDrawerClose={() => {
          console.log("AAAAAA onDrawerClose", showDrawer);
          setSelectedListRowData(null);
          setShowDrawer(false);
        }}
        data={selectedRowData}
      />
      <div style={{ marginBottom: "12px" }}>
        <Filter
          addButtonLabel="Add Customer"
          onAdd={() => onActionChange(null, "Add")}
          onSearch={() => {}}
          onPressEnter={() => {}}
        />
      </div>
      <div
        id="scrollableDiv"
        style={{
          overflow: "auto",
          padding: "0 16px",
        }}
      >
        <InfiniteScroll
          dataLength={data.length}
          next={loadMoreData}
          hasMore={data.length < 50}
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            dataSource={data}
            renderItem={(item) => (
              <List.Item key={item.email}>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
                    >
                      {item.name?.charAt(0).toLocaleUpperCase()}
                    </Avatar>
                  }
                  title={
                    <a
                      href="javascript:void(0);"
                      onClick={() => onActionChange(item, "View")}
                    >
                      {item.name}
                    </a>
                  }
                  description={
                    <>
                      <Row>{`Company Name - ${item.company?.name}`}</Row>
                      <Row>
                        <Col sm={24} md={12}>
                          <MailOutlined />
                          {` - ${item.email}`}
                        </Col>
                        <Col sm={24} md={12}>
                          <PhoneOutlined rotate={90} />
                          {` - ${item.phone}`}
                        </Col>
                      </Row>
                    </>
                  }
                />
                <div>

                  { screenSize === "mobile" 
                   ? 
                   <Dropdown
                   menu={{
                     items: getActions().map((action, i) => ({
                       key: i + 1,
                       label: (
                         <Button
                           type="link"
                           icon={action.icon}
                           danger={action.label === "Delete" ? true : false}
                           onClick={() => onActionChange(item, action.label)}
                         >
                           {action.label}
                         </Button>
                       ),
                     })),
                   }}
                   placement="bottomLeft"
                 >
                     <MoreOutlined />
                 </Dropdown> 
                   : <Dropdown.Button
                    menu={{
                      items: getActions().map((action, i) => ({
                        key: i + 1,
                        label: (
                          <Button
                            type="link"
                            icon={action.icon}
                            danger={action.label === "Delete" ? true : false}
                            onClick={() => onActionChange(item, action.label)}
                          >
                            {action.label}
                          </Button>
                        ),
                      })),
                    }}
                    placement="bottomLeft"
                  >
                    View
                  </Dropdown.Button>}
                </div>
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    </>
  );
};

export default CustomerList;
