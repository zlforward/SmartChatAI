import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '@/providers/ThemeProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar } from '@/components/ui/avatar';
import { 
  FileText, Image, Clapperboard, Music, 
  Mic, User, Box, Workflow, Loader2, RefreshCw,
  Brush, ChevronRight, Send, Bot
} from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AICreationPage = () => {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedContent, setGeneratedContent] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const categories = [
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

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);
    setInput('');

    // 模拟AI回复
    setTimeout(() => {
      const aiResponse: Message = {
        role: 'assistant',
        content: '这是一个模拟的AI回复消息。在实际应用中，这里会根据不同的AI工具返回相应的生成内容。',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

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

        <div className="grid grid-cols-12 gap-8 h-[calc(100vh-12rem)]">
          {/* 左侧工具栏 */}
          <div className="col-span-3">
            <div className={`rounded-xl p-6 ${
              theme === 'dark' ? 'bg-slate-800' : 'bg-white'
            } shadow-lg h-full`}>
              <div className="space-y-4">
                <h3 className="font-semibold text-lg mb-4">创作工具</h3>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category.id);
                      setSelectedTool(null);
                      setMessages([]);
                    }}
                    className={`w-full p-4 rounded-lg text-left transition-all ${
                      selectedCategory === category.id
                        ? 'bg-zhiliao-500 text-white'
                        : theme === 'dark'
                        ? 'bg-slate-700 hover:bg-slate-600'
                        : 'bg-slate-100 hover:bg-slate-200'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {category.icon}
                      <div>
                        <h4 className="font-medium">{category.title}</h4>
                        <p className={`text-sm ${
                          selectedCategory === category.id
                            ? 'text-white/80'
                            : 'text-muted-foreground'
                        }`}>{category.tools.length} 个智能工具</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 右侧内容区 */}
          <div className="col-span-9">
            <div className={`rounded-xl ${
              theme === 'dark' ? 'bg-slate-800' : 'bg-white'
            } shadow-lg h-full flex flex-col`}>
              {!selectedCategory ? (
                <div className="flex-1 flex items-center justify-center text-muted-foreground">
                  请选择左侧创作工具开始创作
                </div>
              ) : (
                <>
                  {/* 工具选择栏 */}
                  {selectedCategory && (
                    <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                      <div className="flex gap-2">
                        {categories.find(c => c.id === selectedCategory)?.tools.map((tool) => (
                          <Button
                            key={tool.id}
                            variant={selectedTool === tool.id ? "default" : "outline"}
                            className={selectedTool === tool.id ? "bg-zhiliao-500 text-white" : ""}
                            onClick={() => setSelectedTool(tool.id)}
                          >
                            {tool.name}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 聊天/展示区域 */}
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {messages.map((message, index) => (
                        <div
                          key={index}
                          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`flex items-start space-x-2 max-w-[80%] ${
                            message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                          }`}>
                            <Avatar>
                              {message.role === 'user' ? (
                                <div className="h-full w-full rounded-full bg-zhiliao-500 flex items-center justify-center text-white">
                                  U
                                </div>
                              ) : (
                                <div className="h-full w-full rounded-full bg-slate-500 flex items-center justify-center text-white">
                                  <Bot className="h-4 w-4" />
                                </div>
                              )}
                            </Avatar>
                            <div className={`rounded-lg p-3 ${
                              message.role === 'user'
                                ? 'bg-zhiliao-500 text-white'
                                : theme === 'dark'
                                ? 'bg-slate-700'
                                : 'bg-slate-100'
                            }`}>
                              <p>{message.content}</p>
                              <div className={`text-xs mt-1 ${
                                message.role === 'user'
                                  ? 'text-white/70'
                                  : 'text-muted-foreground'
                              }`}>
                                {message.timestamp.toLocaleTimeString()}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>

                  {/* 输入区域 */}
                  <div className="p-4 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex space-x-2">
                      <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="输入创作提示词..."
                        className="flex-1"
                      />
                      <Button
                        onClick={handleSendMessage}
                        className="bg-zhiliao-500 hover:bg-zhiliao-600 text-white"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICreationPage; 