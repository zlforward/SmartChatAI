import React, { useState } from 'react';
import { useTheme } from '@/providers/ThemeProvider';
import { Button } from '@/components/ui/button';
import { 
  FileText, Image, Clapperboard, Music, 
  Mic, User, Box, Workflow, Loader2, RefreshCw,
  Brush, ChevronRight
} from 'lucide-react';

const AICreationPage = () => {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedContent, setGeneratedContent] = useState<any>(null);

  const categories = [
    {
      id: 'image',
      title: '图片生成',
      icon: <Image className="h-6 w-6" />,
      tools: [
        { id: 'sd', name: 'SD', description: '稳定扩散模型,真实感强' },
        { id: 'lumia', name: 'LUMIA', description: '艺术风格生成' },
        { id: 'comfyui', name: 'COMFYUI', description: '可视化工作流' },
      ]
    },
    {
      id: 'video',
      title: '视频生成',
      icon: <Clapperboard className="h-6 w-6" />,
      tools: [
        { id: 'keling', name: '可灵', description: '智能视频创作' },
        { id: 'jimeng', name: '即梦', description: '视频风格转换' },
        { id: 'vidu', name: 'VIDU', description: '视频剪辑助手' },
      ]
    },
    {
      id: 'text',
      title: '文案创作',
      icon: <FileText className="h-6 w-6" />,
      tools: [
        { id: 'gpt4', name: 'GPT-4', description: '智能文案助手' },
        { id: 'claude', name: 'Claude', description: '专业写作助手' },
        { id: 'gemini', name: 'Gemini', description: '多模态创作' },
      ]
    },
    {
      id: 'music',
      title: '音乐生成',
      icon: <Music className="h-6 w-6" />,
      tools: [
        { id: 'haimian', name: '海绵', description: '智能音乐创作' },
        { id: 'suno', name: 'Suno', description: '音乐风格转换' },
        { id: 'udio', name: 'Udio', description: '音频处理增强' },
      ]
    },
    {
      id: 'avatar',
      title: '数字人',
      icon: <User className="h-6 w-6" />,
      tools: [
        { id: 'wav2lip', name: 'Wav2lip', description: '智能口型合成' },
        { id: 'sadtalker', name: 'SadTalker', description: '表情动作生成' },
      ]
    },
    {
      id: 'paint',
      title: '智能画布',
      icon: <Brush className="h-6 w-6" />,
      tools: [
        { id: 'inpaint', name: '智能抠图', description: '一键抠图修复' },
        { id: 'style', name: '风格迁移', description: '图片风格转换' },
      ]
    }
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-2 mb-8">
          <h1 className="text-2xl font-bold">AI 创作中心</h1>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
          <span className="text-muted-foreground">
            {selectedCategory ? categories.find(c => c.id === selectedCategory)?.title : '选择创作类型'}
          </span>
        </div>

        {!selectedCategory ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-6 rounded-xl transition-all ${
                  theme === 'dark' 
                    ? 'bg-slate-800 hover:bg-slate-700' 
                    : 'bg-white hover:bg-slate-50'
                } shadow-lg group`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${
                    theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'
                  } text-zhiliao-500 group-hover:scale-110 transition-transform`}>
                    {category.icon}
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-lg">{category.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {category.tools.length} 个智能工具
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className={`lg:col-span-1 rounded-xl p-6 ${
              theme === 'dark' ? 'bg-slate-800' : 'bg-white'
            } shadow-lg`}>
              <div className="space-y-4">
                <h3 className="font-semibold text-lg mb-4">选择工具</h3>
                {categories.find(c => c.id === selectedCategory)?.tools.map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => setSelectedTool(tool.id)}
                    className={`w-full p-4 rounded-lg text-left transition-all ${
                      selectedTool === tool.id
                        ? 'bg-zhiliao-500 text-white'
                        : theme === 'dark'
                        ? 'bg-slate-700 hover:bg-slate-600'
                        : 'bg-slate-100 hover:bg-slate-200'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">{tool.name}</h4>
                        <p className={`text-sm ${
                          selectedTool === tool.id
                            ? 'text-white/80'
                            : 'text-muted-foreground'
                        }`}>{tool.description}</p>
                      </div>
                      <ChevronRight className={`h-5 w-5 ${
                        selectedTool === tool.id ? 'text-white' : 'text-muted-foreground'
                      }`} />
                    </div>
                  </button>
                ))}
                
                <Button
                  variant="outline"
                  className="w-full mt-4"
                  onClick={() => {
                    setSelectedCategory(null);
                    setSelectedTool(null);
                  }}
                >
                  返回创作类型
                </Button>
              </div>
            </div>

            <div className={`lg:col-span-2 rounded-xl p-6 ${
              theme === 'dark' ? 'bg-slate-800' : 'bg-white'
            } shadow-lg`}>
              {!selectedTool ? (
                <div className="text-center py-12 text-muted-foreground">
                  请选择左侧工具开始创作
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">创作提示词</label>
                    <textarea
                      className={`w-full p-4 rounded-lg resize-none ${
                        theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'
                      } border-none focus:ring-2 focus:ring-zhiliao-500`}
                      rows={4}
                      placeholder="请输入详细的创作提示词..."
                    />
                  </div>

                  <div className="space-y-4">
                    <Button
                      className="w-full bg-zhiliao-500 hover:bg-zhiliao-600 text-white"
                      size="lg"
                      onClick={() => {}}
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          生成中...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="mr-2 h-5 w-5" />
                          开始创作
                        </>
                      )}
                    </Button>

                    {isGenerating && (
                      <div>
                        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-zhiliao-500 transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                          <span>创作进度</span>
                          <span>{Math.round(progress)}%</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {generatedContent && (
                    <div className={`mt-6 p-4 rounded-lg ${
                      theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'
                    }`}>
                      <h4 className="font-medium mb-2">创作结果</h4>
                      {/* 根据不同类型展示不同的结果 */}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AICreationPage; 