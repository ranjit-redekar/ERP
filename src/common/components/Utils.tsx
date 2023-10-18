import React from 'react';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal } from 'antd';

type showConfirmObj = {
  title?: string,
  content?: string,
  onOk: Function,
  onCancel: Function
}

export const showConfirm = (param: showConfirmObj) => {
    Modal.confirm({
      title: param?.title ? param.title : 'Do you Want to delete this item?',
      icon: <ExclamationCircleFilled />,
      content: param?.content ? param?.content : 'Some descriptions',
      onOk() {
        console.log('OK');
        param?.onOk && param.onOk();
      },
      onCancel() {
        console.log('Cancel');
        param?.onCancel && param?.onCancel()
      },
    });
};
