
import React, { useState } from 'react';
import { useTheme } from '@/providers/ThemeProvider';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { 
  Send, Sparkles, User, Bot, Image as ImageIcon, 
  Mic, Download, Save, Settings, RefreshCw, Heart
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  characterId?: string;
}

interface Character {
  id: string;
  name: string;
  avatar: string;
  description: string;
  personality: string;
  tags: string[];
  isLocked?: boolean;
}

const characters: Character[] = [
  {
    id: 'xiaoli',
    name: '小李',
    avatar: '/lovable-uploads/b9e7d957-a3f2-4532-acbd-f553dbb3fb7e.png',
    description: '活泼开朗的大学生，喜欢旅行和摄影',
    personality: '开朗、幽默、善良',
    tags: ['学生', '摄影', '旅行'],
  },
  {
    id: 'xiaohua',
    name: '小华',
    avatar: '/lovable-uploads/4458c132-3b6e-4868-85a1-74dbba55cbf4.png',
    description: '温柔体贴的邻家女孩，热爱烹饪和阅读',
    personality: '温柔、细心、善解人意',
    tags: ['烹饪', '阅读', '音乐'],
  },
  {
    id: 'ming',
    name: '小明',
    avatar: '/lovable-uploads/232fc626-1664-454e-8e3e-0923f5e06e88.png',
    description: '沉稳可靠的职场精英，对工作充满热情',
    personality: '理性、专注、可靠',
    tags: ['职场', '管理', '科技'],
  },
  {
    id: 'qian',
    name: '小倩',
    avatar: '/lovable-uploads/b1b190bf-c614-48aa-97c4-9fbc5020f562.png',
    description: '知性优雅的艺术家，擅长古典音乐和绘画',
    personality: '优雅、内敛、艺术气息',
    tags: ['艺术', '音乐', '绘画'],
  },
  {
    id: 'jiajia',
    name: '佳佳',
    avatar: '/lovable-uploads/c2ef1a30-490f-463e-a15f-993bdd5edbc1.png',
    description: '阳光活力的运动达人，热爱户外和健身',
    personality: '阳光、积极、乐观',
    tags: ['运动', '健身', '户外'],
  },
  {
    id: 'lingling',
    name: '玲玲',
    avatar: '/lovable-uploads/ccde4be5-7f09-4c6b-a189-55b4670d5c54.png',
    description: '甜美可爱的邻家女孩，喜欢烘焙和手工',
    personality: '甜美、细腻、创意',
    tags: ['烘焙', '手工', '时尚'],
  },
  {
    id: 'premium1',
    name: '晓晓',
    avatar: '/lovable-uploads/805023d1-9177-408a-8fbf-d57b4a262294.png',
    description: '优雅知性的文学爱好者，喜欢诗词和古典文化',
    personality: '知性、典雅、内敛',
    tags: ['文学', '古典', '诗词'],
    isLocked: true,
  },
  {
    id: 'premium2',
    name: '冰冰',
    avatar: '/lovable-uploads/03eaebdf-e4b1-442e-8287-c07f07a5cfa2.png',
    description: '干练利落的职场精英，擅长沟通和管理',
    personality: '干练、自信、专业',
    tags: ['职场', '领导力', '商务'],
    isLocked: true,
  },
];

const initialMessages: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: '你好！我是小李，很高兴认识你！今天有什么我可以帮助你的吗？',
    timestamp: new Date(),
    characterId: 'xiaoli',
  },
];

