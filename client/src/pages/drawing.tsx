import { useState, useRef, useEffect } from 'react';
import { useTranslation, Language } from '@/lib/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Paintbrush, Eraser, Minus, Circle, Trash2, Download } from 'lucide-react';

interface DrawingProps {
  language: Language;
}

export default function Drawing({ language }: DrawingProps) {
  const { t } = useTranslation(language);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<'brush' | 'eraser' | 'line' | 'circle'>('brush');
  const [color, setColor] = useState('#FF6B6B');
  const [lineWidth, setLineWidth] = useState(5);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 800;
    canvas.height = 500;

    // Set initial styles
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const getMousePos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const pos = getMousePos(e);
    setStartPos(pos);

    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = tool === 'eraser' ? 'white' : color;
    ctx.globalCompositeOperation = tool === 'eraser' ? 'destination-out' : 'source-over';

    if (tool === 'brush' || tool === 'eraser') {
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const pos = getMousePos(e);

    if (tool === 'brush' || tool === 'eraser') {
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    }
  };

  const stopDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(false);
    const pos = getMousePos(e);

    if (tool === 'line') {
      ctx.beginPath();
      ctx.moveTo(startPos.x, startPos.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    } else if (tool === 'circle') {
      const radius = Math.sqrt(Math.pow(pos.x - startPos.x, 2) + Math.pow(pos.y - startPos.y, 2));
      ctx.beginPath();
      ctx.arc(startPos.x, startPos.y, radius, 0, 2 * Math.PI);
      ctx.stroke();
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'drawing.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <div className="w-12 h-12 bg-cat-purple rounded-full flex items-center justify-center mr-4">
              <Paintbrush className="h-6 w-6 text-white" />
            </div>
            {t('module.drawing')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Drawing Tools */}
          <div className="flex flex-wrap gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
            <Button
              onClick={() => setTool('brush')}
              className={tool === 'brush' ? 'bg-cat-purple text-white' : 'bg-white'}
            >
              <Paintbrush className="h-4 w-4 mr-2" />
              ブラシ
            </Button>
            
            <Button
              onClick={() => setTool('eraser')}
              className={tool === 'eraser' ? 'bg-gray-500 text-white' : 'bg-white'}
            >
              <Eraser className="h-4 w-4 mr-2" />
              消しゴム
            </Button>
            
            <Button
              onClick={() => setTool('line')}
              className={tool === 'line' ? 'bg-cat-blue text-white' : 'bg-white'}
            >
              <Minus className="h-4 w-4 mr-2" />
              直線
            </Button>
            
            <Button
              onClick={() => setTool('circle')}
              className={tool === 'circle' ? 'bg-cat-mint text-white' : 'bg-white'}
            >
              <Circle className="h-4 w-4 mr-2" />
              円
            </Button>
            
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-12 h-10 rounded border-2 border-gray-300 cursor-pointer"
            />
            
            <input
              type="range"
              min="1"
              max="50"
              value={lineWidth}
              onChange={(e) => setLineWidth(Number(e.target.value))}
              className="w-20"
            />
            
            <Button
              onClick={clearCanvas}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              {t('action.clear')}
            </Button>
            
            <Button
              onClick={downloadCanvas}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              <Download className="h-4 w-4 mr-2" />
              保存
            </Button>
          </div>

          {/* Drawing Canvas */}
          <div className="border-2 border-gray-300 rounded-lg bg-white overflow-hidden">
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              className="block cursor-crosshair w-full max-w-full"
              style={{ maxHeight: '500px' }}
            />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
