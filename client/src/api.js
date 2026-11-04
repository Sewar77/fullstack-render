import axios from "axios"
export const api = axios.create({
    baseURL: process.env.BACKEND_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    }
})

// Interceptor to handle expired access tokens
api.interceptors.response.use(
    (response) => response, // If request succeeds, just return it
    async (error) => {
        const originalRequest = error.config;
        // Check if error is 401 and we haven't retried this request yet
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                // Hit the refresh endpoint. 
                // The browser automatically sends the HTTP-only refreshToken cookie.
                // The backend will respond by setting a new accessToken cookie.
                await axios.post(
                    `${process.env.BACKEND_URL}/auth/refresh`,
                    {},
                    { withCredentials: true }
                );
                // Retry the original request now that the new cookie is set
                return api(originalRequest);
            } catch (refreshError) {
                // Refresh token is also expired or invalid -> Log user out
                console.error("Refresh token expired. Redirecting to login...");
                // window.location.href = "/login"; 
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);