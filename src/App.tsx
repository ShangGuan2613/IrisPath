import React, { useEffect, useState } from 'react';
import Header from './components/layout/Header';
import ChatPanel from './components/pathology/ChatPanel';
import CanvasViewer from './components/pathology/CanvasViewer';
import EvidencePanel from './components/pathology/EvidencePanel';

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-slate-50 transition-all duration-500">
      {/* 顶部导航栏 */}
      <Header />
      
      {/* 中间内容区域 - 三栏式布局 */}
      <main className="flex-1 flex overflow-hidden relative">
        {/* 左侧栏 - 分析报告和聊天框 */}
        <div 
          className="w-[320px] overflow-hidden bg-white border-r border-slate-200 transition-all duration-500 ease-out"
          style={{ 
            opacity: isLoaded ? 1 : 0, 
            transform: isLoaded ? 'translateX(0)' : 'translateX(-20px)'
          }}
        >
          <ChatPanel />
        </div>
        
        {/* 中间画布 - 核心区域 */}
        <div 
          className="flex-1 overflow-hidden relative transition-all duration-500 ease-out delay-100"
          style={{ 
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'scale(1)' : 'scale(0.98)'
          }}
        >
          <CanvasViewer />
        </div>
        
        {/* 右侧栏 - 证据图谱 */}
        <div 
          className="w-[300px] overflow-hidden bg-white border-l border-slate-200 transition-all duration-500 ease-out delay-200"
          style={{ 
            opacity: isLoaded ? 1 : 0, 
            transform: isLoaded ? 'translateX(0)' : 'translateX(20px)'
          }}
        >
          <EvidencePanel />
        </div>
      </main>
    </div>
  );
};

export default App;
