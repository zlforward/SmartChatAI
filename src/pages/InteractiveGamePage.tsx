
import React, { useState } from 'react';
import { useTheme } from '@/providers/ThemeProvider';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { 
  Play, Pause, ChevronRight, ThumbsUp, MessageSquare, 
  Share2, Heart, Bookmark, ArrowLeft, ArrowRight, Volume2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';

interface StoryOption {
  id: string;
  text: string;
  nextSceneId: string;
}

interface StoryScene {
  id: string;
  title: string;
  description: string;
  image: string;
  character?: string;
  options: StoryOption[];
  isEnding?: boolean;
}

interface StoryCharacter {
  id: string;
  name: string;
  image: string;
  description: string;
}

const storyCharacters: StoryCharacter[] = [
  {
    id: 'female1',
    name: '林小雨',
    image: '/lovable-uploads/c90b4c9c-14b9-4ad5-8183-6c41b3b1d1da.png',
    description: '温柔善良的大学生，热爱文学和艺术',
  },
  {
    id: 'female2',
    name: '张梦',
    image: '/lovable-uploads/3ccdab5c-69fb-4839-b9f7-a78636c23573.png',
    description: '活泼开朗的舞蹈专业学生，充满活力',
  },
  {
    id: 'male1',
    name: '李阳',
    image: '/lovable-uploads/1b700876-12a7-45f6-ab4c-ca17a6bd1a18.png',
    description: '沉稳可靠的计算机系学生，略带神秘感',
  },
];

const storyScenes: StoryScene[] = [
  {
    id: 'start',
    title: '初次相遇',
    description: '在大学图书馆的一个安静角落，你正专注地阅读一本书，突然有人在你对面的座位坐下...',
    image: '/lovable-uploads/860d56a0-686c-407f-b7a1-77f1afca07f6.png',
    character: 'female1',
    options: [
      {
        id: 'look_up',
        text: '抬头看一眼对方',
        nextSceneId: 'introduction'
      },
      {
        id: 'continue_reading',
        text: '继续专注于阅读',
        nextSceneId: 'later_introduction'
      }
    ]
  },
  {
    id: 'introduction',
    title: '初次交谈',
    description: '你抬头看到一位女生正在翻阅一本文学书籍。她注意到你的目光，微微一笑。"你也喜欢村上春树的作品吗？"她轻声问道。',
    image: '/lovable-uploads/860d56a0-686c-407f-b7a1-77f1afca07f6.png',
    character: 'female1',
    options: [
      {
        id: 'express_interest',
        text: '表达对村上春树作品的喜爱',
        nextSceneId: 'deep_conversation'
      },
      {
        id: 'polite_response',
        text: '礼貌回应但保持距离',
        nextSceneId: 'casual_chat'
      }
    ]
  },
  {
    id: 'later_introduction',
    title: '偶然重逢',
    description: '几天后，你在校园咖啡厅又遇到了图书馆那位女生。她正坐在角落的位置读书，窗外的阳光洒在她的侧脸上。',
    image: '/lovable-uploads/860d56a0-686c-407f-b7a1-77f1afca07f6.png',
    character: 'female1',
    options: [
      {
        id: 'approach',
        text: '主动上前打招呼',
        nextSceneId: 'coffee_chat'
      },
      {
        id: 'observe',
        text: '在另一个位置坐下，偶尔观察她',
        nextSceneId: 'chance_meeting'
      }
    ]
  },
  {
    id: 'deep_conversation',
    title: '共同的爱好',
    description: '你们就村上春树的作品进行了深入交流，发现彼此有许多共同的文学爱好。"我叫林小雨，文学系大二学生，"她自我介绍道，"能认识你真是太好了。"',
    image: '/lovable-uploads/860d56a0-686c-407f-b7a1-77f1afca07f6.png',
    character: 'female1',
    options: [
      {
        id: 'exchange_contact',
        text: '交换联系方式，约定一起参加周末的读书会',
        nextSceneId: 'reading_club'
      },
      {
        id: 'casual_goodbye',
        text: '愉快交谈后告别，期待下次偶遇',
        nextSceneId: 'next_meeting'
      }
    ]
  },
  {
    id: 'reading_club',
    title: '读书会相聚',
    description: '周末的读书会上，你和小雨一起讨论最新的文学作品。活动结束后，她提议一起去附近的咖啡馆继续交流。',
    image: '/lovable-uploads/860d56a0-686c-407f-b7a1-77f1afca07f6.png',
    character: 'female1',
    options: [
      {
        id: 'accept_coffee',
        text: '接受邀请，一起去咖啡馆',
        nextSceneId: 'coffee_date'
      },
      {
        id: 'next_time',
        text: '因为有事而婉拒，约定下次',
        nextSceneId: 'rain_encounter'
      }
    ]
  },
  {
    id: 'coffee_date',
    title: '咖啡馆的午后',
    description: '咖啡馆里，阳光透过落地窗洒在你们的桌子上。小雨谈起她的梦想，希望成为一名作家。她的眼睛在谈到梦想时闪闪发光。',
    image: '/lovable-uploads/860d56a0-686c-407f-b7a1-77f1afca07f6.png',
    character: 'female1',
    options: [
      {
        id: 'share_dream',
        text: '分享自己的梦想，鼓励她坚持',
        nextSceneId: 'deeper_connection'
      },
      {
        id: 'listen_only',
        text: '静静倾听，不多分享自己',
        nextSceneId: 'slow_development'
      }
    ]
  },
  {
    id: 'deeper_connection',
    title: '心灵共鸣',
    description: '几周后，你们的友情越来越深。一天，小雨邀请你去她最喜欢的湖边散步。黄昏时分，湖面波光粼粼，她似乎有话要说。',
    image: '/lovable-uploads/860d56a0-686c-407f-b7a1-77f1afca07f6.png',
    character: 'female1',
    options: [
      {
        id: 'express_feelings',
        text: '表达对她的特别感觉',
        nextSceneId: 'confession'
      },
      {
        id: 'wait_her_words',
        text: '等待她开口，看她想说什么',
        nextSceneId: 'her_confession'
      }
    ]
  },
  {
    id: 'confession',
    title: '真心告白',
    description: '在夕阳的映照下，你鼓起勇气表达了对小雨的感情。"遇见你是我生命中最美好的意外，"你说道。小雨的眼中闪烁着温柔的光芒。',
    image: '/lovable-uploads/860d56a0-686c-407f-b7a1-77f1afca07f6.png',
    character: 'female1',
    options: [
      {
        id: 'happy_ending',
        text: '继续故事',
        nextSceneId: 'happy_ending'
      }
    ]
  },
  {
    id: 'happy_ending',
    title: '美好的开始',
    description: '"我也很喜欢你，"小雨轻声说道，"遇见你让我相信命运。"你握住她的手，感受着彼此心跳的共鸣。这不是结束，而是一段美好故事的开始。',
    image: '/lovable-uploads/860d56a0-686c-407f-b7a1-77f1afca07f6.png',
    character: 'female1',
    options: [],
    isEnding: true
  }
];

const InteractiveGamePage: React.FC = () => {
  const { theme } = useTheme();
  const [currentScene, setCurrentScene] = useState<StoryScene>(storyScenes[0]);
  const [history, setHistory] = useState<StoryScene[]>([storyScenes[0]]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showFullScreen, setShowFullScreen] = useState<boolean>(false);
  const [comments, setComments] = useState<{ id: string; user: string; avatar: string; text: string; likes: number }[]>([
    {
      id: '1',
      user: '文学爱好者',
      avatar: '/lovable-uploads/c90b4c9c-14b9-4ad5-8183-6c41b3b1d1da.png',
      text: '这个故事真的很打动人，特别是图书馆初遇的场景，太浪漫了！',
      likes: 24
    },
    {
      id: '2',
      user: '梦游者',
      avatar: '/lovable-uploads/3ccdab5c-69fb-4839-b9f7-a78636c23573.png',
      text: '我选择了不同的选项，结局完全不同！太有趣了，想再玩一次。',
      likes: 18
    },
    {
      id: '3',
      user: '咖啡与书',
      avatar: '/lovable-uploads/1b700876-12a7-45f6-ab4c-ca17a6bd1a18.png',
      text: '故事中的女主角好可爱，希望能有更多她的故事。',
      likes: 35
    },
  ]);

  const handleSelectOption = (optionId: string) => {
    setSelectedOption(optionId);
    
    const option = currentScene.options.find(opt => opt.id === optionId);
    if (option) {
      const nextScene = storyScenes.find(scene => scene.id === option.nextSceneId);
      if (nextScene) {
        setTimeout(() => {
          setCurrentScene(nextScene);
          setHistory([...history, nextScene]);
          setSelectedOption(null);
        }, 800);
      }
    }
  };

  const handleGoBack = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      setHistory(newHistory);
      setCurrentScene(newHistory[newHistory.length - 1]);
    }
  };

  const handleRestart = () => {
    setCurrentScene(storyScenes[0]);
    setHistory([storyScenes[0]]);
    setSelectedOption(null);
  };

  const getCurrentCharacter = () => {
    if (currentScene.character) {
      return storyCharacters.find(char => char.id === currentScene.character);
    }
    return null;
  };

  const character = getCurrentCharacter();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">互动影游 - 校园邂逅</h1>
            <p className="text-muted-foreground">
              沉浸式互动故事体验，你的每个选择都将改变故事走向
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card className={`overflow-hidden mb-4 ${theme === 'dark' ? 'bg-slate-800' : ''}`}>
                <CardContent className="p-0 relative">
                  <div className={`relative aspect-video ${isPlaying ? 'cursor-none' : 'cursor-pointer'}`} onClick={() => setIsPlaying(!isPlaying)}>
                    <img 
                      src={currentScene.image} 
                      alt={currentScene.title} 
                      className="w-full h-full object-cover"
                    />
                    {!isPlaying && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Button 
                          size="icon" 
                          className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 h-16 w-16"
                        >
                          <Play className="h-8 w-8 text-white" />
                        </Button>
                      </div>
                    )}
                    
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                      <div className="flex items-center justify-between mb-2">
                        <h2 className="text-xl font-bold">{currentScene.title}</h2>
                        <div className="flex items-center space-x-3">
                          <Button variant="ghost" size="icon" className="text-white">
                            <Volume2 className="h-5 w-5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-white">
                            <Pause className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                      <Progress value={Math.floor((history.length / storyScenes.length) * 100)} className="h-1 mb-2" />
                      <p>{currentScene.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {!currentScene.isEnding && currentScene.options.length > 0 ? (
                <div className="space-y-3 mb-6">
                  <h3 className="text-lg font-medium">你的选择</h3>
                  {currentScene.options.map((option) => (
                    <Button 
                      key={option.id}
                      className={`w-full justify-start text-left h-auto py-4 ${
                        selectedOption === option.id 
                          ? 'bg-zhiliao-500 hover:bg-zhiliao-600' 
                          : theme === 'dark' 
                            ? 'bg-slate-800 hover:bg-slate-700' 
                            : 'bg-slate-100 hover:bg-slate-200'
                      }`}
                      disabled={selectedOption !== null}
                      onClick={() => handleSelectOption(option.id)}
                    >
                      <div className="flex items-center">
                        <div className="bg-black/10 rounded-full p-1 mr-3">
                          <ChevronRight className="h-4 w-4" />
                        </div>
                        <span>{option.text}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              ) : currentScene.isEnding ? (
                <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'} mb-6`}>
                  <h3 className="text-xl font-bold text-center mb-4">故事结局</h3>
                  <p className="text-center mb-6">{currentScene.description}</p>
                  <div className="flex justify-center">
                    <Button onClick={handleRestart}>
                      重新开始
                    </Button>
                  </div>
                </div>
              ) : null}
              
              <div className="flex justify-between mb-6">
                <Button 
                  variant="outline" 
                  onClick={handleGoBack}
                  disabled={history.length <= 1}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  返回
                </Button>
                <div className="flex space-x-2">
                  <Button variant="outline">
                    <Share2 className="h-4 w-4 mr-2" />
                    分享
                  </Button>
                  <Button variant="outline">
                    <Bookmark className="h-4 w-4 mr-2" />
                    收藏
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">读者评论</h3>
                  <Badge variant="outline">{comments.length}</Badge>
                </div>
                
                <div className="flex items-center space-x-2 mb-4">
                  <Avatar>
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <input 
                      type="text" 
                      placeholder="添加评论..." 
                      className="w-full px-3 py-2 bg-transparent border-b focus:outline-none focus:border-zhiliao-500"
                    />
                  </div>
                  <Button variant="ghost" size="sm">发送</Button>
                </div>
                
                <ScrollArea className="h-[300px]">
                  <div className="space-y-4 pr-4">
                    {comments.map((comment) => (
                      <div key={comment.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Avatar>
                              <AvatarImage src={comment.avatar} />
                              <AvatarFallback>{comment.user[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{comment.user}</div>
                              <div className="text-xs text-muted-foreground">2天前</div>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm pl-10">{comment.text}</p>
                        <div className="flex items-center space-x-4 pl-10">
                          <Button variant="ghost" size="sm" className="h-8 px-2">
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            <span className="text-xs">{comment.likes}</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 px-2">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            <span className="text-xs">回复</span>
                          </Button>
                        </div>
                        <Separator className="my-2" />
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>
            
            <div>
              <Card className={`mb-6 ${theme === 'dark' ? 'bg-slate-800' : ''}`}>
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold mb-4">故事角色</h3>
                  {storyCharacters.map((char) => (
                    <div 
                      key={char.id} 
                      className={`flex items-center space-x-3 p-3 rounded-lg mb-3 ${
                        character?.id === char.id 
                          ? 'bg-zhiliao-500/10 border border-zhiliao-500/30' 
                          : theme === 'dark' 
                            ? 'bg-slate-700' 
                            : 'bg-slate-100'
                      }`}
                    >
                      <Avatar className="h-12 w-12 border-2 border-white">
                        <AvatarImage src={char.image} alt={char.name} />
                        <AvatarFallback>{char.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{char.name}</h4>
                        <p className="text-xs text-muted-foreground line-clamp-2">{char.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
              
              <Card className={`mb-6 ${theme === 'dark' ? 'bg-slate-800' : ''}`}>
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold mb-4">故事进度</h3>
                  <div className="space-y-3">
                    {history.map((scene, index) => (
                      <div 
                        key={index} 
                        className={`flex items-center space-x-3 p-3 rounded-lg ${
                          currentScene.id === scene.id 
                            ? 'bg-zhiliao-500/10 border border-zhiliao-500/30' 
                            : theme === 'dark' 
                              ? 'bg-slate-700' 
                              : 'bg-slate-100'
                        }`}
                      >
                        <div className={`
                          h-6 w-6 rounded-full flex items-center justify-center text-xs
                          ${currentScene.id === scene.id 
                            ? 'bg-zhiliao-500 text-white' 
                            : theme === 'dark' 
                              ? 'bg-slate-600 text-white' 
                              : 'bg-white text-slate-800 border border-slate-200'
                          }
                        `}>
                          {index + 1}
                        </div>
                        <span className={`text-sm ${currentScene.id === scene.id ? 'font-medium' : ''}`}>
                          {scene.title}
                        </span>
                      </div>
                    ))}
                    {!currentScene.isEnding && (
                      <div className="flex items-center space-x-3 p-3 rounded-lg">
                        <div className="h-6 w-6 rounded-full border border-dashed border-muted-foreground flex items-center justify-center text-xs text-muted-foreground">
                          {history.length + 1}
                        </div>
                        <span className="text-sm text-muted-foreground">下一章节</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <Card className={theme === 'dark' ? 'bg-slate-800' : ''}>
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold mb-4">热门故事</h3>
                  <div className="space-y-4">
                    <div className="group cursor-pointer">
                      <div className="aspect-video rounded-lg overflow-hidden mb-2 relative">
                        <img 
                          src="/lovable-uploads/860d56a0-686c-407f-b7a1-77f1afca07f6.png" 
                          alt="都市奇缘" 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button size="sm" variant="secondary">
                            开始体验
                          </Button>
                        </div>
                      </div>
                      <h4 className="font-medium group-hover:text-zhiliao-500 transition-colors">都市奇缘</h4>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <span className="flex items-center mr-3">
                          <Heart className="h-3 w-3 mr-1" />
                          4.8k
                        </span>
                        <span>已完结 · 多结局</span>
                      </div>
                    </div>
                    
                    <div className="group cursor-pointer">
                      <div className="aspect-video rounded-lg overflow-hidden mb-2 relative">
                        <img 
                          src="/lovable-uploads/860d56a0-686c-407f-b7a1-77f1afca07f6.png" 
                          alt="未来之约" 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button size="sm" variant="secondary">
                            开始体验
                          </Button>
                        </div>
                      </div>
                      <h4 className="font-medium group-hover:text-zhiliao-500 transition-colors">未来之约</h4>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <span className="flex items-center mr-3">
                          <Heart className="h-3 w-3 mr-1" />
                          3.2k
                        </span>
                        <span>更新中 · 多结局</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default InteractiveGamePage;
