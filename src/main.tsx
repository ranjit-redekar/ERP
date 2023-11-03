import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider } from "antd";
import enUS from "antd/locale/en_US";
import hiIN from "antd/locale/hi_IN";
import App from "./App.tsx";
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <div className="erp">
      <ConfigProvider locale={enUS} divider={{ className: "erp_divider" }}>
        <App />
      </ConfigProvider>
    </div>
  </React.StrictMode>
);
