import React, { FC } from "react";
import {
  DrawerForm,
  ProFormText,
  ProFormDigit,
  ProFormSelect,
  ProForm,
  ProFormTextArea
} from "@ant-design/pro-form";

interface ProductFormProps {
  visible: boolean;
  onClose: () => void;
  data?: [];
  selectedAction?: String;
}

const ProductForm: FC<ProductFormProps> = ({
  visible,
  onClose,
  data,
  selectedAction = "Add",
}) => {
  return (
    <DrawerForm
      title={`${selectedAction} Product`}
      width="751px"
      open={visible}
      onFinish={async (values) => {
        console.log(values);
        // You would typically handle form submission here, such as sending data to a server
        onClose(); // Close the drawer after submission
      }}
      onOpenChange={(val) => !val && onClose()}
    >
      <ProForm.Group>
        <ProFormText
          width="md"
          name="id"
          label="Product ID"
          rules={[{ required: true, message: "Product ID is required" }]}
        />
        <ProFormText
          width="md"
          name="name"
          label="Product Name"
          rules={[{ required: true, message: "Product Name is required" }]}
        />
      </ProForm.Group>

      <ProForm.Group>
        <ProFormText
          width="md"
          name="unit"
          label="Unit"
          rules={[{ required: true, message: "Unit is required" }]}
        />
        <ProFormText width="md" name="hsnCode" label="HSN Code" />
      </ProForm.Group>

      <ProForm.Group>
        <ProFormSelect
          width="md"
          name="taxRatePreference"
          label="Tax Rate Preference"
          valueEnum={{
            standard: "Standard",
            reduced: "Reduced",
            zero: "Zero",
          }}
        />
        <ProFormDigit
          width="md"
          name="taxRate"
          label="Tax Rate"
          min={0}
          max={100}
          rules={[{ required: true, message: "Tax Rate is required" }]}
        />
      </ProForm.Group>

      <ProForm.Group>
        <ProFormDigit
          width="md"
          name="sellingPrice"
          label="Selling Price"
          min={0}
          rules={[{ required: true, message: "Selling Price is required" }]}
        />
        <ProFormSelect
          name="category"
          label="Category"
          width="md"
          valueEnum={{
            category1: "category 1",
            category2: "category 2",
            category3: "category 3",
            category4: "category 4",
            category5: "category 5",
            category6: "category 6",
          }}
          fieldProps={{
            mode: "multiple",
          }}
          placeholder="Select category"
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormTextArea width="md" name="description" label="Description" />
      </ProForm.Group>
    </DrawerForm>
  );
};

export default ProductForm;
