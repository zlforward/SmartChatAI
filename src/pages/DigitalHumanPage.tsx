import React, { useState, useRef } from 'react';
import { useTheme } from '@/providers/ThemeProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Send, 
  Mic, 
  Video, 
  Phone, 
  MoreVertical,
  Smile,
  Image as ImageIcon,
  ThumbsUp,
  MessageSquare,
  Share2
} from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'digital-human';
  timestamp: string;
}

const DigitalHumanPage: React.FC = () => {
  const { theme } = useTheme();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: '你好！我是知了AI数字人，很高兴为你服务。',
      sender: 'digital-human',
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isMic, setIsMic] = useState(false);
  const [isVideo, setIsVideo] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMessage]);
    setInput('');

    // 模拟数字人回复
    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        content: '我理解你的想法，让我来为你解答这个问题。',
        sender: 'digital-human',
        timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, reply]);
    }, 1000);
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">数字人对话</h1>
            <p className="text-muted-foreground">
              与个性化数字人进行真实互动交流
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card className={`${theme === 'dark' ? 'bg-slate-800' : ''}`}>
                <CardContent className="p-0">
                  <div className="flex flex-col h-[600px]">
                    {/* 视频区域 */}
                    <div className="relative aspect-video bg-gradient-to-b from-slate-900 to-slate-800 rounded-t-lg overflow-hidden">
                      {/* 背景图片 */}
                      <div className="absolute inset-0">
                        <img 
                          src="/lovable-uploads/d4996f08-c35e-4543-9997-289fd45be96b.png" 
                          alt="背景" 
                          className="w-full h-full object-cover opacity-20 animate-zoom"
                        />
                        {/* 科技感遮罩 */}
                        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 to-slate-800/80">
                          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,0.1)_25%,rgba(68,68,68,0.1)_50%,transparent_50%,transparent_75%,rgba(68,68,68,0.1)_75%,rgba(68,68,68,0.1)_100%)] bg-[length:20px_20px] animate-grid" />
                        </div>
                        {/* 科技线条 */}
                        <div className="absolute inset-0">
                          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-zhiliao-500/50 to-transparent animate-scan" />
                          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-zhiliao-500/50 to-transparent animate-scan" style={{ animationDelay: '1s' }} />
                        </div>
                      </div>

                      {/* 数字人显示区域 */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-full h-full max-w-2xl">
                          {/* 全息投影效果 */}
                          <div className="absolute inset-0 bg-gradient-to-b from-zhiliao-500/10 to-transparent animate-pulse" />
                          
                          <video
                            className="w-full h-full object-contain"
                            autoPlay
                            loop
                            muted
                            playsInline
                          >
                            <source src="/lovable-uploads/d4996f08-c35e-4543-9997-289fd45be96b.png" type="image/png" />
                            <img 
                              src="/lovable-uploads/d4996f08-c35e-4543-9997-289fd45be96b.png" 
                              alt="数字人形象" 
                              className={`w-full h-full object-contain transition-all duration-300 ${
                                isCalling ? 'animate-talking' : 
                                isVideo ? 'animate-video' : 
                                isMic ? 'animate-listening' : ''
                              }`}
                            />
                          </video>

                          {/* 全息投影装饰 */}
                          <div className="absolute inset-0">
                            <div className="absolute top-0 left-0 w-32 h-32 bg-zhiliao-500/10 rounded-full blur-3xl animate-pulse" />
                            <div className="absolute bottom-0 right-0 w-32 h-32 bg-zhiliao-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                          </div>
                        </div>
                      </div>

                      {/* 视频控制按钮 */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-4">
                        <Button 
                          size="icon" 
                          variant="secondary" 
                          className={`rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors ${
                            isMic ? 'bg-zhiliao-500/20' : ''
                          }`}
                          onClick={() => setIsMic(!isMic)}
                        >
                          <Mic className="h-5 w-5" />
                        </Button>
                        <Button 
                          size="icon" 
                          variant="secondary" 
                          className={`rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors ${
                            isVideo ? 'bg-zhiliao-500/20' : ''
                          }`}
                          onClick={() => setIsVideo(!isVideo)}
                        >
                          <Video className="h-5 w-5" />
                        </Button>
                        <Button 
                          size="icon" 
                          variant="secondary" 
                          className={`rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors ${
                            isCalling ? 'bg-zhiliao-500/20' : ''
                          }`}
                          onClick={() => setIsCalling(!isCalling)}
                        >
                          <Phone className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>

                    {/* 消息区域 */}
                    <ScrollArea className="flex-1 p-4">
                      <div className="space-y-4 flex flex-col-reverse">
                        {messages.slice().reverse().map((message) => (
                          <div
                            key={message.id}
                            className={`flex items-start space-x-3 ${
                              message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                            }`}
                          >
                            <div className="flex-shrink-0">
                              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-zhiliao-500/20">
                                <img
                                  src={message.sender === 'user' ? '/images/avatar.png' : '/lovable-uploads/d4996f08-c35e-4543-9997-289fd45be96b.png'}
                                  alt={message.sender === 'user' ? '用户头像' : '数字人头像'}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </div>
                            <div 
                              className={`max-w-[70%] rounded-2xl px-4 py-2 shadow-sm ${
                                message.sender === 'user'
                                  ? 'bg-zhiliao-500 text-white rounded-tr-none'
                                  : theme === 'dark'
                                    ? 'bg-slate-700 rounded-tl-none'
                                    : 'bg-slate-100 rounded-tl-none'
                              }`}
                            >
                              <p className="text-sm leading-relaxed">{message.content}</p>
                              <span className="text-xs opacity-70 mt-1 block text-right">{message.timestamp}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>

                    {/* 输入区域 */}
                    <div className="p-4 border-t bg-card/50 backdrop-blur-sm">
                      <div className="flex items-center space-x-2">
                        <Button size="icon" variant="ghost" className="text-foreground/70 hover:text-zhiliao-500">
                          <Smile className="h-5 w-5" />
                        </Button>
                        <Button size="icon" variant="ghost" className="text-foreground/70 hover:text-zhiliao-500">
                          <ImageIcon className="h-5 w-5" />
                        </Button>
                        <Input
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          placeholder="输入消息..."
                          className="bg-background/50"
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        />
                        <Button onClick={handleSendMessage} className="bg-zhiliao-500 hover:bg-zhiliao-600 text-white">
                          <Send className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 侧边栏 */}
            <div className="w-80 flex-shrink-0 border-l">
              <div className="p-4">
                {/* 用户信息卡片 */}
                <div className="bg-card rounded-lg p-4 space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-zhiliao-500/20">
                      <img
                        src="/lovable-uploads/d4996f08-c35e-4543-9997-289fd45be96b.png"
                        alt="知了AI助手"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">知了AI助手</h3>
                      <p className="text-sm text-foreground/70">在线</p>
                    </div>
                  </div>
                </div>

                <Card className={`${theme === 'dark' ? 'bg-slate-800' : ''}`}>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-4">互动功能</h3>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        <ThumbsUp className="h-4 w-4 mr-2" />
                        点赞
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        评论
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Share2 className="h-4 w-4 mr-2" />
                        分享
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DigitalHumanPage;
