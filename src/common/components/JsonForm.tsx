import React, { FC, useState } from "react";
import { BetaSchemaForm } from "@ant-design/pro-components";
import type { ProFormColumnsType } from "@ant-design/pro-components";
import { isValidGST, isValidPan } from "../validators";
import { Button } from "antd";
interface JsonFormProps {
  config: Object<any>;
}

type DataItem = {
  name: string;
  state: string;
};

const getColumns: Object[] = (config: Object[]) => {
  return config.map((ele) => {
    if (
      ele?.formItemProps?.rules.length &&
      ele?.formItemProps?.rules.filter((e) => e.validator === "isValidGST")
        .length
    ) {
      return {
        ...ele,
        formItemProps: {
          rules: [
            { validator: (_: any, val: string) => val && isValidGST(_, val) },
          ],
        },
      };
    } else if (
      ele?.formItemProps?.rules.length &&
      ele?.formItemProps?.rules.filter((e) => e.validator === "isValidPan")
        .length
    ) {
      return {
        ...ele,
        formItemProps: {
          rules: [
            { validator: (_: any, val: string) => val && isValidPan(_, val) },
          ],
        },
      };
    }
    return ele;
  });
};

const JsonForm: FC<any> = ({ config, initialValues= undefined, isDisabled }) => {
  // const [open, setOpen] = useState(isShow);
  // console.log(config, 'configconfig')
  return (
    <BetaSchemaForm<DataItem>
      layoutType="Form"
      disabled={isDisabled}
      initialValues={initialValues}
      className="erp-json-form"
      colProps={{
        span: 12,
      }}
      grid={true}
      onFinish={async (values) => {
        console.log(values, 'onFinish');
      }}
      onReset={() => {
        console.log("AAAAAAAA = onReset");
      }}
      submitter={{
        render: (props, doms) => {
          console.log(props);
          return [
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap:'0.8rem' }} >
              <Button key="rest" onClick={() => props.form?.resetFields()}>
                Reset
              </Button>
              <Button
                type="primary"
                key="submit"
                onClick={() => props.form?.submit?.()}
              >
                Save
              </Button>
            </div>,
          ];
        },
      }}
      columns={config}
    />
  );
};

export default JsonForm;
