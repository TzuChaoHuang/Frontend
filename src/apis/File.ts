export const UploadFiles = async (files: File[]) => {
    const formData = new FormData();
    debugger;
    // Ensure each file is correctly added to FormData
    files.forEach((file) => {
        formData.append('files', file);
    });

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

        return response;
    } catch (error) {
        console.error('Upload error:', error);
        throw error;
    }
}

