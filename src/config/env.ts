/**
 * 环境变量配置
 * 集中管理所有环境变量，提供类型安全和默认值
 */

export const ENV = {
  // API 配置
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || '/api',
  API_TIMEOUT: Number(import.meta.env.VITE_API_TIMEOUT) || 30000,
  PROXY_TARGET: import.meta.env.VITE_PROXY_TARGET || 'http://localhost:8080',

  // 文件上传配置
  MAX_FILE_SIZE: Number(import.meta.env.VITE_MAX_FILE_SIZE) || 100 * 1024 * 1024, // 100MB
  ALLOWED_FILE_TYPES: (import.meta.env.VITE_ALLOWED_FILE_TYPES || '.svs,.tif,.tiff,.png,.jpg,.jpeg')
    .split(',')
    .map((t: string) => t.trim().toLowerCase()),

  // 应用配置
  APP_NAME: import.meta.env.VITE_APP_NAME || 'IrisPath',
  APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',

  // 环境判断
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD,
} as const;

/**
 * 验证文件类型是否允许
 */
export const isAllowedFileType = (filename: string): boolean => {
  const ext = filename.slice(filename.lastIndexOf('.')).toLowerCase();
  return ENV.ALLOWED_FILE_TYPES.includes(ext);
};

/**
 * 验证文件大小是否允许
 */
export const isAllowedFileSize = (size: number): boolean => {
  return size <= ENV.MAX_FILE_SIZE;
};
