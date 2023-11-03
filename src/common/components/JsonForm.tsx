import React, { FC, useState, useEffect, Children } from "react";
import { BetaSchemaForm, ProForm } from "@ant-design/pro-components";
import type { ProFormColumnsType } from "@ant-design/pro-components";
import { isValidGST, isValidPan } from "../validators";
import { Button } from "antd";

interface JsonFormProps {
  config: ProFormColumnsType[];
  initialValues: Object;
  isDisabled: boolean;
  isShow: boolean;
  title: string,
  layoutType: string; 
  onFormChange?: (values: Object) => void; // Add a callback for form changes
  onClose?:(values: Object) => void;
  children: React.ReactNode
}

type DataItem = {
  name: string;
  state: string;
  other_details: string; // Add other_details to the DataItem type
};

const getUpdatedColumn = (column: ProFormColumnsType): ProFormColumnsType => {
  if (column.formItemProps?.rules?.some((rule) => rule.validator === "isValidGST")) {
    return {
      ...column,
      formItemProps: {
        ...column.formItemProps,
        rules: [{ validator: (_, val: string) => val && isValidGST(_, val) }],
      },
    };
  } else if (column.formItemProps?.rules?.some((rule) => rule.validator === "isValidPan")) {
    return {
      ...column,
      formItemProps: {
        ...column.formItemProps,
        rules: [{ validator: (_, val: string) => val && isValidPan(_, val) }],
      },
    };
  } else if (column.valueType === "group") {
    return {
      ...column,
      columns: column.columns?.map(getUpdatedColumn),
    };
  }
  return column;
};

const JsonForm: FC<JsonFormProps> = ({ config, initialValues = {}, isDisabled, onFormChange, title, isShow, onClose, layoutType = "DrawerForm", children }) => {
  const updatedColumns = config.map(getUpdatedColumn);
  console.log(updatedColumns, "updatedColumns");
  return (
    <>
    <BetaSchemaForm<DataItem>
      layoutType={layoutType}
      disabled={isDisabled}
      open={isShow}
      title={title}
      onOpenChange={(val) => !val && onClose()}
      initialValues={initialValues}
      className="erp-json-form"
      colProps={{
        span: 12,
      }}
      grid={true}
      onFinish={async (values) => {
        console.log(values, "onFinish");
      }}
      onReset={() => {
        console.log("AAAAAAAA = onReset");
      }}
      onValuesChange={onFormChange} // Add an onValuesChange event handler
      submitter={{
        render: (props, doms) => {
          console.log(props);
          return (
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.8rem" }}>
              {/* <Button key="rest" onClick={() => props.form?.resetFields()}>
                Reset
              </Button> */}
              <Button type="primary" key="submit" onClick={() => props.form?.submit?.()}>
                Save
              </Button>
            </div>
          );
        },
      }}
      columns={updatedColumns}
    />
    </>
  );
};

export default JsonForm;
