import React from "react";
import { Typography, Space, Collapse } from "antd";

const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;

const FAQ: React.FC = () => {
  return (
    <div
      style={{
        maxWidth: 800,
        margin: "0 auto",
        padding: "24px",
        backgroundColor: "#1f1f1f",
        borderRadius: 8,
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        border: "1px solid #434343",
      }}
    >
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Title level={2} style={{ color: "#ffffff", textAlign: "center" }}>
          使用說明與問答
        </Title>

        <div>
          <Title level={3} style={{ color: "#ffffff" }}>
            使用說明
          </Title>
          <Paragraph style={{ color: "#a6a6a6" }}>
            EZURL
            提供三種主要功能：縮網址、縮圖片和縮影片。以下是每個功能的基本使用說明：
          </Paragraph>

          <Title level={4} style={{ color: "#ffffff", marginTop: 24 }}>
            縮網址
          </Title>
          <Paragraph style={{ color: "#a6a6a6" }}>
            1. 在輸入框中貼上您想要縮短的網址
            <br />
            2. 點擊「上傳」按鈕
            <br />
            3. 系統會生成一個短網址，您可以複製並分享
          </Paragraph>

          <Title level={4} style={{ color: "#ffffff", marginTop: 24 }}>
            縮圖片
          </Title>
          <Paragraph style={{ color: "#a6a6a6" }}>
            1. 選擇或拖拽最多 3 張圖片到上傳區域
            <br />
            2. 可選擇設置密碼保護
            <br />
            3. 可添加描述說明
            <br />
            4. 選擇檔案的有效期限
            <br />
            5. 點擊「上傳」按鈕完成上傳
          </Paragraph>

          <Title level={4} style={{ color: "#ffffff", marginTop: 24 }}>
            縮影片
          </Title>
          <Paragraph style={{ color: "#a6a6a6" }}>
            1. 選擇或拖拽 1 個影片檔案到上傳區域
            <br />
            2. 可選擇設置密碼保護
            <br />
            3. 可添加描述說明
            <br />
            4. 選擇檔案的有效期限
            <br />
            5. 點擊「上傳」按鈕完成上傳
          </Paragraph>
        </div>

        <div>
          <Title level={3} style={{ color: "#ffffff" }}>
            常見問答
          </Title>
          <Collapse
            ghost
            style={{
              background: "transparent",
              border: "none",
            }}
          >
            <Panel
              header={
                <Text style={{ color: "#ffffff" }}>
                  Q: 檔案大小有什麼限制嗎？
                </Text>
              }
              key="1"
              style={{
                backgroundColor: "#262626",
                borderRadius: 4,
                marginBottom: 8,
                border: "1px solid #434343",
              }}
            >
              <Paragraph style={{ color: "#a6a6a6" }}>
                每個檔案的大小限制為 70MB。這個限制適用於圖片和影片檔案。
              </Paragraph>
            </Panel>

            <Panel
              header={
                <Text style={{ color: "#ffffff" }}>Q: 檔案會永久保存嗎？</Text>
              }
              key="2"
              style={{
                backgroundColor: "#262626",
                borderRadius: 4,
                marginBottom: 8,
                border: "1px solid #434343",
              }}
            >
              <Paragraph style={{ color: "#a6a6a6" }}>
                不會，您可以在上傳時選擇檔案的保存期限（1天、7天、14天或30天）。超過期限後，檔案會自動刪除。
              </Paragraph>
            </Panel>

            <Panel
              header={
                <Text style={{ color: "#ffffff" }}>Q: 如何保護我的檔案？</Text>
              }
              key="3"
              style={{
                backgroundColor: "#262626",
                borderRadius: 4,
                marginBottom: 8,
                border: "1px solid #434343",
              }}
            >
              <Paragraph style={{ color: "#a6a6a6" }}>
                您可以在上傳時啟用密碼保護功能。您可以自行設置密碼，或使用「今日日期」按鈕自動生成密碼。
              </Paragraph>
            </Panel>

            <Panel
              header={
                <Text style={{ color: "#ffffff" }}>Q: 支援哪些檔案格式？</Text>
              }
              key="4"
              style={{
                backgroundColor: "#262626",
                borderRadius: 4,
                marginBottom: 8,
                border: "1px solid #434343",
              }}
            >
              <Paragraph style={{ color: "#a6a6a6" }}>
                圖片支援：JPG、JPEG、PNG、GIF、WebP 等常見圖片格式
                <br />
                影片支援：MP4、WebM、MOV 等常見影片格式
              </Paragraph>
            </Panel>

            <Panel
              header={
                <Text style={{ color: "#ffffff" }}>Q: 如何分享我的檔案？</Text>
              }
              key="5"
              style={{
                backgroundColor: "#262626",
                borderRadius: 4,
                marginBottom: 8,
                border: "1px solid #434343",
              }}
            >
              <Paragraph style={{ color: "#a6a6a6" }}>
                上傳完成後，系統會生成一個短網址。您可以複製這個網址並分享給他人。如果您設置了密碼保護，請記得同時提供密碼給對方。
              </Paragraph>
            </Panel>

            <Panel
              header={
                <Text style={{ color: "#ffffff" }}>
                  Q: 我可以刪除已上傳的檔案嗎？
                </Text>
              }
              key="6"
              style={{
                backgroundColor: "#262626",
                borderRadius: 4,
                marginBottom: 8,
                border: "1px solid #434343",
              }}
            >
              <Paragraph style={{ color: "#a6a6a6" }}>
                目前暫不支援手動刪除檔案。檔案會在到達您設定的有效期限後自動刪除。如有特殊需求，請聯繫我們的客服。
              </Paragraph>
            </Panel>
          </Collapse>
        </div>

        <div>
          <Title level={3} style={{ color: "#ffffff" }}>
            聯繫我們
          </Title>
          <Paragraph style={{ color: "#a6a6a6" }}>
            如果您有任何問題或建議，歡迎通過以下方式聯繫我們：
            <br />
            Email: support@ezurl.com
            <br />
            網站: www.ezurl.com/contact
          </Paragraph>
        </div>
      </Space>
    </div>
  );
};

export default FAQ;
