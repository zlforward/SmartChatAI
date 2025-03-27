import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '@/providers/ThemeProvider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, FileText, Image, Clapperboard, Music, Mic, 
  Box, Workflow, Calendar, Play, Loader2, Check, RefreshCw,
  Download, ArrowLeft
} from 'lucide-react';

const AICreation = () => {
  const { toolType } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedContent, setGeneratedContent] = useState<any>(null);

  const tools = {
    copywriting: {
      title: 'AI 生文案',
      description: '智能文案创作，多场景文本生成',
      icon: <FileText className="text-zhiliao-500" />,
      models: ['GPT-4', 'Claude', 'Gemini'],
      placeholder: '请输入文案主题或关键词...',
      generateTime: 15,
      options: [
        { label: '文案类型', values: ['营销文案', '品牌故事', '产品描述', '社交内容'] },
        { label: '文案风格', values: ['专业', '活泼', '严谨', '轻松'] },
        { label: '字数限制', values: ['100字以内', '200字以内', '500字以内', '1000字以内'] }
      ]
    },
    video: {
      title: 'AI 生视频',
      description: '智能视频创作与编辑',
      icon: <Clapperboard className="text-zhiliao-500" />,
      models: ['可灵', '即梦', 'VIDU'],
      placeholder: '请详细描述您想要生成的视频场景...',
      generateTime: 30,
      options: [
        { label: '视频时长', values: ['15秒', '30秒', '60秒'] },
        { label: '视频比例', values: ['16:9', '9:16', '1:1'] },
        { label: '视频风格', values: ['商务', '科技', '生活', '创意'] }
      ]
    },
    // ... 其他工具配置
  };

  const currentTool = tools[toolType as keyof typeof tools];

  const handleGenerate = async () => {
    if (!selectedModel) return;
    
    setIsGenerating(true);
    setProgress(0);

    const totalTime = currentTool.generateTime * 1000;
    const intervalTime = 100;
    const steps = totalTime / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const newProgress = Math.min((currentStep / steps) * 100, 100);
      setProgress(newProgress);

      if (currentStep >= steps) {
        clearInterval(interval);
        setIsGenerating(false);
        setGeneratedContent('示例生成内容');
      }
    }, intervalTime);
  };

  if (!currentTool) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">工具不存在</h2>
          <Button onClick={() => navigate('/ai-creation')}>返回创作中心</Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          返回
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 左侧模型选择 */}
          <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} shadow-lg`}>
            <div className="flex items-center space-x-3 mb-6">
              {currentTool.icon}
              <div>
                <h2 className="text-xl font-bold">{currentTool.title}</h2>
                <p className="text-sm text-muted-foreground">{currentTool.description}</p>
              </div>
            </div>

            <h3 className="text-lg font-semibold mb-4">选择模型</h3>
            <div className="space-y-3">
              {currentTool.models.map((model, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedModel(model)}
                  className={`p-4 rounded-lg cursor-pointer transition-all ${
                    selectedModel === model
                      ? 'bg-zhiliao-500 text-white'
                      : theme === 'dark'
                      ? 'bg-slate-700 hover:bg-slate-600'
                      : 'bg-slate-100 hover:bg-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{model}</span>
                    {selectedModel === model && <Check className="h-5 w-5" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 右侧生成区域 */}
          <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} shadow-lg md:col-span-2`}>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">场景描述</label>
              <textarea
                placeholder={currentTool.placeholder}
                className={`w-full p-3 rounded-lg text-sm resize-none h-32 ${
                  theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'
                } border-none focus:outline-none focus:ring-2 focus:ring-zhiliao-500`}
              />
            </div>

            {currentTool.options && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {currentTool.options.map((option, index) => (
                  <div key={index}>
                    <label className="block text-sm font-medium mb-2">{option.label}</label>
                    <select
                      className={`w-full p-3 rounded-lg text-sm ${
                        theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'
                      } border-none focus:outline-none focus:ring-2 focus:ring-zhiliao-500`}
                    >
                      {option.values.map((value, vIndex) => (
                        <option key={vIndex} value={value}>{value}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>预计生成时间: {currentTool.generateTime}秒</span>
              </div>
              <Button
                className="bg-zhiliao-500 hover:bg-zhiliao-600 text-white"
                disabled={!selectedModel || isGenerating}
                onClick={handleGenerate}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    生成中...
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    开始生成
                  </>
                )}
              </Button>
            </div>

            {isGenerating && (
              <div className="mt-6">
                <div className="flex justify-between text-sm mb-2">
                  <span>生成进度</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-zhiliao-500 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-2 text-center">
                  正在处理您的请求，请稍候...
                </p>
              </div>
            )}

            {generatedContent && (
              <div className={`mt-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'}`}>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium">生成结果</h4>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-zhiliao-500 hover:text-zhiliao-600"
                      onClick={() => setGeneratedContent(null)}
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      重新生成
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-zhiliao-500 hover:text-zhiliao-600"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      下载结果
                    </Button>
                  </div>
                </div>
                <div className="break-words">
                  {typeof generatedContent === 'string' ? (
                    <p className="text-sm whitespace-pre-wrap">{generatedContent}</p>
                  ) : (
                    <div className="aspect-video rounded-lg overflow-hidden bg-slate-900">
                      {toolType === 'video' ? (
                        <video
                          src={generatedContent}
                          controls
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <img
                          src={generatedContent}
                          alt="生成的内容"
                          className="w-full h-full object-contain"
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICreation; 