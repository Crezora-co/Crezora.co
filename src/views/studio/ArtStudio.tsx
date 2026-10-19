import React, { useRef, useState, useEffect } from 'react';
import { 
  Download, 
  RotateCcw, 
  RotateCw, 
  Layers, 
  Image as ImageIcon, 
  Palette, 
  PenTool, 
  Eraser, 
  Maximize2,
  Send,
  Plus,
  Trash2
} from 'lucide-react';
import { storageService } from '../../services/storageService';

interface ArtStudioProps {
  onPublishToPortfolio: (dataUrl: string, title: string) => void;
}

export const ArtStudio: React.FC<ArtStudioProps> = ({
  onPublishToPortfolio,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<'pen' | 'brush' | 'highlighter' | 'eraser'>('brush');
  const [color, setColor] = useState('#E5A93C');
  const [brushSize, setBrushSize] = useState(8);
  const [brushOpacity, setBrushOpacity] = useState(1);
  const [title, setTitle] = useState('Subterranean Reservoir Study');
  const [history, setHistory] = useState<ImageData[]>([]);
  const [historyStep, setHistoryStep] = useState(-1);
  const [showReferenceBoard, setShowReferenceBoard] = useState(true);

  // Palette swatches inspired by cultural and natural pigments
  const PALETTE = [
    { name: 'Kalaa Gold', hex: '#E5A93C' },
    { name: 'Terracotta', hex: '#D97706' },
    { name: 'Crimson Vermilion', hex: '#E11D48' },
    { name: 'Deep Indigo', hex: '#3730A3' },
    { name: 'Temple Moss', hex: '#059669' },
    { name: 'Midnight Charcoal', hex: '#0F172A' },
    { name: 'Chalk White', hex: '#F8FAFC' },
  ];

  // Initialize Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set background color
    ctx.fillStyle = '#0C0E12';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveState();
  }, []);

  const saveState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory(prev => [...prev.slice(0, historyStep + 1), imageData]);
    setHistoryStep(prev => prev + 1);
  };

  const handleUndo = () => {
    if (historyStep > 0) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const prevStep = historyStep - 1;
      ctx.putImageData(history[prevStep], 0, 0);
      setHistoryStep(prevStep);
    }
  };

  const handleRedo = () => {
    if (historyStep < history.length - 1) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const nextStep = historyStep + 1;
      ctx.putImageData(history[nextStep], 0, 0);
      setHistoryStep(nextStep);
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (tool === 'eraser') {
      ctx.strokeStyle = '#0C0E12';
      ctx.lineWidth = brushSize * 2;
    } else if (tool === 'pen') {
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize * 0.5;
    } else if (tool === 'highlighter') {
      ctx.strokeStyle = `${color}40`; // Semi-transparent
      ctx.lineWidth = brushSize * 2.5;
    } else {
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      saveState();
    }
  };

  const handleClearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#0C0E12';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveState();
  };

  const handleExportPNG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `${title.toLowerCase().replace(/\s+/g, '-')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handlePublish = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    onPublishToPortfolio(dataUrl, title);
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Studio Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border-subtle">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 font-mono">
              Visual Art Studio
            </span>
            <span className="text-xs text-slate-500 font-mono">Digital Canvas</span>
          </div>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="text-xl sm:text-2xl font-bold font-serif text-white bg-transparent border-none focus:outline-none mt-1 w-full"
            placeholder="Untitled Artwork"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportPNG}
            className="px-3.5 py-2 rounded-xl bg-surface-850 hover:bg-surface-800 text-slate-200 hover:text-white border border-border-base text-xs font-medium transition-all flex items-center gap-1.5"
            title="Download PNG"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export PNG</span>
          </button>

          <button
            onClick={handlePublish}
            className="px-4 py-2 rounded-xl bg-crezora-amber hover:bg-amber-400 text-surface-950 font-bold text-xs transition-all shadow-md shadow-crezora-amber/10 flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Publish to Portfolio</span>
          </button>
        </div>
      </div>

      {/* Main Canvas + Tooling Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left 3 cols: Canvas Container */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* Canvas Tools Toolbar */}
          <div className="p-3 rounded-2xl bg-white border border-purple-100 flex flex-wrap items-center justify-between gap-4 shadow-2xs">
            
            {/* Brushes */}
            <div className="flex items-center gap-1 bg-purple-50/50 p-1 rounded-xl border border-purple-100 text-xs">
              <button
                onClick={() => setTool('brush')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  tool === 'brush' ? 'bg-purple-600 text-white font-bold shadow-2xs' : 'text-slate-600 hover:text-purple-700'
                }`}
              >
                Soft Brush
              </button>
              <button
                onClick={() => setTool('pen')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  tool === 'pen' ? 'bg-purple-600 text-white font-bold shadow-2xs' : 'text-slate-600 hover:text-purple-700'
                }`}
              >
                Ink Pen
              </button>
              <button
                onClick={() => setTool('highlighter')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  tool === 'highlighter' ? 'bg-purple-600 text-white font-bold shadow-2xs' : 'text-slate-600 hover:text-purple-700'
                }`}
              >
                Glaze / Chisel
              </button>
              <button
                onClick={() => setTool('eraser')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  tool === 'eraser' ? 'bg-purple-600 text-white font-bold shadow-2xs' : 'text-slate-600 hover:text-purple-700'
                }`}
              >
                <Eraser className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Size Slider */}
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>Size:</span>
              <input
                type="range"
                min="1"
                max="40"
                value={brushSize}
                onChange={e => setBrushSize(Number(e.target.value))}
                className="w-24 accent-purple-600"
              />
              <span className="font-mono text-[11px] w-6 text-right font-semibold text-purple-700">{brushSize}px</span>
            </div>

            {/* Undo / Redo & Clear */}
            <div className="flex items-center gap-1 text-slate-500">
              <button
                onClick={handleUndo}
                disabled={historyStep <= 0}
                className="p-1.5 rounded-lg hover:bg-purple-50 hover:text-purple-700 disabled:opacity-40"
                title="Undo"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={handleRedo}
                disabled={historyStep >= history.length - 1}
                className="p-1.5 rounded-lg hover:bg-purple-50 hover:text-purple-700 disabled:opacity-40"
                title="Redo"
              >
                <RotateCw className="w-4 h-4" />
              </button>
              <button
                onClick={handleClearCanvas}
                className="p-1.5 rounded-lg hover:bg-rose-50 hover:text-rose-600 transition-colors ml-2"
                title="Clear Canvas"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive HTML5 Canvas */}
          <div className="rounded-3xl bg-surface-950 border border-border-base overflow-hidden shadow-2xl flex items-center justify-center p-2 sm:p-4">
            <canvas
              ref={canvasRef}
              width={800}
              height={520}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              className="w-full max-w-[800px] h-[400px] sm:h-[520px] rounded-2xl cursor-crosshair shadow-inner touch-none"
            />
          </div>
        </div>

        {/* Right 1 col: Palette & Reference Board */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Color Palette Picker */}
          <div className="p-5 rounded-2xl bg-white border border-purple-100 shadow-sm space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-bold font-mono text-slate-900 uppercase tracking-wider">
                Cultural Pigments
              </span>
              <div className="w-4 h-4 rounded-full border border-purple-200" style={{ backgroundColor: color }} />
            </div>

            <div className="grid grid-cols-4 gap-2">
              {PALETTE.map(p => (
                <button
                  key={p.hex}
                  onClick={() => setColor(p.hex)}
                  title={p.name}
                  className={`w-full aspect-square rounded-xl border transition-all ${
                    color === p.hex ? 'border-purple-600 scale-110 shadow-md ring-2 ring-purple-200' : 'border-slate-200 hover:scale-105'
                  }`}
                  style={{ backgroundColor: p.hex }}
                />
              ))}
            </div>

            {/* Custom Hex Picker */}
            <div className="pt-2">
              <input
                type="color"
                value={color}
                onChange={e => setColor(e.target.value)}
                className="w-full h-8 rounded-lg cursor-pointer bg-transparent border-none"
              />
            </div>
          </div>

          {/* Visual Reference Board */}
          <div className="p-5 rounded-2xl bg-white border border-purple-100 shadow-sm space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-purple-600" />
                <span className="text-xs font-bold font-mono text-slate-900 uppercase tracking-wider">
                  Reference Board
                </span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed">
              Pin inspiration, texture references, and visual moodboards alongside your canvas.
            </p>

            <div className="space-y-2">
              <div className="rounded-xl overflow-hidden border border-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&w=400&q=80"
                  alt="Reference Mood"
                  className="w-full h-24 object-cover"
                />
                <div className="p-2 bg-slate-50 text-[10px] text-slate-600 font-mono">
                  Night Water Texture (Charminar Lake)
                </div>
              </div>

              <div className="rounded-xl overflow-hidden border border-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=400&q=80"
                  alt="Reference Mood"
                  className="w-full h-24 object-cover"
                />
                <div className="p-2 bg-slate-50 text-[10px] text-slate-600 font-mono">
                  Botanical Gouache Wash
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
