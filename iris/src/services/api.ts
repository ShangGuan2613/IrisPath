import axios from 'axios';
import { MOCK_CASE } from '../lib/mock-data';

// 创建 axios 实例
const apiClient = axios.create({
  baseURL: '/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

// 上传切片并分析
export const uploadSlide = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.post('/analyze', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.warn('后端服务未响应，使用模拟数据:', error);
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 1000));
    // 返回模拟数据
    return MOCK_CASE;
  }
};

export default apiClient;