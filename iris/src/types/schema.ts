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

export interface AnalysisRequest {
  caseId: string;
  slideUrl: string;
  options?: {
    detailLevel: 'low' | 'medium' | 'high';
    focusAreas: string[];
  };
}

export interface AnalysisResponse {
  report: Report;
  processingTime: number;
}

// 每一个分析点（对应 PDF 中的 ）
export interface AnalysisPoint {
  category: 'Structure' | 'Cellular' | 'Invasion'; // 结构、细胞、浸润
  description: string; // 例如："正常小叶/腺泡结构被不规则细胞团块取代..."
  citations: number[]; // 引用的文献ID，例如 [3]
}

// 整个病例的 AI 报告
export interface CaseReport {
  id: string;
  imageObj: string; // 切片图片地址
  malignancyScore: number; // 恶性概率，例如 0.98
  confidenceScore: number; // 置信度，例如 8.942
  findings: AnalysisPoint[]; // 具体的发现列表
  references: string[]; // 参考文献列表
}
