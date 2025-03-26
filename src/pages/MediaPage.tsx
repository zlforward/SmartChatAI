import React, { useState, useRef } from 'react';
import { Play, Image as ImageIcon, Music, Video, Heart, Share2, Download, MoreHorizontal, Pause, Volume2, VolumeX } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Slider } from '@/components/ui/slider';
import { useTheme } from '../providers/ThemeProvider';
import { useToast } from '@/hooks/use-toast';

interface MediaItem {
  id: string;
  title: string;
  description: string;
  type: 'image' | 'video' | 'music';
  thumbnail: string;
  author: {
    name: string;
    avatar: string;
  };
  likes: number;
  duration?: string;
  src?: string; // Added source for video/music
}

const MEDIA_ITEMS: MediaItem[] = [
  {
    id: '1',
    title: '知了 AI 助手介绍',
    description: '了解知了如何帮助您的日常生活',
    type: 'video',
    thumbnail: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1470&auto=format&fit=crop',
    author: {
      name: '知了官方',
      avatar: '/lovable-uploads/56fd07c0-da09-4377-9a6d-4041e1dedf45.png',
    },
    likes: 1250,
    duration: '3:45',
    src: 'https://assets.mixkit.co/videos/preview/mixkit-a-girl-blowing-a-bubble-gum-at-an-amusement-park-1226-large.mp4',
  },
  {
    id: '2',
    title: '数字人技术演示',
    description: '最新数字人技术的展示和应用',
    type: 'video',
    thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1474&auto=format&fit=crop',
    author: {
      name: '技术团队',
      avatar: '/lovable-uploads/6c46fe0c-a9c2-48b7-a27a-471b63da352b.png',
    },
    likes: 876,
    duration: '5:20',
    src: 'https://assets.mixkit.co/videos/preview/mixkit-tree-branches-in-a-breeze-1188-large.mp4',
  },
  {
    id: '3',
    title: '知了产品使用教程',
    description: '学习如何使用知了的各项功能',
    type: 'image',
    thumbnail: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1470&auto=format&fit=crop',
    author: {
      name: '产品团队',
      avatar: '/lovable-uploads/4b52d5b8-3359-4ad1-aed3-127f979b2490.png',
    },
    likes: 543,
  },
  {
    id: '4',
    title: '知了主题曲',
    description: '知了平台官方主题音乐',
    type: 'music',
    thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1474&auto=format&fit=crop',
    author: {
      name: '音乐团队',
      avatar: '/placeholder.svg',
    },
    likes: 1024,
    duration: '3:30',
    src: 'https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3',
  },
  {
    id: '5',
    title: '服务场景展示',
    description: '知了在各种生活场景中的应用',
    type: 'image',
    thumbnail: 'https://images.unsplash.com/photo-1573164713712-03790a178651?q=80&w=1469&auto=format&fit=crop',
    author: {
      name: '设计团队',
      avatar: '/placeholder.svg',
    },
    likes: 782,
  },
  {
    id: '6',
    title: '知了用户故事',
    description: '真实用户分享他们使用知了的故事',
    type: 'video',
    thumbnail: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1470&auto=format&fit=crop',
    author: {
      name: '市场团队',
      avatar: '/placeholder.svg',
    },
    likes: 456,
    duration: '4:15',
    src: 'https://assets.mixkit.co/videos/preview/mixkit-water-flowing-down-rocks-in-a-stream-24055-large.mp4',
  },
];

