import React, { FC, useState, useRef, useEffect } from "react";
import { Drawer } from "antd";

import JsonForm from "../../common/components/JsonForm";
import jsonConfig from "../../dump/add-customer.json";

interface CustomerProps {
  isShow: boolean,
  onDrawerClose: () => void, 
  data: [], 
  selectedAction: String
}

const Customer:FC<CustomerProps> = ({ isShow, onDrawerClose, data=null, selectedAction="Add" }) => {
  return (
    <Drawer
      title={`${selectedAction} Product`}
      placement="right"
      onClose={onDrawerClose}
      open={isShow}
      size="large"
      maskClosable={false}
      bodyStyle={{ paddingTop: "4px" }}
    >
      <JsonForm
        initialValues={data}
        config={jsonConfig["add-customer"]}
        isDisabled={selectedAction.toLocaleLowerCase() === "view"}
      />
    </Drawer>
  );
};

export default Customer;
