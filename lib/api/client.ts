import axios from "axios";

const rawBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080/api/v1";

export const BASE_URL = rawBaseUrl.replace(/\/$/, "");

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (error: any = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve();
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/login") &&
      !originalRequest.url?.includes("/auth/signup") &&
      !originalRequest.url?.includes("/auth/refresh")
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => api(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await api.post("/auth/refresh");
        processQueue(null);
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        const protectedRoutes = ["/student", "/teacher", "/profile", "/dashboard"];
        const isCurrentRouteProtected = typeof window !== "undefined" && 
          protectedRoutes.some((route) => window.location.pathname.startsWith(route));

        if (isCurrentRouteProtected) {
          window.location.href = "/auth/login";
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export function getApiErrorMessage(error: any, fallback: string): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data;
    const subErrors = data?.error?.subErrors || data?.subErrors;

    if (Array.isArray(subErrors) && subErrors.length > 0) {
      const formatted = subErrors
        .map((err: any) => {
          if (typeof err === "string") return err;
          if (err && typeof err === "object") {
            if (err.field && err.message) return `${err.field}: ${err.message}`;
            if (err.message) return err.message;
          }
          return String(err);
        })
        .filter(Boolean)
        .join("; ");

      if (formatted) {
        return formatted;
      }
    }

    return (
      data?.error?.message ??
      data?.message ??
      fallback
    );
  }

  return fallback;
}

export default api;
