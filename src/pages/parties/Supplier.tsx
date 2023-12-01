import React, { FC } from "react";
import { Drawer } from "antd";

import JsonForm from "../../common/components/JsonForm";
import jsonConfig from "../../configs/add-customer.json";

interface SupplierProps {
  isShow: boolean,
  onDrawerClose: () => void, 
  data: [], 
  selectedAction: String
}

const Supplier: FC<SupplierProps> = ({ isShow, onDrawerClose, data, selectedAction }) => {
  return (
    <Drawer
      title={`${selectedAction} Supplier`}
      placement="right"
      onClose={onDrawerClose}
      open={isShow}
      size="large"
      maskClosable={false}
      // bodyStyle={{ paddingTop: "4px" }}
    >
      <JsonForm
        initialValues={data}
        config={jsonConfig["add-customer"]}
        isDisabled={selectedAction.toLocaleLowerCase() === "view"}
      />
    </Drawer>
  );
};

export default Supplier;
