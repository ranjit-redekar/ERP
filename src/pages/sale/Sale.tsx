import React, { useState, useRef } from "react";
import {
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  message,
  Divider,
  Space,
  Row,
  Col,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { InputRef } from "antd";
import JsonForm from "../../common/components/JsonForm";

const { Option } = Select;
const { RangePicker } = DatePicker;

const AntForm = () => {
  const [items, setItems] = useState(["Item 1"]);
  const inputRef = useRef<InputRef>(null);
  const addItem = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    setItems([...items, `New item`]);
  };

  const onFinish = (values: any) => {
    console.log("Form data:", values);
    message.success("Form submitted successfully!");
  };

  return (
    <JsonForm config={{}} />
    // <Form onFinish={onFinish} layout="vertical">
    //   <Row gutter={{ sm: 8, md: 48 }}>
    //     <Col sm={24} md={24} lg={12}>
    //       <Form.Item
    //         label="Product Name"
    //         name="productName"
    //         rules={[
    //           {
    //             required: true,
    //             message: "Please enter the product name",
    //           },
    //         ]}
    //       >
    //         <Input />
    //       </Form.Item>
    //     </Col>
    //     <Col sm={24} md={24} lg={12}>
    //       <Row gutter={{ md: 24 }}>
    //         <Col sm={24} md={12}>
    //           <Form.Item
    //             label="Product Price"
    //             name="unitPrice"
    //             rules={[
    //               {
    //                 required: true,
    //                 message: "Please enter the price",
    //               },
    //               {
    //                 type: "number",
    //                 message: "Price must be a number",
    //               },
    //             ]}
    //           >
    //             <Input type="number" />
    //           </Form.Item>
    //         </Col>
    //         <Col sm={24} md={12}>
    //           <Form.Item
    //             label="Unit"
    //             name="unit"
    //             rules={[
    //               {
    //                 required: true,
    //                 message: "Please select a product unit",
    //               },
    //             ]}
    //           >
    //             <Select
    //               dropdownRender={(menu) => (
    //                 <>
    //                   {menu}
    //                   <Divider style={{ margin: "8px 0" }} />
    //                   <Space style={{ padding: "0 8px 4px" }}>
    //                     <Input placeholder="Enter unit name" ref={inputRef} />
    //                     <Button
    //                       type="text"
    //                       icon={<PlusOutlined />}
    //                       onClick={addItem}
    //                     >
    //                       Add
    //                     </Button>
    //                   </Space>
    //                 </>
    //               )}
    //               options={items.map((item) => ({ label: item, value: item }))}
    //             />
    //           </Form.Item>
    //         </Col>
    //       </Row>
    //     </Col>
    //     <Col sm={24} md={24} lg={12}>
    //       <Form.Item
    //         label="Supplier"
    //         name="supplier"
    //         rules={[
    //           {
    //             required: true,
    //             message: "Please select a supplier",
    //           },
    //         ]}
    //       >
    //         <Select>
    //           <Option value="supplier1">Supplier 1</Option>
    //           <Option value="supplier2">Supplier 2</Option>
    //           {/* Add more supplier options as needed */}
    //         </Select>
    //       </Form.Item>
    //     </Col>
    //     <Col sm={24} md={24} lg={12}>
    //       <Form.Item
    //         label="Category"
    //         name="category"
    //         rules={[
    //           {
    //             required: true,
    //             message: "Please select at least one category",
    //           },
    //         ]}
    //       >
    //         <Select mode="multiple">
    //           <Option value="category1">Category 1</Option>
    //           <Option value="category2">Category 2</Option>
    //           {/* Add more category options as needed */}
    //         </Select>
    //       </Form.Item>
    //     </Col>
    //     <Col md={24} lg={12}>
    //       <Form.Item
    //         label="Description"
    //         name="description"
    //         rules={[
    //           {
    //             required: true,
    //             message: "Please enter a description",
    //           },
    //         ]}
    //       >
    //         <Input.TextArea />
    //       </Form.Item>
    //     </Col>
    //     <Col sm={24} md={24} lg={12}>
    //       <Form.Item
    //         label="GST"
    //         name="gst"
    //         rules={[
    //           {
    //             required: true,
    //             message: "Please select at least one GST option",
    //           },
    //         ]}
    //       >
    //         <Select mode="multiple">
    //           <Option value="gst5">5% GST</Option>
    //           <Option value="gst12">12% GST</Option>
    //           <Option value="gst18">18% GST</Option>
    //           {/* Add more GST options as needed */}
    //         </Select>
    //       </Form.Item>
    //     </Col>
    //     <Col sm={24} md={24} lg={12}>
    //       <Form.Item
    //         label="Brand"
    //         name="brand"
    //         rules={[
    //           {
    //             required: true,
    //             message: "Please select a brand",
    //           },
    //         ]}
    //       >
    //         <Select
    //           dropdownRender={(menu) => (
    //             <>
    //               {menu}
    //               <Divider style={{ margin: "8px 0" }} />
    //               <Space style={{ padding: "0 8px 4px" }}>
    //                 <Input placeholder="Enter brand name" ref={inputRef} />
    //                 <Button
    //                   type="text"
    //                   icon={<PlusOutlined />}
    //                   onClick={addItem}
    //                 >
    //                   Add
    //                 </Button>
    //               </Space>
    //             </>
    //           )}
    //           options={items.map((item) => ({ label: item, value: item }))}
    //         />
    //       </Form.Item>
    //     </Col>
        
    //     <Col sm={24} md={24} lg={12}>
    //       <Form.Item
    //         label="Manufactured and Expire Date"
    //         name="expireDate"
    //         rules={[
    //           {
    //             required: true,
    //             message: "Please select the expiry date",
    //           },
    //         ]}
    //       >
    //         <RangePicker picker="month" bordered={false} />
    //       </Form.Item>
    //     </Col>
    //   </Row>
    //   <Row justify={"end"}>
    //     <Col>
    //       <Space>
    //         <Button type="primary" danger>
    //           Cancel
    //         </Button>
    //         <Button type="primary" htmlType="submit">
    //           Save
    //         </Button>
    //       </Space>
    //     </Col>
    //   </Row>
    // </Form>
  );
};

export default AntForm;
