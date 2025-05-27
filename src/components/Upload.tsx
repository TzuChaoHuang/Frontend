
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { 
    Upload, 
    Button, 
    Card, 
    Alert, 
    Typography, 
    Space, 
    Image, 
    Progress 
} from 'antd';
import { 
    UploadOutlined, 
    DeleteOutlined, 
    FileImageOutlined, 
    VideoCameraOutlined, 
    FileOutlined,
    InboxOutlined 
} from '@ant-design/icons';
import type { UploadProps } from 'antd';

const { Text, Paragraph } = Typography;
const { Dragger } = Upload;

// 定义允许的文件类型
type FileType = 'image' | 'video' | 'all';

// 文件上传组件属性
interface FileUploaderProps {
    maxFileSize?: number; // 最大文件大小，单位MB
    acceptedFileTypes?: FileType; // 允许的文件类型
    onFilesSelected?: (files: File[]) => void; // 文件选择回调
    maxFiles?: number; // 最大文件数量
}

// 获取文件类型的MIME类型
const getMimeTypes = (fileType: FileType): string => {
    switch (fileType) {
        case 'image':
            return 'image/*';
        case 'video':
            return 'video/*';
        case 'all':
        default:
            return 'image/*,video/*';
    }
};

// 检查文件是否为图片
const isImageFile = (file: File): boolean => {
    return file.type.startsWith('image/');
};

// 检查文件是否为视频
const isVideoFile = (file: File): boolean => {
    return file.type.startsWith('video/');
};

