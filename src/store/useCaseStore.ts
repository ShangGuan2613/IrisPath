import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { CaseData } from '../types';
import { MOCK_CASE } from '../lib/mock-data';
import { uploadSlide } from '../services/api';

interface CaseStore {
  currentCase: CaseData;
  isAnalyzing: boolean;
  error: string | null;
  uploadProgress: number;
}

interface CaseActions {
  analyzeImage: (file: File) => Promise<void>;
  resetError: () => void;
  setUploadProgress: (progress: number) => void;
  resetCase: () => void;
}

type CaseStoreWithActions = CaseStore & CaseActions;

const initialState: CaseStore = {
  currentCase: MOCK_CASE,
  isAnalyzing: false,
  error: null,
  uploadProgress: 0,
};

export const useCaseStore = create<CaseStoreWithActions>()(
  devtools(
    (set) => ({
      ...initialState,

      setUploadProgress: (progress: number) => {
        set({ uploadProgress: progress }, false, 'setUploadProgress');
      },

      analyzeImage: async (file: File) => {
        set(
          { isAnalyzing: true, error: null, uploadProgress: 0 },
          false,
          'analyzeImage/start'
        );

        try {
          const result = await uploadSlide(file);
          set(
            { currentCase: result, isAnalyzing: false, uploadProgress: 100 },
            false,
            'analyzeImage/success'
          );
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : '分析失败，请重试';
          set(
            { error: errorMessage, isAnalyzing: false, uploadProgress: 0 },
            false,
            'analyzeImage/error'
          );
        }
      },

      resetError: () => {
        set({ error: null }, false, 'resetError');
      },

      resetCase: () => {
        set(initialState, false, 'resetCase');
      },
    }),
    {
      name: 'CaseStore',
      enabled: import.meta.env.DEV,
    }
  )
);

// 选择器函数 - 优化性能
export const selectCurrentCase = (state: CaseStoreWithActions) => state.currentCase;
export const selectIsAnalyzing = (state: CaseStoreWithActions) => state.isAnalyzing;
export const selectError = (state: CaseStoreWithActions) => state.error;
export const selectUploadProgress = (state: CaseStoreWithActions) => state.uploadProgress;