const DigitalHumanPage: React.FC = () => {
  const { theme } = useTheme();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputMessage, setInputMessage] = useState('');
  const [activeCharacter, setActiveCharacter] = useState<Character>(characters[0]);
  const [showSettings, setShowSettings] = useState(false);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    const newAssistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: getRandomResponse(inputMessage, activeCharacter),
      timestamp: new Date(Date.now() + 1000),
      characterId: activeCharacter.id,
    };

    setMessages([...messages, newUserMessage, newAssistantMessage]);
    setInputMessage('');
  };

  const getRandomResponse = (message: string, character: Character): string => {
    const responses = [
      `我理解你的意思了！作为${character.personality}的${character.name}，我想说这个问题很有趣。`,
      `嗯，这是个好问题！让我思考一下...作为一个${character.tags.join('、')}爱好者，我认为...`,
      `谢谢你的分享！我很喜欢和你聊天。关于这个话题，我有一些想法...`,
      `作为${character.description}，我对这个话题很感兴趣！我认为...`,
      `我明白了，你说的是关于"${message.substring(0, 10)}..."的问题。这让我想到...`,
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleCharacterChange = (character: Character) => {
    if (character.isLocked) {
      return; // 如果角色被锁定，不做任何操作
    }
    
    setActiveCharacter(character);
    setMessages([
      {
        id: Date.now().toString(),
        role: 'assistant',
        content: `你好！我是${character.name}，${character.description}。很高兴认识你！有什么我可以帮助你的吗？`,
        timestamp: new Date(),
        characterId: character.id,
      },
    ]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="chat">
            <TabsList className="mb-6 grid w-full grid-cols-2">
              <TabsTrigger value="chat">
                <MessageCircleIcon className="h-4 w-4 mr-2" />
                数字人对话
              </TabsTrigger>
              <TabsTrigger value="characters">
                <Users className="h-4 w-4 mr-2" />
                角色库
              </TabsTrigger>
            </TabsList>

            <TabsContent value="chat" className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4 h-[70vh]">
                <div className="md:w-1/4 space-y-4">
                  <Card className={theme === 'dark' ? 'bg-slate-800' : ''}>
                    <CardContent className="p-4">
                      <div className="flex flex-col items-center text-center">
                        <Avatar className="h-24 w-24 mb-4">
                          <AvatarImage src={activeCharacter.avatar} />
                          <AvatarFallback>{activeCharacter.name[0]}</AvatarFallback>
                        </Avatar>
                        <h2 className="text-xl font-bold mb-1">{activeCharacter.name}</h2>
                        <p className="text-sm text-muted-foreground mb-2">{activeCharacter.description}</p>
                        <div className="flex flex-wrap gap-1 justify-center mb-4">
                          {activeCharacter.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full"
                          onClick={() => setShowSettings(!showSettings)}
                        >
                          <Settings className="h-4 w-4 mr-2" />
                          角色设置
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {showSettings && (
                    <Card className={theme === 'dark' ? 'bg-slate-800' : ''}>
                      <CardContent className="p-4 space-y-4">
                        <div>
                          <h3 className="text-sm font-medium mb-2">对话温度</h3>
                          <Slider defaultValue={[70]} max={100} step={10} />
                          <div className="flex justify-between text-xs text-muted-foreground mt-1">
                            <span>精确</span>
                            <span>创意</span>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium mb-2">记忆长度</h3>
                          <Slider defaultValue={[5]} max={10} step={1} />
                          <div className="flex justify-between text-xs text-muted-foreground mt-1">
                            <span>短期</span>
                            <span>长期</span>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium mb-2">回复长度</h3>
                          <Slider defaultValue={[3]} max={5} step={1} />
                          <div className="flex justify-between text-xs text-muted-foreground mt-1">
                            <span>简短</span>
                            <span>详细</span>
                          </div>
                        </div>
                        
                        <div className="pt-2">
                          <Button size="sm" variant="outline" className="w-full">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            重置设置
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                <div className="md:w-3/4 flex flex-col h-full">
                  <Card className={`flex-1 ${theme === 'dark' ? 'bg-slate-800' : ''}`}>
                    <CardContent className="p-4 h-full">
                      <ScrollArea className="h-[calc(70vh-120px)] pr-4">
                        <div className="space-y-4">
                          {messages.map((message) => (
                            <div 
                              key={message.id} 
                              className={`flex ${
                                message.role === 'user' ? 'justify-end' : 'justify-start'
                              }`}
                            >
                              <div className="flex items-start max-w-[80%] gap-3">
                                {message.role === 'assistant' && (
                                  <Avatar className="h-8 w-8 mt-1">
                                    <AvatarImage 
                                      src={
                                        characters.find(c => c.id === message.characterId)?.avatar || 
                                        activeCharacter.avatar
                                      } 
                                    />
                                    <AvatarFallback>AI</AvatarFallback>
                                  </Avatar>
                                )}
                                
                                <div 
                                  className={`rounded-lg px-4 py-2 ${
                                    message.role === 'user' 
                                      ? 'bg-zhiliao-500 text-white' 
                                      : theme === 'dark' 
                                        ? 'bg-slate-700' 
                                        : 'bg-slate-100'
                                  }`}
                                >
                                  <p>{message.content}</p>
                                  <div className="text-xs opacity-70 mt-1 text-right">
                                    {message.timestamp.toLocaleTimeString([], {
                                      hour: '2-digit',
                                      minute: '2-digit',
                                    })}
                                  </div>
                                </div>
                                
                                {message.role === 'user' && (
                                  <Avatar className="h-8 w-8 mt-1">
                                    <AvatarImage src="" />
                                    <AvatarFallback>
                                      <User className="h-4 w-4" />
                                    </AvatarFallback>
                                  </Avatar>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>

                  <div className="flex items-center gap-2 mt-4">
                    <Button variant="outline" size="icon">
                      <ImageIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Mic className="h-4 w-4" />
                    </Button>
                    <Input 
                      placeholder="输入消息..." 
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage}>
                      <Send className="h-4 w-4 mr-2" />
                      发送
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="characters">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {characters.map((character) => (
                  <Card 
                    key={character.id} 
                    className={`overflow-hidden cursor-pointer hover:shadow-md transition-shadow ${
                      activeCharacter.id === character.id ? 'ring-2 ring-zhiliao-500' : ''
                    } ${theme === 'dark' ? 'bg-slate-800' : ''}`}
                    onClick={() => handleCharacterChange(character)}
                  >
                    <CardContent className="p-0">
                      <div className="relative aspect-square overflow-hidden">
                        <img 
                          src={character.avatar} 
                          alt={character.name} 
                          className="object-cover w-full h-full"
                        />
                        {character.isLocked && (
                          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white">
                            <Lock className="h-8 w-8 mb-2" />
                            <span className="text-sm font-medium">会员专享</span>
                            <Button size="sm" variant="outline" className="mt-2 text-white border-white">
                              升级会员
                            </Button>
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold">{character.name}</h3>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Heart className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                          {character.description}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {character.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

function MessageCircleIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

function Users(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function Lock(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

export default DigitalHumanPage;
