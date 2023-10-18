import type { ProColumns } from "@ant-design/pro-components";
import {
  EditableProTable,
  ProCard,
  ProFormField,
  ProFormRadio,
} from "@ant-design/pro-components";
import { AutoComplete, Drawer, Input, Modal } from "antd";
import React, { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
// import {  } from '../../common/components/';
import ConfirmationBox from "../../common/components/ConfirmationBox";
import { showConfirm } from "../../common/components/Utils";

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

type DataSourceType = {
  id: React.Key;
  title?: string;
  readonly?: string;
  decs?: string;
  state?: string;
  created_at?: number;
  update_at?: number;
  children?: DataSourceType[];
};

const defaultData: DataSourceType[] = [
  {
    id: 624748504,
    title: "Activity Name One",
    readonly: "Activity Name One",
    decs: "This activity is really fun",
    state: "open",
    created_at: 1590486176000,
    update_at: 1590486176000,
  },
  {
    id: 624691229,
    title: "Activity Name Two",
    readonly: "Activity Name Two",
    decs: "This activity is really fun",
    state: "closed",
    created_at: 1590481162000,
    update_at: 1590481162000,
  },
];

const renderTitle = (title: string) => (
  <span>
    {title}
    <a
      style={{ float: "right" }}
      href="https://www.google.com/search?q=antd"
      target="_blank"
      rel="noopener noreferrer"
    >
      more
    </a>
  </span>
);

const renderItem = (title: string, count: number) => ({
  value: title,
  label: (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between"
      }}
    >
      {title}
      <span>
        <UserOutlined /> {count}
      </span>
    </div>
  )
});

const options = [
  {
    label: renderTitle("Libraries"),
    options: [renderItem("AntDesign", 10000), renderItem("AntDesign UI", 10600)]
  },
  {
    label: renderTitle("Solutions"),
    options: [
      renderItem("AntDesign UI FAQ", 60100),
      renderItem("AntDesign FAQ", 30010)
    ]
  },
  {
    label: renderTitle("Articles"),
    options: [renderItem("AntDesign design language", 100000)]
  }
];


export default ({ isShow, onDrawerClose, selectedAction = "Add" }) => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<readonly DataSourceType[]>([]);
  const [showConfirmation, setShowConfiramation] = useState(false);

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: "Product name",
      dataIndex: "title",
      render: () => {
        return (<AutoComplete
        popupClassName="certain-category-search-dropdown"
        popupMatchSelectWidth={400}
        options={options}
      >
        <Input placeholder="input here" />
      </AutoComplete>)
      },
      width: "25%",
    },
    {
      title: "Activity Name Two",
      dataIndex: "readonly",
      tooltip: "Read-only, can be obtained using form.getFieldValue",
      readonly: true,
      width: "15%",
    },
    {
      title: "Status",
      key: "state",
      dataIndex: "state",
      valueType: "select",
      valueEnum: {
        all: { text: "All", status: "Default" },
        open: {
          text: "Unresolved",
          status: "Error",
        },
        closed: {
          text: "Resolved",
          status: "Success",
        },
      },
    },
    {
      title: "Description",
      dataIndex: "decs",
      fieldProps: (form, { rowKey, rowIndex }) => {
        if (form.getFieldValue([rowKey || "", "title"]) === "Not fun") {
          return {
            disabled: true,
          };
        }
        if (rowIndex > 9) {
          return {
            disabled: true,
          };
        }
        return {};
      },
    },
    {
      title: "Activity Time",
      dataIndex: "created_at",
      valueType: "date",
    },
    {
      title: "Action",
      valueType: "option",
      width: 200,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          Edit
        </a>,
        <a
          key="delete"
          onClick={(e) => {
            showConfirm();
            // Modal.confirm({  });
            // setDataSource(dataSource.filter((item) => item.id !== record.id));
          }}
        >
          Delete
        </a>,
      ],
    },
  ];

  return (
    <>
      <Drawer
      title={`${selectedAction} Sale Record`}
      placement="right"
      onClose={onDrawerClose}
      open={isShow}
      size="large"
      maskClosable={false}
      bodyStyle={{ paddingTop: "4px" }}
      // rootStyle={{}}
      contentWrapperStyle={{ width: "unset" }}
    >
      <EditableProTable<DataSourceType>
        rowKey="id"
        // headerTitle="Editable Table"
        maxLength={5}
        scroll={{
          x: 960,
        }}
        recordCreatorProps={{
          position: "bottom",
          record: () => ({ id: (Math.random() * 1000000).toFixed(0) }),
        }}
        loading={false}
        columns={columns}
        request={async () => ({
          data: defaultData,
          total: 3,
          success: true,
        })}
        value={dataSource}
        onChange={setDataSource}
        editable={{
          type: "multiple",
          editableKeys,
          deletePopconfirmMessage: "Do you Want to delete this item?",
          onSave: async (rowKey, data, row) => {
            console.log(rowKey, data, row);
            await waitTime(2000);
          },
          onlyOneLineEditorAlertMessage:<>Delete this line?</>, 
          onlyAddOneLineAlertMessage: <>Please add data for the current line fields</>,
          onChange: setEditableRowKeys,
        }}
      />
    </Drawer>
    </>
  );
};
