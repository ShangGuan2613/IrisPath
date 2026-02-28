/**
 * 病理分析系统类型定义
 * 集中管理所有类型定义
 */

// ==================== 核心类型 ====================

/**
 * 分析点类型
 */
export type CategoryType = 'Structure' | 'Cellular' | 'Invasion';

/**
 * 分析点（对应病理分析的具体发现）
 */
export interface AnalysisPoint {
  category: CategoryType;
  description: string;
  citations: number[];
}

/**
 * 证据项
 */
export interface EvidenceItem {
  similarity: string;
  referenceId: string;
  source: string;
  relatedFeatures: string;
}

/**
 * 病例数据（前端主要使用的数据结构）
 */
export interface CaseData {
  id: string;
  filename: string;
  malignancyScore: number;
  confidenceScore: number;
  findings: AnalysisPoint[];
  evidence: EvidenceItem[];
}

// ==================== API 相关类型 ====================

/**
 * 病例（用于病例管理）
 */
export interface Case {
  id: string;
  name: string;
  slideUrl: string;
  metadata: {
    patientId: string;
    date: string;
    type: string;
  };
}

/**
 * 报告
 */
export interface Report {
  id: string;
  caseId: string;
  diagnosis: string;
  confidence: number;
  evidence: {
    type: string;
    description: string;
    location: string;
  }[];
  recommendations: string[];
  createdAt: string;
}

/**
 * 分析请求
 */
export interface AnalysisRequest {
  caseId: string;
  slideUrl: string;
  options?: {
    detailLevel: 'low' | 'medium' | 'high';
    focusAreas: string[];
  };
}

/**
 * 分析响应
 */
export interface AnalysisResponse {
  report: Report;
  processingTime: number;
}

/**
 * 病例报告（AI 分析结果）
 */
export interface CaseReport {
  id: string;
  imageObj: string;
  malignancyScore: number;
  confidenceScore: number;
  findings: AnalysisPoint[];
  references: string[];
}

// ==================== 组件 Props 类型 ====================

/**
 * 切片查看器 Props
 */
export interface SlideViewerProps {
  malignancyScore?: number;
  className?: string;
}

/**
 * 分析面板 Props
 */
export interface AnalysisPanelProps {
  caseData: CaseData;
  className?: string;
}

// ==================== 工具类型 ====================

/**
 * 文件验证结果
 */
export interface FileValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * API 错误
 */
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}
