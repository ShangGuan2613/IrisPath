import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { CaseData } from '../../types';

interface AnalysisPanelProps {
  caseData: CaseData;
}

const AnalysisPanel: React.FC<AnalysisPanelProps> = ({ caseData }) => {
  const [message, setMessage] = useState('');

  // 根据分类获取颜色
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Structure':
        return 'border-rose-400';
      case 'Cellular':
        return 'border-blue-400';
      case 'Invasion':
        return 'border-amber-400';
      default:
        return 'border-gray-400';
    }
  };

  // 渲染引用标记
  const renderCitations = (citations: number[]) => {
    return citations.map((cite, index) => (
      <sup key={index} className="ml-1">
        <span className="text-blue-500 bg-blue-50 px-1 rounded text-xs cursor-pointer hover:bg-blue-100 transition-colors">
          {cite}
        </span>
      </sup>
    ));
  };

  return (
    <div className="w-full h-full bg-slate-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="h-16 border-b border-slate-200 flex items-center justify-between px-6">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-semibold text-slate-800">IrisPath</h1>
          <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded font-medium">PRO</span>
        </div>
        <p className="text-sm text-slate-600">Multimodal Pathology Agent</p>
      </div>

      {/* 主要内容区域 - 可滚动 */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Info Card */}
        <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 p-4 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold text-slate-700 mb-3">Case Information</h2>
          <div className="space-y-3">
            <div>
              <span className="text-slate-500 text-sm">Filename:</span>
              <span className="ml-2 font-medium text-slate-700">{caseData.filename}</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-slate-500 text-sm">Confidence Score:</span>
              <span className="text-3xl font-bold text-blue-600">
                {caseData.confidenceScore}
              </span>
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-sm text-green-600 font-medium">High Confidence</span>
            </div>
          </div>
        </div>

        {/* Findings List */}
        <div>
          <h2 className="text-lg font-semibold text-slate-700 mb-4">Findings</h2>
          <div className="space-y-3">
            {caseData.findings.map((finding, index) => (
              <div 
                key={index} 
                className={`bg-white p-4 rounded-lg border-l-4 ${getCategoryColor(finding.category)} border border-slate-100 shadow-sm hover:shadow-md transition-all`}
              >
                {/* 发现内容 */}
                <div className="space-y-2">
                  <div className="font-medium text-slate-800">
                    {finding.category === 'Structure' && 'Structure Level:'}
                    {finding.category === 'Cellular' && 'Cellular Level:'}
                    {finding.category === 'Invasion' && 'Invasion Related:'}
                  </div>
                  <p className="text-slate-600">
                    {finding.description}
                    {renderCitations(finding.citations)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Evidence Graph */}
        <div className="bg-white border border-slate-100 p-4 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold text-slate-700 mb-3">IRIS EVIDENCE GRAPH</h2>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
            <p className="text-center text-slate-800 font-medium">
              Top Match: 96% (IDC_Case_92)
            </p>
          </div>
        </div>
      </div>

      {/* 底部悬浮聊天框 */}
      <div className="px-6 pb-6 pt-2">
        <div className="flex space-x-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="基于这张切片，帮我分析一下..."
            className="flex-1 bg-white border border-slate-200 rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg transition-colors">
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalysisPanel;
