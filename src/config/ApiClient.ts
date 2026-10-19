// import useAuth from "@/auth/store";
// import { refreshToken } from "@/services/AuthServices";
// import axios, {
//   type InternalAxiosRequestConfig,
// } from "axios";

// const apiClient = axios.create({
//   baseURL:
//     import.meta.env.VITE_API_BASE_URL ||
//     "http://localhost:8083/api/v1",

//   headers: {
//     "Content-Type": "application/json",
//   },

//   withCredentials: true,

//   timeout: 10000,
// });

// // =====================================================
// // REQUEST INTERCEPTOR
// // =====================================================

// apiClient.interceptors.request.use(
//   (config) => {
//     const accessToken = useAuth.getState().accessToken;

//     console.log("Access Token:", accessToken);

//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // =====================================================
// // REFRESH TOKEN QUEUE
// // =====================================================

// let isRefreshing = false;

// let pending: Array<(newToken: string | null) => void> = [];

// function queueRequest(cb: (newToken: string | null) => void) {
//   pending.push(cb);
// }

// function resolveQueue(newToken: string | null) {
//   pending.forEach((cb) => cb(newToken));
//   pending = [];
// }

// // =====================================================
// // RESPONSE INTERCEPTOR
// // =====================================================

// apiClient.interceptors.response.use(
//   (response) => {
//     return response;
//   },

//   async (error) => {
//     console.log("API Error:", error);

//     const status = error.response?.status;

//     const original = error.config as
//       | (InternalAxiosRequestConfig & {
//           _retry?: boolean;
//         })
//       | undefined;

//     // No config
//     if (!original) {
//       return Promise.reject(error);
//     }

//     console.log("Status:", status);
//     console.log("Original retry:", original._retry);

//     // Only handle 401
//     if (status !== 401 || original._retry) {
//       return Promise.reject(error);
//     }

//     // =================================================
//     // Don't refresh again for refresh API
//     // =================================================

//     if (original.url?.includes("/auth/refresh")) {
//       return Promise.reject(error);
//     }

//     // Mark request as retry
//     original._retry = true;

//     // =================================================
//     // Already refreshing
//     // =================================================

//     if (isRefreshing) {
//       console.log("Already refreshing......");

//       return new Promise((resolve, reject) => {
//         queueRequest((newToken: string | null) => {
//           if (!newToken) {
//             reject(error);
//             return;
//           }

//           original.headers.Authorization =
//             `Bearer ${newToken}`;

//           resolve(apiClient(original));
//         });
//       });
//     }

//     // =================================================
//     // Start refresh
//     // =================================================

//     isRefreshing = true;

//     try {
//       console.log("Start refreshing......");

//       const loginResponse = await refreshToken();

//       const newToken = loginResponse.accessToken;

//       console.log("New Access Token:", newToken);

//       if (!newToken) {
//         throw new Error("No access token received");
//       }

//       // =================================================
//       // Update Zustand
//       // =================================================

//       useAuth.getState().changeLocalLoginData(
//         loginResponse.accessToken,
//         loginResponse.user,
//         true
//       );

//       // =================================================
//       // Resolve pending requests
//       // =================================================

//       resolveQueue(newToken);

//       // =================================================
//       // Retry original request
//       // =================================================

//       original.headers.Authorization =
//         `Bearer ${newToken}`;

//       return apiClient(original);
//     } catch (refreshError) {
//       console.error(
//         "Refresh token failed:",
//         refreshError
//       );

//       // Reject all pending queued requests instead of leaving them hanging
//       resolveQueue(null);

//       // Clear authentication state
//       useAuth.setState({
//         accessToken: null,
//         user: null,
//         authState: false,
//         authLoading: false,
//       });

//       return Promise.reject(refreshError);
//     } finally {
//       isRefreshing = false;
//     }
//   }
// );

// export default apiClient;

import useAuth from "@/auth/store";
import { refreshToken } from "@/services/AuthServices";
import axios, {
  type InternalAxiosRequestConfig,
} from "axios";

const apiClient = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    "http://localhost:8083/api/v1",

  withCredentials: true,
  timeout: 10000,
});

// =====================================================
// REQUEST INTERCEPTOR
// =====================================================

apiClient.interceptors.request.use(
  (config) => {
    const accessToken = useAuth.getState().accessToken;

    // Support both JSON and FormData requests
    if (config.data instanceof FormData) {
      config.headers.delete("Content-Type");
    } else if (!config.headers.get("Content-Type")) {
      config.headers.set(
        "Content-Type",
        "application/json"
      );
    }

    // Attach access token
    if (accessToken) {
      config.headers.set(
        "Authorization",
        `Bearer ${accessToken}`
      );
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// =====================================================
// REFRESH TOKEN QUEUE
// =====================================================

let isRefreshing = false;

let pending: Array<
  (newToken: string | null) => void
> = [];

function queueRequest(
  callback: (newToken: string | null) => void
) {
  pending.push(callback);
}

function resolveQueue(newToken: string | null) {
  pending.forEach((callback) => callback(newToken));
  pending = [];
}

// =====================================================
// RESPONSE INTERCEPTOR
// =====================================================

apiClient.interceptors.response.use(
  (response) => response,

  async (error) => {
    const status = error.response?.status;

    const original = error.config as
      | (InternalAxiosRequestConfig & {
          _retry?: boolean;
        })
      | undefined;

    if (!original) {
      return Promise.reject(error);
    }

    // Refresh only for 401 responses
    if (status !== 401 || original._retry) {
      return Promise.reject(error);
    }

    // Don't refresh again for refresh API
    if (original.url?.includes("/auth/refresh")) {
      return Promise.reject(error);
    }

    original._retry = true;

    // Queue requests while refresh is in progress
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        queueRequest((newToken) => {
          if (!newToken) {
            reject(error);
            return;
          }

          original.headers.set(
            "Authorization",
            `Bearer ${newToken}`
          );

          resolve(apiClient(original));
        });
      });
    }

    isRefreshing = true;

    try {
      const loginResponse = await refreshToken();
      const newToken = loginResponse.accessToken;

      if (!newToken) {
        throw new Error("No access token received");
      }

      // Update Zustand authentication state
      useAuth.getState().changeLocalLoginData(
        newToken,
        loginResponse.user,
        true
      );

      // Retry queued requests
      resolveQueue(newToken);

      original.headers.set(
        "Authorization",
        `Bearer ${newToken}`
      );

      return apiClient(original);
    } catch (refreshError) {
      // Reject queued requests
      resolveQueue(null);

      // Clear authentication state
      useAuth.setState({
        accessToken: null,
        user: null,
        authState: false,
        authLoading: false,
      });

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default apiClient;