import React from "react";
import { Tabs } from "antd";
import CustomerList from "./CustomerList";
import SupplierList from "./SupplierLIst";

export default function Parties() {
  const tabItems = [
    {
      key: 1,
      label: (
        <div className="erp-tab-wrapper">
          <div>Customers</div>
        </div>
      ),
      children: <CustomerList />,
    },
    {
      key: 2,
      label: (
        <div className="erp-tab-wrapper">
          <div>Suppliers</div>
        </div>
      ),
      children: <SupplierList />,
    },
  ];
  return (
    <Tabs
      defaultActiveKey="1"
      type="card"
      items={tabItems.map(({ key, label, children }) => {
        return {
          label: <span>{label}</span>,
          key: key,
          children: children,
        };
      })}
    />
  );
}