// 格式化文件大小
const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// 文件上传组件
const FileUploader: React.FC<FileUploaderProps> = ({
    maxFileSize = 70, // 默认70MB
    acceptedFileTypes = 'all',
    onFilesSelected,
    maxFiles = 5
}) => {
    const [files, setFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // 处理文件验证和添加
    const handleFileValidationAndAdd = useCallback((newFiles: FileList | null) => {
        if (!newFiles || newFiles.length === 0) return;

        setError(null);

        // 检查是否超过最大文件数
        if (files.length + newFiles.length > maxFiles) {
            setError(`最多只能上傳${maxFiles}個文件`);
            return;
        }

        const validFiles: File[] = [];
        const validPreviews: string[] = [];
        const maxSizeBytes = maxFileSize * 1024 * 1024; // 转换为字节

        // 验证每个文件
        Array.from(newFiles).forEach(file => {
            // 检查文件大小
            if (file.size > maxSizeBytes) {
                setError(`檔案 ${file.name} 超過最大限制 ${maxFileSize}MB`);
                return;
            }

            // 检查文件类型
            if (acceptedFileTypes === 'image' && !isImageFile(file)) {
                setError(`檔案 ${file.name} 不是圖片格式`);
                return;
            }

            if (acceptedFileTypes === 'video' && !isVideoFile(file)) {
                setError(`檔案 ${file.name} 不是影片格式`);
                return;
            }

            if (acceptedFileTypes === 'all' && !isImageFile(file) && !isVideoFile(file)) {
                setError(`檔案 ${file.name} 不是圖片或影片格式`);
                return;
            }

            // 新增檔案
            validFiles.push(file);

            // 創建預覽URL
            const previewUrl = URL.createObjectURL(file);
            validPreviews.push(previewUrl);
        });

        if (validFiles.length > 0) {
            const newFilesArray = [...files, ...validFiles];
            const newPreviewsArray = [...previews, ...validPreviews];

            setFiles(newFilesArray);
            setPreviews(newPreviewsArray);

            // CallBack Function
            if (onFilesSelected) {
                onFilesSelected(newFilesArray);
            }
        }
    }, [files, previews, maxFileSize, maxFiles, acceptedFileTypes, onFilesSelected]);

    useEffect(() => {
        // 清理旧的预览URL
        previews.forEach(url => URL.revokeObjectURL(url));
        
        setFiles([]);
        setPreviews([]);
        setError(null);

        // 回調函數
        if (onFilesSelected) {
            onFilesSelected([]);
        }
    }, [acceptedFileTypes]);

    // 處理文件選擇
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleFileValidationAndAdd(e.target.files);
        // 重置可以重複上傳
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    // 處理文件刪除
    const handleFileRemove = (index: number) => {
        // 釋放預覽
        URL.revokeObjectURL(previews[index]);

        // 移除文件和預覽
        const newFiles = [...files];
        const newPreviews = [...previews];

        newFiles.splice(index, 1);
        newPreviews.splice(index, 1);

        setFiles(newFiles);
        setPreviews(newPreviews);

        // 回調函數
        if (onFilesSelected) {
            onFilesSelected(newFiles);
        }
    };

    // 文件ICON
    const getFileIcon = (file: File) => {
        if (isImageFile(file)) {
            return <FileImageOutlined style={{ fontSize: '24px' }} />;
        } else if (isVideoFile(file)) {
            return <VideoCameraOutlined style={{ fontSize: '24px' }} />;
        }
        return <FileOutlined style={{ fontSize: '24px' }} />;
    };

    // 預覽
    const renderPreview = (file: File, previewUrl: string, index: number) => {
        return (
            <Card 
                key={index} 
                size="small" 
                style={{ marginBottom: 8 }}
                actions={[
                    <Button 
                        type="text" 
                        danger 
                        icon={<DeleteOutlined />} 
                        onClick={() => handleFileRemove(index)}
                    />
                ]}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ 
                        width: 48, 
                        height: 48, 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        backgroundColor: '#f5f5f5',
                        borderRadius: 6
                    }}>
                        {isImageFile(file) ? (
                            <Image
                                src={previewUrl}
                                alt={file.name}
                                width={48}
                                height={48}
                                style={{ objectFit: 'cover', borderRadius: 6 }}
                                preview={{ src: previewUrl }}
                            />
                        ) : isVideoFile(file) ? (
                            <video
                                src={previewUrl}
                                style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 6 }}
                                controls={false}
                                muted
                            />
                        ) : (
                            getFileIcon(file)
                        )}
                    </div>
                    
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <Paragraph 
                            ellipsis={{ tooltip: file.name }} 
                            style={{ marginBottom: 4, fontSize: '14px', fontWeight: 500 }}
                        >
                            {file.name}
                        </Paragraph>
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                            {formatFileSize(file.size)}
                        </Text>
                    </div>
                </div>
            </Card>
        );
    };

    const getFileTypeText = () => {
        switch (acceptedFileTypes) {
            case 'image':
                return '圖片';
            case 'video':
                return '影片';
            case 'all':
            default:
                return '圖片和影片';
        }
    };

    // Ant Design Upload props
    const uploadProps: UploadProps = {
        name: 'files',
        multiple: true,
        accept: getMimeTypes(acceptedFileTypes),
        beforeUpload: (file, fileList) => {
            // 使用我们自定义的验证逻辑
            const dt = new DataTransfer();
            fileList.forEach(f => dt.items.add(f));
            handleFileValidationAndAdd(dt.files);
            return false; // 阻止默认上传行为
        },
        showUploadList: false,
        disabled: files.length >= maxFiles
    };

    return (
        <div style={{ width: '100%' }}>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                {/* 錯誤提示 */}
                {error && (
                    <Alert
                        message={error}
                        type="error"
                        showIcon
                        closable
                        onClose={() => setError(null)}
                    />
                )}

                {/* 上傳區域 */}
                {files.length < maxFiles && (
                    <Dragger {...uploadProps} style={{ padding: '20px' }}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined style={{ fontSize: '48px', color: '#d9d9d9' }} />
                        </p>
                        <p className="ant-upload-text" style={{ fontSize: '16px', fontWeight: 500 }}>
                            拖拽或點擊上傳{getFileTypeText()}
                        </p>
                        <p className="ant-upload-hint" style={{ color: '#999' }}>
                            每個文件大小不超過 <span style={{ color: '#faad14' }}>{maxFileSize}MB</span>
                        </p>
                        <p className="ant-upload-hint" style={{ color: '#999' }}>
                            還有 <span style={{ color: '#ff4d4f' }}>{maxFiles - files.length}</span> 個文件
                        </p>
                        
                        <div style={{ marginTop: 16 }}>
                            <Button type="default" icon={<UploadOutlined />}>
                                選擇文件
                            </Button>
                        </div>
                        
                        <input
                            type="file"
                            ref={inputRef}
                            multiple
                            accept={getMimeTypes(acceptedFileTypes)}
                            onChange={handleFileSelect}
                            style={{ display: 'none' }}
                        />
                    </Dragger>
                )}

                {/* 預覽 */}
                {files.length > 0 && (
                    <div>
                        <Text strong>{files.length} 個文件已選擇</Text>
                        <div style={{ marginTop: 12 }}>
                            {files.map((file, index) => (
                                renderPreview(file, previews[index], index)
                            ))}
                        </div>
                    </div>
                )}
            </Space>
        </div>
    );
};

export default FileUploader;