import React, { useState, useRef, useEffect } from 'react';
import { Hand, PenTool, Ruler, Layers, Plus, Minus, Target } from 'lucide-react';

interface SlideViewerProps {
  malignancyScore?: number;
}

const SlideViewer: React.FC<SlideViewerProps> = ({ malignancyScore = 0.98 }) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const viewportRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const newScale = Math.min(Math.max(scale + e.deltaY * -0.001, 0.5), 4);
    setScale(newScale);
  };

  const zoomIn = () => setScale(Math.min(scale + 0.2, 4));
  const zoomOut = () => setScale(Math.max(scale - 0.2, 0.5));

  return (
    <section className="flex-1 relative flex flex-col min-w-0 viewport-bg overflow-hidden group">
      
      <div 
        ref={viewportRef}
        className="w-full h-full relative cursor-grab active:cursor-grabbing overflow-hidden"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        <div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-white rounded-lg shadow-2xl overflow-hidden transition-transform duration-75"
          style={{
            transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px)) scale(${scale})`
          }}
        >
          
          <div className="digital-tissue-pattern w-full h-full relative">
            <div className="absolute bottom-4 left-4 bg-black/70 text-white text-[9px] px-2 py-0.5 rounded backdrop-blur-sm z-10 font-mono">
              200 μm
            </div>
            
            <div className="absolute top-[35%] left-[45%] w-48 h-48 pointer-events-none">
              <div className="absolute inset-0 border border-he-500/50 rounded-full animate-pulse"></div>
              <div className="absolute inset-0 bg-he-500/5 rounded-full animate-radar"></div>
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <div className="bg-he-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap flex items-center gap-1">
                  <Target className="w-3 h-3" />
                  ROI: High Malignancy ({malignancyScore.toFixed(2)})
                </div>
                <div className="w-px h-6 bg-he-600/50"></div>
              </div>
            </div>

            <div className="absolute bottom-[20%] right-[30%] w-24 h-24 border border-dashed border-orange-400/60 rounded-full flex items-center justify-center">
              <span className="text-[8px] text-orange-600 bg-white/80 px-1 rounded shadow-sm">异型性关注</span>
            </div>
          </div>

          <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start pointer-events-none">
            <div className="glass px-3 py-1.5 rounded-lg flex gap-3 pointer-events-auto">
              <div className="flex flex-col">
                <span className="text-[9px] text-gray-400 uppercase tracking-wider">Modality</span>
                <span className="text-xs font-bold text-slate-700">WSI / H&E</span>
              </div>
              <div className="w-px h-full bg-gray-200"></div>
              <div className="flex flex-col">
                <span className="text-[9px] text-gray-400 uppercase tracking-wider">Magnification</span>
                <span className="text-xs font-bold text-slate-700">40x</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 glass rounded-2xl px-2 py-2 flex items-center gap-2 shadow-xl z-30 scale-90 md:scale-100">
        <button className="p-2 hover:bg-slate-100 rounded-xl text-slate-600 transition-colors tooltip" title="Pan">
          <Hand className="w-5 h-5" />
        </button>
        <div className="w-px h-4 bg-gray-300 mx-1"></div>
        <button className="p-2 hover:bg-slate-100 rounded-xl text-slate-600 transition-colors">
          <PenTool className="w-5 h-5" />
        </button>
        <button className="p-2 hover:bg-slate-100 rounded-xl text-slate-600 transition-colors">
          <Ruler className="w-5 h-5" />
        </button>
        <button className="p-2 bg-iris-50 text-iris-600 rounded-xl transition-colors ring-1 ring-iris-200">
          <Layers className="w-5 h-5" />
        </button>
        <div className="w-px h-4 bg-gray-300 mx-1"></div>
        <button onClick={zoomOut} className="p-2 hover:bg-slate-100 rounded-xl text-slate-600">
          <Minus className="w-5 h-5" />
        </button>
        <button onClick={zoomIn} className="p-2 hover:bg-slate-100 rounded-xl text-slate-600">
          <Plus className="w-5 h-5" />
        </button>
      </div>

    </section>
  );
};

export default SlideViewer;
