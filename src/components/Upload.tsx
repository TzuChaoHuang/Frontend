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
import { UploadFiles } from '@/apis/File';

const { Text, Paragraph } = Typography;
const { Dragger } = Upload;

// Define allowed file types
type FileType = 'image' | 'video' | 'all';

export interface FileContext {
    file: File;
    priview: string;
    context?: string;
}

// File uploader component properties
interface FileUploaderProps {
    maxFileSize?: number; // Maximum file size in MB
    acceptedFileTypes?: FileType; // Allowed file types
    onFilesSelected?: (files: FileContext[]) => void; // File selection callback
    maxFiles?: number; // Maximum number of files
}

// Get MIME types for file type
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

// Check if file is an image
const isImageFile = (file: File): boolean => {
    return file.type.startsWith('image/');
};

// Check if file is a video
const isVideoFile = (file: File): boolean => {
    return file.type.startsWith('video/');
};

// Format file size
const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// File uploader component
const FileUploader: React.FC<FileUploaderProps> = ({
    maxFileSize = 70, // Default 70MB
    acceptedFileTypes = 'all',
    onFilesSelected,
    maxFiles = 5
}) => {
    const [files, setFiles] = useState<FileContext[]>([]);
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Handle file validation and addition
    const handleFileValidationAndAdd = useCallback(async (newFiles: FileList | null) => {
        if (!newFiles || newFiles.length === 0) return;

        setError(null);

        // Check if exceeding maximum file count
        if (files.length + newFiles.length > maxFiles) {
            setError(`Maximum ${maxFiles} files allowed`);
            return;
        }

        const validFiles: FileContext[] = [];
        const maxSizeBytes = maxFileSize * 1024 * 1024; // Convert to bytes

        // Validate each file
        for (const file of Array.from(newFiles)) {
            // Check file size
            if (file.size > maxSizeBytes) {
                setError(`File ${file.name} exceeds maximum size of ${maxFileSize}MB`);
                continue;
            }

            // Check file type
            if (acceptedFileTypes === 'image' && !isImageFile(file)) {
                setError(`File ${file.name} is not an image`);
                continue;
            }

            if (acceptedFileTypes === 'video' && !isVideoFile(file)) {
                setError(`File ${file.name} is not a video`);
                continue;
            }

            if (acceptedFileTypes === 'all' && !isImageFile(file) && !isVideoFile(file)) {
                setError(`File ${file.name} is not an image or video`);
                continue;
            }

            const context = await uploadToServer(file);
            // Add file
            validFiles.push({
                file: file,
                priview: URL.createObjectURL(file),
                context: context
            });
        }

        if (validFiles.length > 0) {
            const newFilesArray = [...files, ...validFiles];
            setFiles(newFilesArray);

            // Callback Function
            if (onFilesSelected) {
                onFilesSelected(newFilesArray);
            }
        }
    }, [files, maxFileSize, maxFiles, acceptedFileTypes, onFilesSelected]);

    useEffect(() => {
        // Clean up old preview URLs
        files.forEach(file => URL.revokeObjectURL(file.priview));

        setFiles([]);
        setError(null);

        // Callback function
        if (onFilesSelected) {
            onFilesSelected([]);
        }
    }, [acceptedFileTypes]);

    // Handle file selection
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleFileValidationAndAdd(e.target.files);
        // Reset for repeated uploads
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    // Handle file deletion
    const handleFileRemove = (index: number) => {
        // Release preview
        URL.revokeObjectURL(files[index].priview);

        // Remove file and preview
        const newFiles = [...files];

        newFiles.splice(index, 1);

        setFiles(newFiles);

        // Callback function
        if (onFilesSelected) {
            onFilesSelected(newFiles);
        }
    };

    // File icon
    const getFileIcon = (file: File) => {
        if (isImageFile(file)) {
            return <FileImageOutlined style={{ fontSize: '24px' }} />;
        } else if (isVideoFile(file)) {
            return <VideoCameraOutlined style={{ fontSize: '24px' }} />;
        }
        return <FileOutlined style={{ fontSize: '24px' }} />;
    };

    const uploadToServer = async (file: File) => {
        try {
            const response = await UploadFiles(file);
            if (response.success) {
                // Upload successful
                console.log('Files uploaded successfully:', response);
            } else {
                // Upload failed
                setError('Upload failed');
            }
            // return file name
            return response.data; 
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred during upload');
        }
    }

    // Preview
    const renderPreview = (file: FileContext, index: number) => {
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
                        {isImageFile(file.file) ? (
                            <Image
                                src={file.priview}
                                alt={file.file.name}
                                width={48}
                                height={48}
                                style={{ objectFit: 'cover', borderRadius: 6 }}
                                preview={{ src: file.priview }}
                            />
                        ) : isVideoFile(file.file) ? (
                            <video
                                src={file.priview}
                                style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 6 }}
                                controls={false}
                                muted
                            />
                        ) : (
                            getFileIcon(file.file)
                        )}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                        <Paragraph
                            ellipsis={{ tooltip: file.file.name }}
                            style={{ marginBottom: 4, fontSize: '14px', fontWeight: 500 }}
                        >
                            {file.file.name}
                        </Paragraph>
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                            {formatFileSize(file.file.size)}
                        </Text>
                    </div>
                </div>
            </Card>
        );
    };

    const getFileTypeText = () => {
        switch (acceptedFileTypes) {
            case 'image':
                return 'Images';
            case 'video':
                return 'Videos';
            case 'all':
            default:
                return 'Images and Videos';
        }
    };

    // Ant Design Upload props
    const uploadProps: UploadProps = {
        name: 'files',
        multiple: true,
        accept: getMimeTypes(acceptedFileTypes),
        beforeUpload: (file, fileList) => {
            // Use our custom validation logic
            const dt = new DataTransfer();
            fileList.forEach(f => dt.items.add(f));
            handleFileValidationAndAdd(dt.files);
            return false; // Prevent default upload behavior
        },
        showUploadList: false,
        disabled: files.length >= maxFiles
    };

    return (
        <div style={{ width: '100%' }}>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                {/* Error message */}
                {error && (
                    <Alert
                        message={error}
                        type="error"
                        showIcon
                        closable
                        onClose={() => setError(null)}
                    />
                )}

                {/* Upload area */}
                {files.length < maxFiles && (
                    <Dragger {...uploadProps} style={{ padding: '20px' }}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined style={{ fontSize: '48px', color: '#d9d9d9' }} />
                        </p>
                        <p className="ant-upload-text" style={{ fontSize: '16px', fontWeight: 500 }}>
                            Drag and drop or click to upload {getFileTypeText()}
                        </p>
                        <p className="ant-upload-hint" style={{ color: '#999' }}>
                            Each file size should not exceed <span style={{ color: '#faad14' }}>{maxFileSize}MB</span>
                        </p>
                        <p className="ant-upload-hint" style={{ color: '#999' }}>
                            <span style={{ color: '#ff4d4f' }}>{maxFiles - files.length}</span> files remaining
                        </p>

                        <div style={{ marginTop: 16 }}>
                            <Button type="default" icon={<UploadOutlined />}>
                                Select Files
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

                {/* Preview */}
                {files.length > 0 && (
                    <div>
                        <Text strong>{files.length} files selected</Text>
                        <div style={{ marginTop: 12 }}>
                            {files.map((file, index) => (
                                renderPreview(file, index)
                            ))}
                        </div>
                    </div>
                )}
            </Space>
        </div>
    );
};

export default FileUploader;