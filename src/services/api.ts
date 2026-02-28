import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { ENV, isAllowedFileType, isAllowedFileSize } from '../config/env';
import { MOCK_CASE } from '../lib/mock-data';

// 创建 axios 实例
const apiClient = axios.create({
  baseURL: ENV.API_BASE_URL,
  timeout: ENV.API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
apiClient.interceptors.request.use(
  (config) => {
    // 可以在这里添加认证 token
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // 统一错误处理
    if (error.response) {
      // 服务器返回错误状态码
      console.error('API Error:', error.response.status, error.response.data);
    } else if (error.request) {
      // 请求发出但没有收到响应
      console.error('Network Error:', error.message);
    } else {
      // 请求配置出错
      console.error('Request Error:', error.message);
    }
    return Promise.reject(error);
  }
);

/**
 * 验证文件
 */
const validateFile = (file: File): { valid: boolean; error?: string } => {
  if (!isAllowedFileType(file.name)) {
    return {
      valid: false,
      error: `不支持的文件类型。允许的类型: ${ENV.ALLOWED_FILE_TYPES.join(', ')}`,
    };
  }

  if (!isAllowedFileSize(file.size)) {
    const maxSizeMB = ENV.MAX_FILE_SIZE / (1024 * 1024);
    return {
      valid: false,
      error: `文件过大。最大允许: ${maxSizeMB}MB`,
    };
  }

  return { valid: true };
};

/**
 * 上传切片并分析
 */
export const uploadSlide = async (file: File) => {
  // 文件验证
  const validation = validateFile(file);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  try {
    const formData = new FormData();
    formData.append('file', file);

    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      // 可以添加上传进度回调
      // onUploadProgress: (progressEvent) => {
      //   const percentCompleted = progressEvent.total
      //     ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
      //     : 0;
      //   console.log('Upload Progress:', percentCompleted);
      // },
    };

    const response = await apiClient.post('/analyze', formData, config);
    return response.data;
  } catch (error) {
    // 开发环境下使用模拟数据
    if (ENV.IS_DEV) {
      console.warn('后端服务未响应，使用模拟数据:', error);
      // 模拟网络延迟
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return MOCK_CASE;
    }

    // 生产环境抛出错误
    throw error;
  }
};

/**
 * 带重试的请求
 */
export const requestWithRetry = async <T>(
  requestFn: () => Promise<T>,
  retries = 3,
  delay = 1000
): Promise<T> => {
  try {
    return await requestFn();
  } catch (error) {
    if (retries > 0) {
      await new Promise((resolve) => setTimeout(resolve, delay));
      return requestWithRetry(requestFn, retries - 1, delay * 2);
    }
    throw error;
  }
};

export default apiClient;
