import type { CaseData, Case, Report } from '../types';

/**
 * 当前使用的模拟病例数据
 */
export const MOCK_CASE: CaseData = {
  id: 'case-20251211-04',
  filename: 'Case_20251211_04.svs',
  malignancyScore: 0.98,
  confidenceScore: 8.942,
  findings: [
    {
      category: 'Structure',
      description: '正常小叶/腺泡结构被不规则细胞团块取代，腺体排列紊乱',
      citations: [3]
    },
    {
      category: 'Cellular',
      description: '可疑区域内细胞核明显增大、深染，形态参差不齐，核浆比增高，可见核分裂象',
      citations: [4]
    },
    {
      category: 'Invasion',
      description: '局部可见细胞巢/条索样结构向间质或脂肪组织延伸',
      citations: [5]
    }
  ],
  evidence: [
    {
      similarity: '96%',
      referenceId: 'Ref: IDC_Case_92',
      source: 'WHO Database',
      relatedFeatures: '细胞核异型性相似度极高，均可见粉刺样坏死'
    },
    {
      similarity: '82%',
      referenceId: 'Diff: ILC_Case_45',
      source: 'Internal Database',
      relatedFeatures: '用于鉴别小叶癌'
    }
  ]
};

/**
 * 模拟病例列表（用于扩展功能）
 */
export const mockCases: Case[] = [
  {
    id: 'case-1',
    name: '病例 1',
    slideUrl: 'https://example.com/slide-1.svs',
    metadata: {
      patientId: 'patient-1',
      date: '2024-01-01',
      type: '乳腺病理'
    }
  },
  {
    id: 'case-2',
    name: '病例 2',
    slideUrl: 'https://example.com/slide-2.svs',
    metadata: {
      patientId: 'patient-2',
      date: '2024-01-02',
      type: '肺部病理'
    }
  }
];

/**
 * 模拟报告列表（用于扩展功能）
 */
export const mockReports: Report[] = [
  {
    id: 'report-1',
    caseId: 'case-1',
    diagnosis: '乳腺浸润性导管癌',
    confidence: 0.95,
    evidence: [
      {
        type: '形态学',
        description: '癌细胞呈巢状排列，核异型性明显',
        location: '中央区域'
      },
      {
        type: '免疫组化',
        description: 'ER阳性，PR阳性，HER2阴性',
        location: '全片'
      }
    ],
    recommendations: [
      '建议进行手术治疗',
      '建议进行化疗',
      '建议定期复查'
    ],
    createdAt: '2024-01-01T12:00:00Z'
  }
];

/**
 * 根据 ID 获取模拟病例
 */
export const getMockCase = (id: string): Case | undefined => {
  return mockCases.find(c => c.id === id);
};

/**
 * 根据病例 ID 获取模拟报告
 */
export const getMockReport = (caseId: string): Report | undefined => {
  return mockReports.find(r => r.caseId === caseId);
};
