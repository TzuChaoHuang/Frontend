export interface FormRequest {
    isPassword: boolean;
    password?: string;
    description?: string;
    expiredDays: number;
    fileNames: string[];
}

export const CreateForm = async (data: FormRequest) => {
    try {
        const response = await fetch('/api/Form', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Form creation failed');
        }

        return response;
    } catch (error) {
        console.error('Form creation error:', error);
        throw error;
    }
}