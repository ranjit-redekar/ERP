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
  FloatButton,
} from "antd";
import Customer from "./Customer";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  EditOutlined,
  DownOutlined,
  EyeOutlined,
  DeleteOutlined,
  PlusOutlined,
  MoreOutlined
} from "@ant-design/icons";
import ConfirmationBox from "../../common/components/ConfirmationBox";
import useScreenSize from "../../common/hooks/useScreenSize";
import Filter from "../../common/components/Filter";
import { showConfirm } from "../../common/components/Utils";

const Actions = [
  {
    label: "View",
    icon: <EyeOutlined />,
  },
  {
    label: "Edit",
    icon: <EditOutlined />,
  },
  {
    label: "Delete",
    icon: <DeleteOutlined />,
  },
];

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
  const [showCustomer, setShowCustomer] = useState(false);
  const [selectedAction, setSelectedAction] = useState("new");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const screenSize = useScreenSize();

  console.log(selectedCustomer, "selectedCustomer");
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
      setSelectedCustomer({
        name: val?.name,
        phoneNumber: "9876543210",
        email: val?.email,
        gstNumber: "27ABCDE1234F1Z5",
        panNumber: "ABCDE1234F",
      });
    } else {
      setSelectedCustomer(null);
    }
    setSelectedAction(action);
    if (action === "Delete") {
      showConfirm({
        onCancel: () => setSelectedCustomer(null),
        onOk: () => setSelectedCustomer(null)
      })
    } else {
      setShowCustomer(true);
    }
    console.log(val, action);
  };

  useEffect(() => {
    loadMoreData();
  }, []);
  console.log(data, "data");
  return (
    <>
      {showCustomer ? (
        <Customer
          isShow={showCustomer}
          selectedAction={selectedAction}
          onDrawerClose={() => {
            setSelectedCustomer(null);
            setShowCustomer(false);
          }}
          data={selectedCustomer}
        />
      ) : null}
      <Filter title="Customer List" onSearch={() => {}} onReset={() => {}} />
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
                  description={item.email}
                />
                <Dropdown
                  menu={{
                    items: Actions.map((action, i) => ({
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
                  {
                    screenSize === "mobile" ? <MoreOutlined /> :
                  <Typography.Link>
                    <Space>
                      Actions
                      <DownOutlined />
                    </Space>
                  </Typography.Link>
                  }
                </Dropdown>
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
      <FloatButton
        // shape="square"
        onClick={() => onActionChange(null, "Add")}
        type="primary"
        // style={{ right: 30, bottom: 30}}
        icon={<PlusOutlined />}
        tooltip="Add new customer"
      />
    </>
  );
};

export default CustomerList;
