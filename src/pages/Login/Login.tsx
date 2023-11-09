import {
  AlipayCircleOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from "@ant-design/icons";
import {
  LoginForm,
  ProConfigProvider,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
  setAlpha,
} from "@ant-design/pro-components";
import { Button, Tabs, message, theme } from "antd";
import type { CSSProperties } from "react";
import { useState } from "react";
import NikeLogo, { GmailIcon } from "../../common/Icons";

type LoginType = "phone" | "account";

export default () => {
  const { token } = theme.useToken();
  const [loginType, setLoginType] = useState<LoginType>("account");

  return (
    <ProConfigProvider hashed={false}>
      <div style={{ backgroundColor: token.colorBgContainer }}>
        <LoginForm
          logo={<NikeLogo />}
          title="Company Name"
          subTitle="Company tagline"
          actions={
            <Button size="large" block onClick={() => console.log("Login with GMAIL")} >
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
          {/* <Tabs
            centered
            activeKey={loginType}
            onChange={(activeKey) => setLoginType(activeKey as LoginType)}
          >
            <Tabs.TabPane key={"account"} tab={"Account Password Login"} />
            <Tabs.TabPane key={"phone"} tab={"Phone Number Login"} />
          </Tabs> */}
          {loginType === "account" && (
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
          )}
          {/* {loginType === "phone" && (
            <>
              <ProFormText
                fieldProps={{
                  size: "large",
                  prefix: <MobileOutlined className={"prefixIcon"} />,
                }}
                name="mobile"
                placeholder={"Phone Number"}
                rules={[
                  {
                    required: true,
                    message: "Please enter your phone number!",
                  },
                  {
                    pattern: /^1\d{10}$/,
                    message: "Invalid phone number format!",
                  },
                ]}
              />
              <ProFormCaptcha
                fieldProps={{
                  size: "large",
                  prefix: <LockOutlined className={"prefixIcon"} />,
                }}
                captchaProps={{
                  size: "large",
                }}
                placeholder={"Enter the verification code"}
                captchaTextRender={(timing, count) => {
                  if (timing) {
                    return `${count} ${"Get Verification Code"}`;
                  }
                  return "Get Verification Code";
                }}
                name="captcha"
                rules={[
                  {
                    required: true,
                    message: "Please enter the verification code!",
                  },
                ]}
                onGetCaptcha={async () => {
                  message.success(
                    "Verification code sent successfully! The code is: 1234"
                  );
                }}
              />
            </>
          )} */}
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
    </ProConfigProvider>
  );
};
