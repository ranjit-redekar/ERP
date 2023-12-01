import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  LoginForm,
  ProConfigProvider,
  ProFormText,
} from "@ant-design/pro-components";
import { Button, message, theme, Spin } from "antd";
import type { CSSProperties } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NikeLogo, { GmailIcon } from "../../common/Icons";

export default () => {
  const { token } = theme.useToken();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    isLoggedIn && navigate("/app", { replace: true });
  }, [isLoggedIn]);

  const onLogin = (obj: any) => {
    setLoading(true)
    if (obj?.username === "admin" && obj?.password === "admin") {
      localStorage.setItem("isERPLoggedIn", "true");
      setTimeout(() => {
        setIsLoggedIn(true);
        setLoading(false);
      }, 5000);
    } else {
      localStorage.setItem("isERPLoggedIn", "false");
    }
  };

  return (
    <Spin spinning={loading}>
      <div style={{ backgroundColor: token.colorBgContainer }}>
        <LoginForm
          onFinish={onLogin}
          logo={<NikeLogo />}
          title="Company Name"
          subTitle="Company tagline"
          actions={
            <Button
              size="large"
              block
              onClick={() => console.log("Login with GMAIL")}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <GmailIcon height="20" width="50" />
                <div>Login with Gmail</div>
              </div>
            </Button>
          }
        >
          <>
            <ProFormText
              name="username"
              fieldProps={{
                size: "large",
                prefix: <UserOutlined className={"prefixIcon"} />,
              }}
              placeholder={"Username"}
              rules={[
                {
                  required: true,
                  message: "Please enter your username!",
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: "large",
                prefix: <LockOutlined className={"prefixIcon"} />,
              }}
              placeholder={"Password"}
              rules={[
                {
                  required: true,
                  message: "Please enter your password!",
                },
              ]}
            />
          </>

          <div
            style={{
              marginBlockEnd: 24,
            }}
          >
            <a
              style={{
                float: "right",
                paddingBottom: "12px",
              }}
            >
              Forgot Password
            </a>
          </div>
        </LoginForm>
      </div>
    </Spin>
  );
};
