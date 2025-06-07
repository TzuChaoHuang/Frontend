export const UploadFiles = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('/api/File/Upload', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Upload failed');
        }

        return await response.json();
    } catch (error) {
        console.error('Upload error:', error);
        throw error;
    }
}

