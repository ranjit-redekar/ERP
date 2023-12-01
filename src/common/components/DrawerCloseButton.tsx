import React from 'react';
import { Button } from 'antd';

interface CloseButtonProps {
  onClose: () => void;
}

const DrawerCloseButton: React.FC<CloseButtonProps> = ({ onClose }) => {
  return (
    <Button
      shape="circle"
      onClick={() => onClose()}
      style={{
        position: "absolute",
        top: 10,
        left: -12,
        zIndex: 10,
      }}
    >
      X
    </Button>
  );
};

export default DrawerCloseButton;
