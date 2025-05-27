import React, { useState } from 'react';
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
} from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import FileUploader from '@/components/Upload';

const { TextArea } = Input;

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

    // 處理文件選擇
    const handleFilesSelected = (files: File[]) => {
        console.log('選擇的文件:', files);
        // 這裡可以處理文件上傳邏輯
    };

    // 處理表單提交
    const onFinish = (values: any) => {
        console.log('表單數據:', values);
        // 處理表單提交邏輯
    };

    // 生成今日日期
    const generateTodayDate = () => {
        const today = new Date();
        const dateString = today.toISOString().split('T')[0].replace(/-/g, '');
        form.setFieldsValue({ password: dateString });
    };

    return (
        <div style={{ 
            maxWidth: 800, 
            margin: '0 auto', 
            backgroundColor: '#1f1f1f',
            borderRadius: 8,
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            border: '1px solid #434343',
            padding: '32px'
        }}>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                size="large"
            >
                    {/* Page 1 Content - 縮網址 */}
                    {currentPage === 'page1' && (
                        <Form.Item
                            label={<span style={{ color: '#ffffff' }}>網址：</span>}
                            name="url"
                            rules={[
                                { required: true, message: '請輸入網址!' },
                                { type: 'url', message: '請輸入有效的網址!' }
                            ]}
                        >
                            <Input
                                placeholder="請輸入要縮短的網址"
                                style={{ 
                                    height: 48,
                                    backgroundColor: '#262626',
                                    borderColor: '#434343',
                                    color: '#ffffff'
                                }}
                            />
                        </Form.Item>
                    )}

                    {/* Page 2 & 3 Content - 縮圖片/影片 */}
                    {currentPage !== 'page1' && (
                        <Space direction="vertical" size="large" style={{ width: '100%' }}>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item label={<span style={{ color: '#ffffff' }}>密碼：</span>}>
                                        <div style={{ marginBottom: 8 }}>
                                            <Switch
                                                checked={passwordEnabled}
                                                onChange={setPasswordEnabled}
                                                style={{
                                                    backgroundColor: passwordEnabled ? '#52c41a' : '#434343'
                                                }}
                                            />
                                            <span style={{ marginLeft: 8, color: '#ffffff' }}>啟用密碼保護</span>
                                        </div>
                                        <Input.Group compact>
                                            <Form.Item
                                                name="password"
                                                style={{ width: '70%', marginBottom: 0 }}
                                            >
                                                <Input
                                                    placeholder="請輸入密碼"
                                                    disabled={!passwordEnabled}
                                                    style={{
                                                        backgroundColor: '#262626',
                                                        borderColor: '#434343',
                                                        color: '#ffffff'
                                                    }}
                                                />
                                            </Form.Item>
                                            <Button
                                                type="default"
                                                icon={<CalendarOutlined />}
                                                onClick={generateTodayDate}
                                                disabled={!passwordEnabled}
                                                style={{
                                                    width: '30%',
                                                    backgroundColor: passwordEnabled ? '#52c41a' : '#434343',
                                                    borderColor: passwordEnabled ? '#52c41a' : '#434343',
                                                    color: '#ffffff'
                                                }}
                                            >
                                                今日日期
                                            </Button>
                                        </Input.Group>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label={<span style={{ color: '#ffffff' }}>有效日期：</span>}
                                        name="expire"
                                        initialValue={30}
                                    >
                                        <Select 
                                            placeholder="選擇有效期限"
                                            style={{
                                                color: '#ffffff'
                                            }}
                                            dropdownStyle={{
                                                backgroundColor: '#262626',
                                                border: '1px solid #434343'
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
                                label={<span style={{ color: '#ffffff' }}>描述：</span>}
                                name="description"
                            >
                                <TextArea
                                    placeholder="檔案的描述及說明"
                                    rows={4}
                                    showCount
                                    maxLength={500}
                                    style={{
                                        backgroundColor: '#262626',
                                        borderColor: '#434343',
                                        color: '#ffffff'
                                    }}
                                />
                            </Form.Item>

                            <Form.Item label={<span style={{ color: '#ffffff' }}>{`${currentPage === 'page2' ? '圖片' : '影片'}上傳：`}</span>}>
                                <FileUploader
                                    acceptedFileTypes={currentPage === 'page2' ? "image" : "video"}
                                    maxFileSize={70}
                                    maxFiles={currentPage === 'page2' ? 3 : 1}
                                    onFilesSelected={handleFilesSelected}
                                />
                            </Form.Item>
                        </Space>
                    )}

                    {/* Submit Button */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: 32
                    }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            style={{
                                minWidth: 120,
                                height: 48,
                                backgroundColor: '#52c41a',
                                borderColor: '#52c41a',
                                color: '#ffffff'
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