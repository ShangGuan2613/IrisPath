export interface AnalysisPoint {
  category: 'Structure' | 'Cellular' | 'Invasion';
  description: string;
  citations: number[];
}

export interface EvidenceItem {
  similarity: string;
  referenceId: string;
  source: string;
  relatedFeatures: string;
}

export interface CaseData {
  id: string;
  filename: string;
  malignancyScore: number;
  confidenceScore: number;
  findings: AnalysisPoint[];
  evidence: EvidenceItem[];
}
