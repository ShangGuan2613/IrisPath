import React from 'react';
import { Network, ExternalLink, Activity, GitCommit, BookOpen } from 'lucide-react';
import { useCaseStore } from '../../store/useCaseStore';

const EvidencePanel: React.FC = () => {
  const { currentCase } = useCaseStore();
  
  return (
    <aside className="w-full h-full bg-white border-l border-gray-200 flex flex-col z-20 flex-shrink-0 shadow-[-4px_0_20px_rgba(0,0,0,0.02)]">
      
      <div className="p-4 border-b border-gray-100">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
          <Network className="w-3 h-3" />
          Iris Evidence Graph
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-4 bg-slate-50 no-scrollbar">
        {currentCase.evidence.map((item, index) => (
          <div key={index} className="bg-white p-3 rounded-xl border border-iris-200 shadow-sm relative group cursor-pointer hover:border-iris-400 transition-all">
            <div className="absolute -left-3 top-1/2 w-3 h-px bg-iris-300"></div>
            <div className="absolute -left-3 top-1/2 w-1.5 h-1.5 bg-iris-500 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            
            <div className="flex justify-between items-start mb-2">
              <span className="text-[9px] font-bold bg-iris-50 text-iris-600 px-2 py-0.5 rounded-full border border-iris-100">Top Match: {item.similarity}</span>
              <ExternalLink className="w-3 h-3 text-gray-300" />
            </div>
            
            <div className="flex gap-3 items-center">
              <div className="w-12 h-12 rounded bg-he-50 border border-he-100 flex items-center justify-center shrink-0">
                <Activity className="w-5 h-5 text-he-400" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-slate-800">{item.referenceId}</h4>
                <p className="text-[10px] text-gray-500 truncate">Source: {item.source}</p>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-gray-50 text-[10px] text-slate-600">
              <span className="font-semibold text-iris-600">关联特征:</span> {item.relatedFeatures}
            </div>
          </div>
        ))}

        <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-100 border-dashed">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-3 h-3 text-blue-500" />
            <span className="text-[10px] font-bold text-blue-700">指南引用</span>
          </div>
          <p className="text-[10px] text-slate-600 leading-relaxed font-mono">
            &gt; [cite_start]CSCO乳腺癌诊疗指南(2024): 核分裂象计数&gt;3/10HPF，提示恶性风险 [cite: 7]。
          </p>
        </div>

      </div>
    </aside>
  );
};

export default EvidencePanel;
