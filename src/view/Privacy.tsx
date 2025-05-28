import React from "react";
import { Typography, Space } from "antd";

const { Title, Paragraph } = Typography;

const Privacy: React.FC = () => {
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
          隱私權政策
        </Title>

        <div>
          <Title level={4} style={{ color: "#ffffff" }}>
            1. 資料收集
          </Title>
          <Paragraph style={{ color: "#a6a6a6" }}>
            我們只收集使用者提供的網址、圖片或影片等內容，以及為了提供服務所必需的基本資訊（如
            IP 位址、瀏覽器類型等）。
            我們不會收集任何個人識別資訊，除非您主動提供。
          </Paragraph>
        </div>

        <div>
          <Title level={4} style={{ color: "#ffffff" }}>
            2. 資料使用
          </Title>
          <Paragraph style={{ color: "#a6a6a6" }}>
            我們收集的資料僅用於：
            <ul>
              <li>提供和維護我們的服務</li>
              <li>改善和優化我們的服務</li>
              <li>防止濫用和非法使用</li>
              <li>分析服務使用情況（採用匿名方式）</li>
            </ul>
          </Paragraph>
        </div>

        <div>
          <Title level={4} style={{ color: "#ffffff" }}>
            3. 資料保護
          </Title>
          <Paragraph style={{ color: "#a6a6a6" }}>
            我們採取適當的技術和組織措施來保護您的資料，包括：
            <ul>
              <li>使用加密技術保護資料傳輸</li>
              <li>定期更新安全措施</li>
              <li>限制員工訪問用戶資料</li>
              <li>定期進行安全審計</li>
            </ul>
          </Paragraph>
        </div>

        <div>
          <Title level={4} style={{ color: "#ffffff" }}>
            4. Cookie 使用
          </Title>
          <Paragraph style={{ color: "#a6a6a6" }}>
            我們使用 Cookie 和類似技術來改善用戶體驗和服務品質。這些 Cookie
            可能包括：
            <ul>
              <li>必要的 Cookie：確保網站正常運作</li>
              <li>分析 Cookie：幫助我們了解如何改善服務</li>
              <li>功能性 Cookie：記住您的偏好設置</li>
            </ul>
          </Paragraph>
        </div>

        <div>
          <Title level={4} style={{ color: "#ffffff" }}>
            5. 第三方服務
          </Title>
          <Paragraph style={{ color: "#a6a6a6" }}>
            我們的服務可能包含第三方服務的連結。這些第三方有自己的隱私權政策，我們建議您查看這些政策。
            我們不對這些第三方的隱私權實踐負責。
          </Paragraph>
        </div>

        <div>
          <Title level={4} style={{ color: "#ffffff" }}>
            6. 資料保留
          </Title>
          <Paragraph style={{ color: "#a6a6a6" }}>
            我們只在必要的時間內保留您的資料。一旦資料不再需要，我們會安全地刪除或匿名化處理這些資料。
            對於上傳的內容，我們會根據您選擇的保留期限進行保存。
          </Paragraph>
        </div>

        <div>
          <Title level={4} style={{ color: "#ffffff" }}>
            7. 您的權利
          </Title>
          <Paragraph style={{ color: "#a6a6a6" }}>
            根據適用的資料保護法，您擁有以下權利：
            <ul>
              <li>訪問您的資料</li>
              <li>更正不準確的資料</li>
              <li>要求刪除資料</li>
              <li>限制資料處理</li>
              <li>反對資料處理</li>
            </ul>
          </Paragraph>
        </div>

        <div>
          <Title level={4} style={{ color: "#ffffff" }}>
            8. 政策更新
          </Title>
          <Paragraph style={{ color: "#a6a6a6" }}>
            我們可能會不時更新此隱私權政策。任何重大變更都會通過網站通知您。
            繼續使用我們的服務即表示您同意最新的隱私權政策。
          </Paragraph>
        </div>

        <div>
          <Title level={4} style={{ color: "#ffffff" }}>
            9. 聯繫我們
          </Title>
          <Paragraph style={{ color: "#a6a6a6" }}>
            如果您對我們的隱私權政策有任何問題或疑慮，請通過以下方式聯繫我們：
            <ul>
              <li>電子郵件：privacy@ezurl.com</li>
              <li>網站：www.ezurl.com/contact</li>
            </ul>
          </Paragraph>
        </div>
      </Space>
    </div>
  );
};

export default Privacy;
