import { CaseData } from '../types';

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
