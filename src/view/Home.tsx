import React, { useState, useEffect } from "react";
import {
  Button,
  Input,
  Switch,
  Select,
  Form,
  Typography,
  Space,
  Row,
  Col,
} from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import FileUploader from "@/components/Upload";

const { TextArea } = Input;
const { Text } = Typography;

interface IFormData {
  url?: string;
  IsPassword?: boolean;
  Password?: string;
  Description?: string;
  Expire?: number;
}

interface HomeProps {
  currentPage: string;
}

const Home: React.FC<HomeProps> = ({ currentPage }) => {
  const [form] = Form.useForm();
  const [passwordEnabled, setPasswordEnabled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // 監聽視窗大小變化
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 處理密碼開關變更
  const handlePasswordSwitch = (checked: boolean) => {
    setPasswordEnabled(checked);
    if (!checked) {
      form.setFieldValue("password", ""); // 清除密碼輸入框的內容
    }
  };

  // 處理文件選擇
  const handleFilesSelected = (files: File[]) => {
    console.log("選擇的文件:", files);
    // 這裡可以處理文件上傳邏輯
  };

  // 處理表單提交
  const onFinish = (values: any) => {
    console.log("表單數據:", values);
    // 處理表單提交邏輯
  };

  // 生成今日日期
  const generateTodayDate = () => {
    const today = new Date();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    const dateString = month + day;
    form.setFieldsValue({ password: dateString });
  };

  return (
    <div
      style={{
        maxWidth: isMobile ? "100%" : 800,
        margin: "0 auto",
        backgroundColor: "#1f1f1f",
        borderRadius: isMobile ? 0 : 8,
        boxShadow: isMobile ? "none" : "0 4px 12px rgba(0,0,0,0.3)",
        border: isMobile ? "none" : "1px solid #434343",
        padding: isMobile ? "16px" : "32px",
      }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        size={isMobile ? "middle" : "large"}
      >
        {/* Page 1 Content - 縮網址 */}
        {currentPage === "page1" && (
          <Form.Item
            label={<span style={{ color: "#ffffff" }}>網址：</span>}
            name="url"
            rules={[
              { required: true, message: "請輸入網址!" },
              { type: "url", message: "請輸入有效的網址!" },
            ]}
          >
            <Input
              placeholder="請輸入要縮短的網址"
              style={{
                height: isMobile ? 40 : 48,
                backgroundColor: "#262626",
                borderColor: "#434343",
                color: "#ffffff",
              }}
            />
          </Form.Item>
        )}

        {/* Page 2 & 3 Content - 縮圖片/影片 */}
        {currentPage !== "page1" && (
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <Row gutter={isMobile ? [0, 16] : 16}>
              <Col span={isMobile ? 24 : 12}>
  <Form.Item
    label={
      <>
        <span style={{ color: "#ffffff" }}>密碼：</span>{" "}
        <Switch
          checked={passwordEnabled}
          onChange={handlePasswordSwitch}
          style={{
            backgroundColor: passwordEnabled ? "#52c41a" : "#434343",
          }}
        />
        <Text style={{ color: "#a6a6a6" }}>
          {passwordEnabled ? "已啟用保護" : "未啟用保護"}
        </Text>
      </>
    }
    style={{ marginBottom: isMobile ? 16 : 0 }}
  >
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <Form.Item
          name="password"
          noStyle
        >
          <Input
            value={form.getFieldValue("password") || ""}
            onChange={(e) => form.setFieldValue("password", e.target.value)}
            placeholder="請輸入密碼"
            disabled={!passwordEnabled}
            style={{
              backgroundColor: "#262626",
              borderColor: "#434343",
              color: "#ffffff",
            }}
          />
        </Form.Item>
        <Button
          type="default"
          icon={<CalendarOutlined />}
          onClick={generateTodayDate}
          disabled={!passwordEnabled}
          style={{
            backgroundColor: passwordEnabled ? "#52c41a" : "#434343",
            borderColor: passwordEnabled ? "#52c41a" : "#434343",
            color: "#ffffff",
          }}
        >
          今日日期
        </Button>
      </div>
    </div>
  </Form.Item>
</Col>

              <Col span={isMobile ? 24 : 12}>
                <Form.Item
                  label={<span style={{ color: "#ffffff" }}>有效日期：</span>}
                  name="expire"
                  initialValue={30}
                  style={{ marginBottom: 0 }}
                >
                  <Select
                    placeholder="選擇有效期限"
                    style={{
                      width: "100%",
                      color: "#ffffff",
                    }}
                    dropdownStyle={{
                      backgroundColor: "#262626",
                      border: "1px solid #434343",
                    }}
                  >
                    <Select.Option value={1}>1天</Select.Option>
                    <Select.Option value={7}>7天</Select.Option>
                    <Select.Option value={14}>14天</Select.Option>
                    <Select.Option value={30}>30天</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label={<span style={{ color: "#ffffff" }}>描述：</span>}
              name="description"
            >
              <TextArea
                placeholder="檔案的描述及說明"
                rows={isMobile ? 3 : 4}
                showCount
                maxLength={500}
                style={{
                  backgroundColor: "#262626",
                  borderColor: "#434343",
                  color: "#ffffff",
                }}
              />
            </Form.Item>

            <Form.Item
              label={
                <span style={{ color: "#ffffff" }}>{`${
                  currentPage === "page2" ? "圖片" : "影片"
                }上傳：`}</span>
              }
            >
              <FileUploader
                acceptedFileTypes={currentPage === "page2" ? "image" : "video"}
                maxFileSize={70}
                maxFiles={currentPage === "page2" ? 3 : 1}
                onFilesSelected={handleFilesSelected}
              />
            </Form.Item>
          </Space>
        )}

        {/* Submit Button */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: isMobile ? 24 : 32,
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            size={isMobile ? "middle" : "large"}
            style={{
              width: isMobile ? "100%" : "auto",
              minWidth: isMobile ? "auto" : 120,
              height: isMobile ? 40 : 48,
              backgroundColor: "#52c41a",
              borderColor: "#52c41a",
              color: "#ffffff",
            }}
          >
            上傳
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Home;
