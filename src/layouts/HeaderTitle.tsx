import React, { FC } from "react";
import { Divider } from "antd";

interface HeaderTitleProps {
  logo: React.ReactNode;
  title: React.ReactNode;
  HeaderViewProps: any;
}

const HeaderTitle: FC<HeaderTitleProps> = ({
  logo,
  title,
  HeaderViewProps,
}) => {
  const defaultDom = (
    <a>
      {logo}
      {title}
    </a>
  );
  if (typeof window === "undefined") return defaultDom;
  if (document.body.clientWidth < 1400) return defaultDom;
  if (HeaderViewProps.isMobile) return defaultDom;
  return (
    <>
      {defaultDom}
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Divider
          style={{
            height: "1.5em",
          }}
          type="vertical"
        />
      </div>
    </>
  );
};

export default HeaderTitle;
