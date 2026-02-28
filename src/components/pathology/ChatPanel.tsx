import React, { useState, useCallback, memo } from 'react';
import { FileCheck, User, BrainCircuit, ChevronDown, AlertTriangle, FileText, Microscope, Paperclip, ArrowUp } from 'lucide-react';
import { useCaseStore, selectCurrentCase } from '../../store/useCaseStore';
import type { AnalysisPoint } from '../../types';

// 子组件：用户消息
const UserMessage = memo(() => (
  <div className="flex flex-row-reverse gap-3">
    <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 shrink-0">
      <User className="w-4 h-4" />
    </div>
    <div className="space-y-1 text-right max-w-[85%]">
      <div className="bg-slate-100 text-slate-800 px-3 py-2.5 rounded-2xl rounded-tr-none text-sm inline-block text-left">
        <p>基于这张切片，帮我分析一下：癌变了吗？</p>
      </div>
    </div>
  </div>
));

UserMessage.displayName = 'UserMessage';

// 子组件：分析发现项
interface FindingItemProps {
  finding: AnalysisPoint;
  index: number;
}

const FindingItem = memo<FindingItemProps>(({ finding, index }) => (
  <div key={index} className="space-y-1">
    <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
      <span className="w-1.5 h-1.5 bg-orange-400 rounded-full"></span>
      {finding.category}
    </div>
    <p className="text-xs text-slate-500 leading-relaxed pl-3.5 border-l border-gray-100">
      [cite_start]{finding.description} [cite: {finding.citations[0]}]。
    </p>
  </div>
));

FindingItem.displayName = 'FindingItem';

// 子组件：AI 响应
interface AIResponseProps {
  confidenceScore: number;
  findings: AnalysisPoint[];
  isThinkingExpanded: boolean;
  onToggleThinking: () => void;
}

const AIResponse = memo<AIResponseProps>(
  ({ confidenceScore, findings, isThinkingExpanded, onToggleThinking }) => (
    <div className="flex gap-3">
      <div className="w-8 h-8 bg-gradient-to-br from-iris-500 to-indigo-600 rounded-full flex items-center justify-center text-white shrink-0 shadow-md shadow-iris-100 mt-1">
        <BrainCircuit className="w-4 h-4 animate-spin-slow" />
      </div>
      <div className="flex-1 space-y-3 min-w-0">
        <button
          onClick={onToggleThinking}
          className="text-xs text-gray-400 flex items-center gap-2 mb-1 cursor-pointer hover:text-gray-600 transition-colors w-full"
        >
          <BrainCircuit className="w-3 h-3" />
          <span>Thinking Process (2.4s)</span>
          <div className="flex-1 h-px bg-gray-100"></div>
          <ChevronDown
            className={`w-3 h-3 transition-transform ${isThinkingExpanded ? 'rotate-180' : ''}`}
          />
        </button>

        <div className="bg-white border border-he-100 rounded-xl overflow-hidden shadow-sm">
          <div className="bg-he-50 px-4 py-3 border-b border-he-100 flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-he-500 shadow-sm">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-he-900">高度怀疑恶性病变</h3>
              <p className="text-[10px] text-he-500 font-mono">
                Confidence Score: {confidenceScore}
              </p>
            </div>
          </div>

          <div className="p-4 space-y-4">
            {findings.map((finding, index) => (
              <FindingItem key={finding.category} finding={finding} index={index} />
            ))}
          </div>

          <div className="bg-slate-50 px-4 py-2 border-t border-gray-100">
            <p className="text-[10px] text-gray-400 italic">
              [cite_start]*结果仅供辅助参考，最终诊断需病理医师确认 [cite: 9]。
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-[10px] font-medium text-slate-600 hover:border-iris-300 hover:text-iris-600 transition-all flex items-center gap-1.5">
            <FileText className="w-3 h-3" /> 生成报告
          </button>
          <button className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-[10px] font-medium text-slate-600 hover:border-iris-300 hover:text-iris-600 transition-all flex items-center gap-1.5">
            <Microscope className="w-3 h-3" /> 二次复核
          </button>
        </div>
      </div>
    </div>
  )
);

AIResponse.displayName = 'AIResponse';

// 子组件：输入框
const ChatInput = memo(() => {
  const [message, setMessage] = useState('');

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  }, []);

  return (
    <div className="p-4 border-t border-gray-200 bg-white z-10">
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-iris-500 to-he-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
        <div className="relative bg-white border border-gray-200 rounded-xl flex items-center p-1.5 shadow-sm">
          <button className="p-2 text-gray-400 hover:text-iris-600 transition-colors">
            <Paperclip className="w-4 h-4" />
          </button>
          <input
            type="text"
            placeholder="向 Iris 提问病理细节..."
            className="flex-1 text-xs bg-transparent border-none outline-none px-2 text-slate-700 h-8"
            value={message}
            onChange={handleChange}
          />
          <button className="p-1.5 bg-slate-900 text-white rounded-lg hover:bg-iris-600 transition-colors shadow-sm">
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
});

ChatInput.displayName = 'ChatInput';

// 主组件
const ChatPanel: React.FC = () => {
  const [isThinkingExpanded, setIsThinkingExpanded] = useState(false);
  const currentCase = useCaseStore(selectCurrentCase);

  const handleToggleThinking = useCallback(() => {
    setIsThinkingExpanded((prev) => !prev);
  }, []);

  return (
    <aside className="w-full h-full bg-white border-r border-gray-200 flex flex-col z-20 flex-shrink-0 shadow-[4px_0_20px_rgba(0,0,0,0.02)]">
      <div className="p-3 border-b border-gray-100 bg-slate-50/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileCheck className="w-4 h-4 text-iris-500" />
          <span className="text-xs font-mono text-slate-600">{currentCase.filename}</span>
        </div>
        <span className="text-[9px] bg-white border border-gray-200 px-1.5 py-0.5 rounded text-gray-400">
          1.2 GB
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 no-scrollbar">
        <UserMessage />
        <AIResponse
          confidenceScore={currentCase.confidenceScore}
          findings={currentCase.findings}
          isThinkingExpanded={isThinkingExpanded}
          onToggleThinking={handleToggleThinking}
        />
      </div>

      <ChatInput />
    </aside>
  );
};

export default memo(ChatPanel);
