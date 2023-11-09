import React from "react";
import { Button, Divider, Tabs, Input } from "antd";
import {
  DrawerForm,
  ProForm,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-form";
import { isValidGST, isValidPan } from "../../common/validators";

const { Search } = Input;

const CustomerForm = ({ isShow, onDrawerClose, selectedAction }) => {
  const onChange = (key: string) => {
    console.log(key);
  };

  return (
    <DrawerForm
      onFinish={(values) => {
        console.log("onSubmit");
        // onSubmit(values);
      }}
      width="751px"
      open={isShow}
      title={`${selectedAction} Customer`}
      onOpenChange={(val) => !val && onDrawerClose()}
      // drawerProps={{
      //   footer:
      // }}
    >
      <ProForm.Group>
        <ProFormSelect
          width="md"
          name="customer_type"
          label="Customer Type"
          valueEnum={{
            business: "Business",
            individual: "Individual",
          }}
          initialValue="business"
        />
        <ProForm.Item
          name="gstNumber"
          label="GST Number"
          tooltip={`27ABCDE1234F1Z5 State Code: 27 (Each state in India has a unique state code.) 
                      \n PAN: ABCDE1234F (The PAN of the business entity.) 
                      \n Entity Code: 1 (To differentiate between multiple entities using the same PAN.)
                      \n Checksum Digit: Z (Used for error detection.) 
                      \n Default Checksum: 5 (Used for error detection.)`}
          rules={[
            {
              validator: isValidGST,
            },
          ]}
        >
          <Search
            style={{ width: '100%' }}
            allowClear
            placeholder="27ABCDE1234F1Z5"
            enterButton="Verify"
            // onSearch={onSearch}
          />
        </ProForm.Item>
      </ProForm.Group>

      <ProForm.Group>
        <ProFormText
          name="first_name"
          label="First Name"
          width="md"
          rules={[{ required: true, message: "This field is required" }]}
        />

        <ProFormText
          name="last_name"
          label="Last Name"
          width="md"
          rules={[{ required: true, message: "This field is required" }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText width="md" name="company_name" label="Company Name" />
      </ProForm.Group>

      <ProForm.Group>
        <ProFormText width="md" name="phoneNumber" label="Phone Number" />
        <ProFormText
          width="md"
          name="email"
          label="Email Address"
          rules={[{ type: "email", message: "Invalid email address" }]}
        />
      </ProForm.Group>

      <Tabs
        defaultActiveKey="1"
        type="card"
        items={[
          {
            key: "1",
            label: "Payment Details",
            children: (
              <>
                <ProForm.Group>
                  <ProFormText
                    width="md"
                    name="panNumber"
                    label="PAN Number"
                    rules={[
                      {
                        validator: isValidPan,
                      },
                    ]}
                  />
                </ProForm.Group>
                <ProForm.Group>
                  <ProFormText
                    width="md"
                    name="opening_balance"
                    label="Opening Balance"
                  />
                </ProForm.Group>
              </>
            ),
          },
          {
            key: "2",
            label: "Address Details",
            children: (
              <Tabs
                defaultActiveKey="1"
                type="card"
                items={[
                  {
                    key: "billing_address",
                    label: "Billing Address",
                    children: (
                      <>
                        {/* <ProForm.Group> */}
                        <ProFormText
                          name="address_1"
                          label="Area, Street, Sector or Village"
                        />
                        {/* </ProForm.Group> */}
                        <ProForm.Group>
                          <ProFormText
                            width="md"
                            name="landmark"
                            label="Landmark"
                          />
                          <ProFormText
                            width="md"
                            name="pincode"
                            label="Pincode"
                          />
                        </ProForm.Group>
                        <ProForm.Group>
                          <ProFormSelect width="md" name="city" label="City" />
                          <ProFormSelect
                            width="md"
                            name="state"
                            label="State"
                          />
                        </ProForm.Group>
                      </>
                    ),
                  },
                  {
                    key: "shipping_address",
                    label: "Shipping Address",
                    children: (
                      <ProFormText
                        width="md"
                        name="address_1"
                        label="Area, Street, Sector or Village"
                      />
                    ),
                  },
                ]}
              />
            ),
          },
          {
            key: "3",
            label: "Other Details",
            children: "Content of Tab Pane 3",
          },
        ]}
        onChange={onChange}
      />
    </DrawerForm>
  );
};

export default CustomerForm;
