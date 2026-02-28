import React, { useRef } from 'react';
import { Hand, PenTool, Ruler, Layers, Minus, Plus } from 'lucide-react';
import { useCaseStore } from '../../store/useCaseStore';

const CanvasViewer: React.FC = () => {
  const { currentCase, isAnalyzing, analyzeImage } = useCaseStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      analyzeImage(file);
    }
  };

  return (
    <div className="w-full h-full relative overflow-hidden bg-slate-50" style={{
      backgroundImage: `
        radial-gradient(circle, rgba(244, 63, 94, 0.1) 1px, transparent 1px),
        radial-gradient(circle, rgba(107, 114, 128, 0.1) 1px, transparent 1px)
      `,
      backgroundSize: '20px 20px, 40px 40px',
      backgroundPosition: '0 0, 20px 20px'
    }}>
      {/* 隐藏的文件输入 */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".svs,.tif,.tiff,.png,.jpg,.jpeg"
        onChange={handleFileUpload}
        className="hidden"
        id="slide-upload"
      />
      
      {/* 切片容器 */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-white rounded-lg shadow-2xl overflow-hidden">
        {/* 病理切片图片占位符 */}
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-100 to-slate-200 flex items-center justify-center">
          <div className="text-center p-8">
            <div className="text-4xl text-slate-400 mb-4">🔬</div>
            <p className="text-slate-500">{currentCase.filename}</p>
            <p className="text-xs text-slate-400 mt-2">WSI / H&E Stain</p>
          </div>
        </div>
        
        {/* ROI 标注 */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border-2 border-red-400 bg-red-500/10 flex items-center justify-center">
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-md border border-red-100">
            <span className="text-sm font-medium text-red-600">ROI: High Malignancy ({currentCase.malignancyScore})</span>
          </div>
          {isAnalyzing && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-full">
              <div className="w-10 h-10 border-4 border-red-200 border-t-red-500 rounded-full animate-spin"></div>
            </div>
          )}
        </div>
        
        {/* 左下角比例尺 */}
        <div className="absolute bottom-4 left-4 bg-black/70 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
          200 um
        </div>
      </div>
      
      {/* 左上角信息卡 */}
      <div className="absolute top-8 left-8 bg-white rounded-lg shadow-lg p-3 border border-slate-200">
        <div className="space-y-2">
          <div className="text-xs font-semibold text-slate-500 uppercase">MODALITY</div>
          <div className="text-sm font-medium">WSI / H&E</div>
          <div className="w-full h-px bg-slate-100 my-2"></div>
          <div className="text-xs font-semibold text-slate-500 uppercase">MAGNIFICATION</div>
          <div className="text-sm font-medium">40x</div>
        </div>
      </div>
      
      {/* 底部正中工具栏 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-xl border border-slate-200 px-3 py-2">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="p-2 rounded-full hover:bg-slate-100 transition-colors"
            title="Upload Slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>
          <div className="w-px h-6 bg-slate-200"></div>
          <button className="p-2 rounded-full hover:bg-slate-100 transition-colors">
            <Hand className="w-5 h-5 text-slate-600" />
          </button>
          <button className="p-2 rounded-full hover:bg-slate-100 transition-colors">
            <PenTool className="w-5 h-5 text-slate-600" />
          </button>
          <button className="p-2 rounded-full hover:bg-slate-100 transition-colors">
            <Ruler className="w-5 h-5 text-slate-600" />
          </button>
          <button className="p-2 rounded-full bg-purple-50 text-purple-600 transition-colors">
            <Layers className="w-5 h-5" />
          </button>
          <div className="w-px h-6 bg-slate-200"></div>
          <button className="p-2 rounded-full hover:bg-slate-100 transition-colors">
            <Minus className="w-5 h-5 text-slate-600" />
          </button>
          <button className="p-2 rounded-full hover:bg-slate-100 transition-colors">
            <Plus className="w-5 h-5 text-slate-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CanvasViewer;
