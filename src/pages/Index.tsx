import React, { useState, useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '@/providers/ThemeProvider';
import ZhiliaoLogo from '@/components/ZhiliaoLogo';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ArrowRight, Bot, MessageCircle, Users, LayoutGrid, 
  Video, Music, ShoppingCart, Calendar, Play, Pause,
  Brain, DollarSign, Gamepad2, Sun, Moon, Image, FileText,
  Workflow, Clapperboard, Mic, User, Box, Brush, ChevronDown,
  Loader2, Check, RefreshCw, MessageSquare, HeartPulse, Newspaper, HelpCircle, Info, Download
} from 'lucide-react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious,
  type CarouselApi
} from "@/components/ui/carousel";
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);

  const videos = [
    {
      title: "知了AI助手日常对话演示",
      src: "https://assets.mixkit.co/videos/preview/mixkit-a-girl-blowing-a-bubble-gum-at-an-amusement-park-1226-large.mp4",
      thumbnail: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1470&auto=format&fit=crop"
    },
    {
      title: "知了在工作场景中的应用",
      src: "https://assets.mixkit.co/videos/preview/mixkit-tree-branches-in-a-breeze-1188-large.mp4",
      thumbnail: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1470&auto=format&fit=crop"
    },
    {
      title: "企业客户使用案例分享",
      src: "https://assets.mixkit.co/videos/preview/mixkit-water-flowing-down-rocks-in-a-stream-24055-large.mp4",
      thumbnail: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1470&auto=format&fit=crop"
    }
  ];

  const cards = [
    {
      title: 'AI 创作中心',
      description: '一站式AI创作平台，激发无限创意可能',
      icon: <Brain className="text-zhiliao-500" />,
      link: '/ai-creation/copywriting',
      badge: '推荐',
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995"
    },
    {
      title: '社群组织',
      description: '加入感兴趣的群组，认识志同道合的朋友',
      icon: <Users className="text-zhiliao-500" />,
      link: '/groups',
      badge: '热门',
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b"
    },
    {
      title: '本地服务',
      description: '一站式解决餐饮、出行、购物等日常需求',
      icon: <ShoppingCart className="text-zhiliao-500" />,
      link: '/services',
      image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26"
    },
    {
      title: '媒体中心',
      description: '浏览视频、音乐、图片等多媒体内容',
      icon: <LayoutGrid className="text-zhiliao-500" />,
      link: '/media',
      image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7"
    },
    {
      title: '数字人对话',
      description: '与个性化数字人进行真实互动交流',
      icon: <User className="text-zhiliao-500" />,
      link: '/digital-human',
      badge: '新功能',
      image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5"
    },
    {
      title: '互动影游',
      description: '沉浸式互动故事，多元结局体验',
      icon: <Gamepad2 className="text-zhiliao-500" />,
      link: '/interactive-game',
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420"
    }
  ];

  const toggleVideoPlay = () => {
    const video = document.getElementById(`video-${activeVideoIndex}`) as HTMLVideoElement;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
  };

  const onCarouselCreated = useCallback((api: CarouselApi) => {
    setCarouselApi(api);
  }, []);

  React.useEffect(() => {
    if (!carouselApi) return;

    const onChange = () => {
      setActiveVideoIndex(carouselApi.selectedScrollSnap());
      setIsPlaying(false);
    };

    carouselApi.on("select", onChange);
    
    setActiveVideoIndex(carouselApi.selectedScrollSnap());

    return () => {
      carouselApi.off("select", onChange);
    };
  }, [carouselApi]);

  const handleManualSelect = (index: number) => {
    if (carouselApi) {
      carouselApi.scrollTo(index);
    }
    setActiveVideoIndex(index);
    setIsPlaying(false);
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const logoPath = import.meta.env.DEV 
    ? '/lovable-uploads/d4996f08-c35e-4543-9997-289fd45be96b.png'
    : '/SmartChatAI/lovable-uploads/d4996f08-c35e-4543-9997-289fd45be96b.png';

  const handleAction = (action: string) => {
    switch (action) {
      case '注册':
        navigate('/register');
        break;
      case '登录':
        navigate('/login');
        break;
      default:
        alert(`${action}功能开发中...`);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const navItems = [
    { title: "首页", path: "/" },
    { title: "关于我们", path: "/about" },
    { title: "新闻资讯", path: "/news" },
    { title: "帮助中心", path: "/help" },
    { title: "联系我们", path: "/contact" }
  ];

  const features = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "智能对话",
      description: "基于先进的AI模型，提供智能、自然的对话体验",
      path: "/chat"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "社交互动",
      description: "连接志同道合的朋友，分享知识和见解",
      path: "/community"
    },
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: "实时反馈",
      description: "快速响应，实时互动，让交流更加顺畅",
      path: "/interactive-game"
    },
    {
      icon: <Gamepad2 className="h-8 w-8" />,
      title: "互动游戏",
      description: "趣味性与实用性并存的智能互动体验",
      path: "/interactive-game"
    },
    {
      icon: <HeartPulse className="h-8 w-8" />,
      title: "心理咨询",
      description: "专业的心理健康服务与辅导",
      path: "/psychology"
    },
    {
      icon: <Bot className="h-8 w-8" />,
      title: "数字人",
      description: "打造专属于你的AI数字分身",
      path: "/digital-human"
    }
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
      <header className={`fixed top-0 left-0 right-0 z-50 ${theme === 'dark' ? 'bg-slate-900/80' : 'bg-white/80'} backdrop-blur-sm border-b ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <img 
                src={logoPath}
                alt="知了智能助手"
                className="h-8 cursor-pointer"
                loading="eager"
                onClick={() => navigate('/')}
              />
              <nav className="hidden md:flex space-x-6">
                {navItems.map((item, index) => (
                  <button
                    key={index}
                    className={`text-sm font-medium hover:text-zhiliao-500 transition-colors ${
                      theme === 'dark' ? 'text-white' : 'text-slate-900'
                    }`}
                    onClick={() => navigate(item.path)}
                  >
                    {item.title}
                  </button>
                ))}
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className={`${theme === 'dark' ? 'text-white hover:bg-slate-800' : 'text-slate-900 hover:bg-slate-100'}`}
                onClick={toggleTheme}
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="bg-zhiliao-500 hover:bg-zhiliao-600 text-white"
                onClick={() => handleAction('登录')}
              >
                登录
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="bg-zhiliao-500 hover:bg-zhiliao-600 text-white"
                onClick={() => handleAction('注册')}
              >
                注册
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-zhiliao-600 to-zhiliao-400 opacity-90"></div>
        <div className="container mx-auto px-4 py-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-white">
              <div className="mb-4">
                <img 
                  src={logoPath}
                  alt="知了智能助手" 
                  className="h-12"
                />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                智能助手社交平台
              </h1>
              <p className="text-xl mb-6">
                今天你知了了吗？全方位提供智能服务与社交体验。
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Button 
                  size="lg" 
                  className="bg-zhiliao-500 hover:bg-zhiliao-600 text-white"
                  onClick={() => handleAction('注册')}
                >
                  立即注册
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  size="lg" 
                  className="bg-zhiliao-500 hover:bg-zhiliao-600 text-white"
                  onClick={() => handleAction('登录')}
                >
                  登录账户
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src={logoPath}
                alt="知了智能助手" 
                className="max-w-md mx-auto animate-float" 
              />
            </div>
          </div>
        </div>
      </div>

      <div className={`py-12 ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-50'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">了解知了如何改变生活</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              观看视频，探索知了如何成为您的全能随身助理
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Carousel 
              className="relative" 
              opts={{
                loop: true,
                align: "start"
              }}
            >
              <div onMouseEnter={(e) => {
                const api = (e.currentTarget as any)._embla;
                if (api) {
                  setCarouselApi(api);
                  onCarouselCreated(api);
                }
              }}>
                <CarouselContent>
                  {videos.map((video, index) => (
                    <CarouselItem key={index}>
                      <div className={`relative rounded-xl overflow-hidden aspect-video ${theme === 'dark' ? 'bg-slate-700' : 'bg-white'} shadow-lg`}>
                        <video 
                          id={`video-${index}`}
                          className="w-full h-full object-cover"
                          poster={video.thumbnail}
                          src={video.src}
                          onEnded={handleVideoEnded}
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-all"
                            onClick={toggleVideoPlay}
                          >
                            {isPlaying && activeVideoIndex === index ? 
                              <Pause className="h-8 w-8 text-white" /> : 
                              <Play className="h-8 w-8 text-white" />
                            }
                          </Button>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                          <h3 className="text-white font-medium text-lg">{video.title}</h3>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-center mt-4 gap-2">
                  {videos.map((_, index) => (
                    <button 
                      key={index}
                      className={`w-3 h-3 rounded-full transition-all ${
                        activeVideoIndex === index 
                          ? 'bg-zhiliao-500 scale-110' 
                          : `${theme === 'dark' ? 'bg-slate-600' : 'bg-slate-300'} hover:bg-zhiliao-400`
                      }`}
                      onClick={() => handleManualSelect(index)}
                    />
                  ))}
                </div>
                <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2" />
                <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2" />
              </div>
            </Carousel>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">全方位智能助手</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            结合 AI 能力与社交功能，为您提供一站式智能生活解决方案
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-xl ${
                theme === 'dark' ? 'bg-slate-800' : 'bg-white'
              } shadow-lg transition-all hover:shadow-xl`}
            >
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    {card.icon}
                    <h3 className="text-xl font-semibold">{card.title}</h3>
                  </div>
                  {card.badge && (
                    <Badge variant="secondary" className="bg-zhiliao-500/10 text-zhiliao-500">
                      {card.badge}
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground mb-6">{card.description}</p>
                <Button
                  className="w-full bg-zhiliao-500 hover:bg-zhiliao-600 text-white"
                  onClick={() => navigate(card.link)}
                >
                  立即体验
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`py-10 ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-50'}`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-bold mb-4">全天候 AI 助手</h2>
              <p className="text-muted-foreground mb-6">
                知了智能助手随时为您提供帮助，解答问题，管理日程，提供生活建议。
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className={`mr-3 p-2 rounded-full ${theme === 'dark' ? 'bg-slate-700' : 'bg-white'}`}>
                    <MessageCircle className="text-zhiliao-500 h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">智能对话</h4>
                    <p className="text-sm text-muted-foreground">自然语言交互，准确理解您的需求</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className={`mr-3 p-2 rounded-full ${theme === 'dark' ? 'bg-slate-700' : 'bg-white'}`}>
                    <Users className="text-zhiliao-500 h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">社群连接</h4>
                    <p className="text-sm text-muted-foreground">基于兴趣匹配，拓展您的社交圈</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className={`mr-3 p-2 rounded-full ${theme === 'dark' ? 'bg-slate-700' : 'bg-white'}`}>
                    <ShoppingCart className="text-zhiliao-500 h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">生活服务</h4>
                    <p className="text-sm text-muted-foreground">购物、出行、娱乐一站式解决</p>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <Link to="/chat">
                  <Button className="bg-zhiliao-500 hover:bg-zhiliao-600">
                    立即体验
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
              <div className={`rounded-lg p-4 max-w-sm ${theme === 'dark' ? 'bg-slate-700' : 'bg-white shadow-lg'}`}>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img 
                      src={logoPath}
                      alt="知了助手" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">知了助手</h3>
                    <p className="text-xs text-muted-foreground">在线</p>
                  </div>
                </div>
                <div className={`rounded-lg p-3 mb-2 max-w-xs ${theme === 'dark' ? 'bg-slate-600' : 'bg-slate-100'}`}>
                  <p className="text-sm">您好！我是知了智能助手，有什么可以帮助您的吗？</p>
                </div>
                <div className={`rounded-lg p-3 mb-2 max-w-xs ml-auto ${theme === 'dark' ? 'bg-zhiliao-600 text-white' : 'bg-zhiliao-100'}`}>
                  <p className="text-sm">帮我查询今天的天气</p>
                </div>
                <div className={`rounded-lg p-3 mb-2 max-w-xs ${theme === 'dark' ? 'bg-slate-600' : 'bg-slate-100'}`}>
                  <p className="text-sm">北京今天天气晴朗，气温20-25°C，很适合户外活动。</p>
                </div>
                <div className="flex gap-2 mt-4">
                  <input 
                    type="text" 
                    placeholder="发送消息..." 
                    className={`flex-1 p-2 rounded-full text-sm ${theme === 'dark' ? 'bg-slate-600' : 'bg-slate-100'} border-none focus:outline-none focus:ring-1 focus:ring-zhiliao-500`}
                  />
                  <Button size="sm" className="rounded-full bg-zhiliao-500 hover:bg-zhiliao-600 h-8 w-8 p-0">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className={`rounded-xl overflow-hidden ${theme === 'dark' ? 'bg-gradient-to-r from-zhiliao-800 to-slate-800' : 'bg-gradient-to-r from-zhiliao-500 to-zhiliao-700'}`}>
          <div className="px-6 py-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">立即加入知了社区</h2>
            <p className="max-w-2xl mx-auto mb-6">
              成为知了社区的一员，体验智能助手带来的便捷生活与丰富社交
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/register">
                <Button size="lg" className="bg-zhiliao-500 hover:bg-zhiliao-600 text-white">
                  免费注册
                </Button>
              </Link>
              <Link to="/services">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/20">
                  探索服务
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
