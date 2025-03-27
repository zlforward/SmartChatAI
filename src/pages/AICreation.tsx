import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '@/providers/ThemeProvider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, FileText, Image, Clapperboard, Music, Mic, 
  Box, Workflow, Calendar, Play, Loader2, Check, RefreshCw,
  Download, ArrowLeft, ChevronDown, ChevronRight
} from 'lucide-react';

const AICreation = () => {
  const { toolType } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedContent, setGeneratedContent] = useState<any>(null);
  const [showHistory, setShowHistory] = useState(false);

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
    image: {
      title: 'AI 生图片',
      description: '高质量图像生成与编辑',
      icon: <Image className="text-zhiliao-500" />,
      models: ['SD', 'LUMIA', 'COMFYUI', 'FLUX'],
      placeholder: '请输入图片描述...',
      generateTime: 20,
      options: [
        { label: '图片风格', values: ['写实', '动漫', '油画', '水彩'] },
        { label: '图片尺寸', values: ['1:1', '16:9', '9:16', '4:3'] },
        { label: '生成数量', values: ['1张', '4张', '9张'] }
      ]
    },
    music: {
      title: 'AI 生音乐',
      description: '智能音乐创作与编曲',
      icon: <Music className="text-zhiliao-500" />,
      models: ['海绵', 'suno', 'udio'],
      placeholder: '请输入音乐风格或情绪...',
      generateTime: 25,
      options: [
        { label: '音乐风格', values: ['流行', '古典', '电子', '爵士'] },
        { label: '时长', values: ['30秒', '1分钟', '2分钟', '3分钟'] },
        { label: '情绪', values: ['欢快', '舒缓', '激情', '忧伤'] }
      ]
    }
  };

  const historyItems = [
    {
      type: '文案',
      title: '品牌故事文案',
      date: '2024-03-27 09:47',
      content: '匠心精神，传承创新...'
    },
    {
      type: '视频',
      title: '产品展示视频',
      date: '2024-03-27 09:45',
      thumbnail: 'https://picsum.photos/200/112?random=1'
    },
    {
      type: '图片',
      title: '未来城市场景',
      date: '2024-03-27 09:40',
      thumbnail: 'https://picsum.photos/200/112?random=2'
    }
  ];

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
          <Button onClick={() => navigate('/')}>返回首页</Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回首页
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowHistory(!showHistory)}
            className="sm:hidden"
          >
            历史记录
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* 左侧工具栏 */}
          <div className="lg:col-span-1 space-y-6">
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

            {/* 历史记录 - 桌面端显示 */}
            <div className={`hidden sm:block p-6 rounded-xl ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} shadow-lg`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">历史记录</h3>
                <Button variant="ghost" size="sm">
                  查看全部
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
              <div className="space-y-4">
                {historyItems.map((item, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg cursor-pointer ${
                      theme === 'dark' ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-100 hover:bg-slate-200'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      {item.thumbnail ? (
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-16 h-9 rounded object-cover"
                        />
                      ) : (
                        <div className={`w-16 h-9 rounded flex items-center justify-center ${
                          theme === 'dark' ? 'bg-slate-600' : 'bg-slate-200'
                        }`}>
                          <FileText className="h-4 w-4 text-zhiliao-500" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{item.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 右侧生成区域 */}
          <div className={`lg:col-span-3 p-6 rounded-xl ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} shadow-lg`}>
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

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>预计生成时间: {currentTool.generateTime}秒</span>
              </div>
              <Button
                className="w-full sm:w-auto bg-zhiliao-500 hover:bg-zhiliao-600 text-white"
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
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
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

      {/* 历史记录 - 移动端弹出层 */}
      {showHistory && (
        <div className="fixed inset-0 z-50 sm:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowHistory(false)} />
          <div className={`absolute bottom-0 left-0 right-0 ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} rounded-t-xl p-6`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">历史记录</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowHistory(false)}>
                关闭
              </Button>
            </div>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
              {historyItems.map((item, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg ${
                    theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    {item.thumbnail ? (
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-16 h-9 rounded object-cover"
                      />
                    ) : (
                      <div className={`w-16 h-9 rounded flex items-center justify-center ${
                        theme === 'dark' ? 'bg-slate-600' : 'bg-slate-200'
                      }`}>
                        <FileText className="h-4 w-4 text-zhiliao-500" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AICreation; 