const MediaPage: React.FC = () => {
  const { theme } = useTheme();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('all');
  const [playingItem, setPlayingItem] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(80);
  
  // References to media elements
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement | null }>({});
  
  const filteredMedia = activeTab === 'all' 
    ? MEDIA_ITEMS 
    : MEDIA_ITEMS.filter(item => item.type === activeTab);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-5 w-5" />;
      case 'image': return <ImageIcon className="h-5 w-5" />;
      case 'music': return <Music className="h-5 w-5" />;
      default: return null;
    }
  };

  const handlePlayMedia = (id: string, type: 'video' | 'music' | 'image') => {
    // Handle images differently
    if (type === 'image') {
      toast({
        title: "查看图片",
        description: "查看完整大图"
      });
      return;
    }
    
    // Toggle play/pause for the clicked item
    if (playingItem === id) {
      if (type === 'video' && videoRefs.current[id]) {
        if (videoRefs.current[id]?.paused) {
          videoRefs.current[id]?.play();
        } else {
          videoRefs.current[id]?.pause();
        }
      } else if (type === 'music' && audioRefs.current[id]) {
        if (audioRefs.current[id]?.paused) {
          audioRefs.current[id]?.play();
        } else {
          audioRefs.current[id]?.pause();
        }
      }
    } else {
      // Pause the currently playing item
      if (playingItem) {
        const currentItem = MEDIA_ITEMS.find(item => item.id === playingItem);
        if (currentItem?.type === 'video' && videoRefs.current[playingItem]) {
          videoRefs.current[playingItem]?.pause();
        } else if (currentItem?.type === 'music' && audioRefs.current[playingItem]) {
          audioRefs.current[playingItem]?.pause();
        }
      }
      
      // Play the new item
      setPlayingItem(id);
      if (type === 'video' && videoRefs.current[id]) {
        videoRefs.current[id]?.play();
      } else if (type === 'music' && audioRefs.current[id]) {
        audioRefs.current[id]?.play();
      }
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    
    // Update volume for all media elements
    Object.keys(videoRefs.current).forEach(key => {
      if (videoRefs.current[key]) {
        videoRefs.current[key]!.volume = newVolume / 100;
      }
    });
    
    Object.keys(audioRefs.current).forEach(key => {
      if (audioRefs.current[key]) {
        audioRefs.current[key]!.volume = newVolume / 100;
      }
    });
    
    // Update mute state
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    
    // Update all media elements
    Object.keys(videoRefs.current).forEach(key => {
      if (videoRefs.current[key]) {
        videoRefs.current[key]!.muted = newMuted;
      }
    });
    
    Object.keys(audioRefs.current).forEach(key => {
      if (audioRefs.current[key]) {
        audioRefs.current[key]!.muted = newMuted;
      }
    });
  };

  const handleLike = (title: string) => {
    toast({
      title: "已添加喜欢",
      description: `您已喜欢「${title}」`,
    });
  };

  const handleShare = (title: string) => {
    toast({
      title: "分享成功",
      description: `您已分享「${title}」`,
    });
  };

  const handleDownload = (title: string) => {
    toast({
      title: "开始下载",
      description: `正在下载「${title}」`,
    });
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">媒体中心</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              探索知了平台的视频、图片和音乐内容
            </p>
          </div>

          <div className="mb-8">
            <Carousel>
              <CarouselContent>
                {MEDIA_ITEMS.slice(0, 3).map((item) => (
                  <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
                    <div className={`p-1 h-full ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'}`}>
                      <Card className={`h-full border-0 ${theme === 'dark' ? 'bg-slate-800' : ''}`}>
                        <CardContent className="p-0">
                          <AspectRatio ratio={16 / 9} className="relative overflow-hidden rounded-t-lg">
                            {item.type === 'video' && (
                              <video 
                                ref={el => videoRefs.current[item.id] = el}
                                src={item.src}
                                poster={item.thumbnail}
                                className={`object-cover w-full h-full ${playingItem === item.id ? 'z-0' : 'z-10'}`}
                                onEnded={() => setPlayingItem(null)}
                                loop={false}
                                muted={isMuted}
                                preload="metadata"
                              />
                            )}
                            {item.type !== 'video' && (
                              <img 
                                src={item.thumbnail} 
                                alt={item.title} 
                                className="object-cover w-full h-full" 
                              />
                            )}
                            {item.type === 'music' && (
                              <audio 
                                ref={el => audioRefs.current[item.id] = el}
                                src={item.src}
                                onEnded={() => setPlayingItem(null)}
                                preload="metadata"
                                muted={isMuted}
                              />
                            )}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Button 
                                size="icon" 
                                variant="secondary" 
                                className="rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50"
                                onClick={() => handlePlayMedia(item.id, item.type)}
                              >
                                {playingItem === item.id ? 
                                  <Pause className="h-6 w-6 text-white" /> : 
                                  item.type === 'music' ? 
                                    <Music className="h-6 w-6 text-white" /> : 
                                    <Play className="h-6 w-6 text-white" />
                                }
                              </Button>
                            </div>
                            <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                              {getTypeIcon(item.type)}
                              {item.duration && item.duration}
                            </div>
                          </AspectRatio>
                        </CardContent>
                        <CardFooter className="flex flex-col items-start p-4">
                          <h3 className="font-bold mb-1">{item.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                          <div className="flex justify-between items-center w-full">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <img src={item.author.avatar} alt={item.author.name} />
                              </Avatar>
                              <span className="text-sm">{item.author.name}</span>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleLike(item.title)}
                            >
                              <Heart className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center mt-4">
                <CarouselPrevious className="static translate-y-0 mr-2" />
                <CarouselNext className="static translate-y-0" />
              </div>
            </Carousel>
          </div>

          {/* Volume controls */}
          {playingItem && (
            <div className={`fixed bottom-4 right-4 p-3 rounded-lg flex items-center gap-3 z-50 ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} shadow-lg`}>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8" 
                onClick={toggleMute}
              >
                {isMuted ? 
                  <VolumeX className="h-4 w-4" /> : 
                  <Volume2 className="h-4 w-4" />
                }
              </Button>
              <div className="w-24">
                <Slider 
                  value={[volume]} 
                  min={0} 
                  max={100} 
                  step={1} 
                  onValueChange={handleVolumeChange} 
                />
              </div>
            </div>
          )}

          <div>
            <Tabs defaultValue="all" onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="all">全部</TabsTrigger>
                <TabsTrigger value="video">视频</TabsTrigger>
                <TabsTrigger value="image">图片</TabsTrigger>
                <TabsTrigger value="music">音乐</TabsTrigger>
              </TabsList>
              
              <TabsContent value={activeTab} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredMedia.map((item) => (
                    <Card key={item.id} className={`overflow-hidden hover:shadow-md transition-shadow ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : ''}`}>
                      <CardContent className="p-0">
                        <AspectRatio ratio={16 / 9} className="relative overflow-hidden">
                          {item.type === 'video' && (
                            <video 
                              ref={el => videoRefs.current[item.id] = el}
                              src={item.src}
                              poster={item.thumbnail}
                              className={`object-cover w-full h-full ${playingItem === item.id ? 'z-0' : 'z-10'}`}
                              onEnded={() => setPlayingItem(null)}
                              loop={false}
                              muted={isMuted}
                              preload="metadata"
                            />
                          )}
                          {item.type !== 'video' && (
                            <img 
                              src={item.thumbnail} 
                              alt={item.title} 
                              className="object-cover w-full h-full" 
                            />
                          )}
                          {item.type === 'music' && (
                            <audio 
                              ref={el => audioRefs.current[item.id] = el}
                              src={item.src}
                              onEnded={() => setPlayingItem(null)}
                              preload="metadata"
                              muted={isMuted}
                            />
                          )}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Button 
                              size="icon" 
                              variant="secondary" 
                              className="rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50"
                              onClick={() => handlePlayMedia(item.id, item.type)}
                            >
                              {playingItem === item.id ? 
                                <Pause className="h-6 w-6 text-white" /> : 
                                item.type === 'music' ? 
                                  <Music className="h-6 w-6 text-white" /> : 
                                  item.type === 'image' ?
                                    <ImageIcon className="h-6 w-6 text-white" /> :
                                    <Play className="h-6 w-6 text-white" />
                              }
                            </Button>
                          </div>
                          <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                            {getTypeIcon(item.type)}
                            {item.duration && item.duration}
                          </div>
                        </AspectRatio>
                      </CardContent>
                      <CardFooter className="flex flex-col items-start p-4">
                        <h3 className="font-bold mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                        <div className="flex justify-between items-center w-full">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <img src={item.author.avatar} alt={item.author.name} />
                            </Avatar>
                            <span className="text-sm">{item.author.name}</span>
                          </div>
                          <div className="flex gap-1">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0"
                              onClick={() => handleLike(item.title)}
                            >
                              <Heart className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0"
                              onClick={() => handleShare(item.title)}
                            >
                              <Share2 className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0"
                              onClick={() => handleDownload(item.title)}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MediaPage;
