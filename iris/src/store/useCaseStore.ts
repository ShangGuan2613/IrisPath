import { create } from 'zustand';
import { CaseData } from '../types';
import { MOCK_CASE } from '../lib/mock-data';
import { uploadSlide } from '../services/api';

interface CaseStore {
  currentCase: CaseData;
  isAnalyzing: boolean;
  error: string | null;
  
  // Actions
  analyzeImage: (file: File) => Promise<void>;
  resetError: () => void;
}

export const useCaseStore = create<CaseStore>((set) => ({
  // 初始化状态，使用 MOCK_CASE 作为默认值
  currentCase: MOCK_CASE,
  isAnalyzing: false,
  error: null,
  
  // 分析图片
  analyzeImage: async (file: File) => {
    set({ isAnalyzing: true, error: null });
    
    try {
      const result = await uploadSlide(file);
      set({ currentCase: result, isAnalyzing: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : '分析失败',
        isAnalyzing: false 
      });
    }
  },
  
  // 重置错误
  resetError: () => set({ error: null }),
}));