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
  Alert,
  message,
} from "antd";
import { CalendarOutlined, CopyOutlined } from "@ant-design/icons";
import FileUploader, { type FileContext } from "@/components/Upload";
import { CreateForm, type FormRequest } from "@/apis/Form";

const { TextArea } = Input;
const { Text } = Typography;

interface HomeProps {
  currentPage: string;
}

const Home: React.FC<HomeProps> = ({ currentPage }) => {
  const [form] = Form.useForm<FormRequest>();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const isPassword = Form.useWatch('isPassword', form);
  const [newPath, setNewPath] = useState<string>("");
  const [showAlert, setShowAlert] = useState(false);
  
  // Get current domain
  const currentDomain = window.location.origin;

  // Listen for window size changes
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Clear password when isPassword is set to false
  useEffect(() => {
    if (!isPassword) {
      form.setFieldValue('password', '');
    }
  }, [isPassword, form]);

  // Handle file selection
  const handleFilesSelected = (files: FileContext[]) => {
    form.setFieldValue("fileNames", [...files.map(x => x.context)]);
    // Handle file upload logic here
  };

  // Handle form submission
  const onFinish = async (values: any) => {
    console.log("Form data:", values);
    // Handle form submission logic
    try {
      var response: any = await CreateForm(values);
      setNewPath(response.id);
      setShowAlert(true);  // Show Alert
    } catch {

    }
  };

  const handleSave = () => {
    form
      .validateFields()
      .then(values => {
        onFinish(values);
      })
      .catch(errorInfo => {
        console.log('fail')
      });
  };

  // Generate today's date
  const generateTodayDate = () => {
    const today = new Date();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    const dateString = month + day;
    form.setFieldsValue({ password: dateString });
  };

  // Copy link to clipboard
  const copyToClipboard = async () => {
    const fullUrl = `${currentDomain}/${newPath}`;
    try {
      await navigator.clipboard.writeText(fullUrl);
      message.success('連結已複製到剪貼簿');
    } catch (err) {
      message.error('複製失敗，請手動複製');
    }
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
      {showAlert && (
        <div style={{ marginBottom: 24 }}>
          <Alert
            message="生成的連結"
            description={
              <Space>
                <span>{`${currentDomain}/${newPath}`}</span>
                <Button
                  type="primary"
                  icon={<CopyOutlined />}
                  onClick={copyToClipboard}
                  size="small"
                  style={{
                    backgroundColor: "#52c41a",
                    borderColor: "#52c41a",
                  }}
                >
                </Button>
              </Space>
            }
            type="success"
            closable
            onClose={() => setShowAlert(false)}
          />
        </div>
      )}

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSave}
        size={isMobile ? "middle" : "large"}
      >
        {/* Page 1 Content - URL Shortener */}
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

        {/* Page 2 & 3 Content - Image/Video Shortener */}
        {currentPage !== "page1" && (
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <Row gutter={isMobile ? [0, 16] : 16}>
              <Col span={isMobile ? 24 : 12}>
                <Form.Item
                  label={
                    <>
                      <span style={{ color: "#ffffff" }}>密碼：</span>{" "}
                      <Form.Item
                        name="isPassword"
                        valuePropName="checked"
                        noStyle
                      >
                        <Switch
                          style={{
                            backgroundColor: isPassword ? "#52c41a" : "#434343",
                          }}
                        />
                      </Form.Item>
                      <Text style={{ color: "#a6a6a6" }}>
                        {isPassword ? "已啟用保護" : "未啟用保護"}
                      </Text>
                    </>
                  }
                  style={{ marginBottom: isMobile ? 16 : 0 }}
                >
                  {/* Password input and today's date button */}
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
                          placeholder="請輸入密碼"
                          disabled={!isPassword}
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
                        disabled={!isPassword}
                        style={{
                          backgroundColor: isPassword ? "#52c41a" : "#434343",
                          borderColor: isPassword ? "#52c41a" : "#434343",
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
                  name="expiredDays"
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
              name="fileNames"
              label={
                <span style={{ color: "#ffffff" }}>{`${currentPage === "page2" ? "圖片" : "影片"
                  }上傳：`}</span>
              }
              rules={[{
                required: true, message: '請選擇檔案'
              }]}
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
