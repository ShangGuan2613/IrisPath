import { Case, Report } from '../types/schema';

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

export const getMockCase = (id: string): Case | undefined => {
  return mockCases.find(case => case.id === id);
};

export const getMockReport = (caseId: string): Report | undefined => {
  return mockReports.find(report => report.caseId === caseId);
};
