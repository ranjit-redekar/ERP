import React from 'react';
import { Form } from 'antd';
import { EditableContext } from './contexts';

const EditableRow: React.FC<{ index: number }> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <EditableContext.Provider value={form}>
      <tr {...props} />
    </EditableContext.Provider>
  );
};

export default EditableRow;
