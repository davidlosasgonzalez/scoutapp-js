import { useState } from 'react';

import toast from 'react-hot-toast';

const useFetch = () => {
    const [loading, setLoading] = useState(false);

    const fetchData = async ({
        url,
        method = 'get',
        body = null,
        authToken = '',
        isFormData = false,
        showToast = true,
        toastId,
    }) => {
        try {
            setLoading(true);

            const headers = authToken ? { Authorization: authToken } : {};

            if (!isFormData) {
                headers['Content-Type'] = 'application/json';
            }

            const res = await fetch(url, {
                method,
                headers,
                body: isFormData ? body : body ? JSON.stringify(body) : null,
            });

            const data = await res.json();

            if (data.status === 'error') {
                throw new Error(data.message);
            }

            showToast &&
                toast.success(data.message, {
                    id: toastId,
                });

            return data;
        } catch (err) {
            toast.error(err.message, {
                id: toastId,
            });
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { fetchData, loading };
};

export default useFetch;
