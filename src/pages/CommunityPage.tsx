import React, { useState } from 'react';
import { useTheme } from '@/providers/ThemeProvider';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { 
  MessageSquare, Heart, Share2, MoreVertical, 
  Plus, Search, Filter, Users, Calendar, MapPin
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  content: string;
  images?: string[];
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  location?: string;
  tags: string[];
}

const posts: Post[] = [
  {
    id: '1',
    author: {
      name: '张明',
      avatar: '/lovable-uploads/c90b4c9c-14b9-4ad5-8183-6c41b3b1d1da.png',
      role: '社区活跃用户'
    },
    content: '今天参加了一个很有趣的读书会，大家分享了很多关于人工智能的见解。期待下次活动！',
    images: ['/lovable-uploads/860d56a0-686c-407f-b7a1-77f1afca07f6.png'],
    likes: 24,
    comments: 8,
    shares: 3,
    timestamp: '2小时前',
    location: '北京市朝阳区',
    tags: ['读书会', '人工智能', '学习']
  },
  {
    id: '2',
    author: {
      name: '李华',
      avatar: '/lovable-uploads/3ccdab5c-69fb-4839-b9f7-a78636c23573.png',
      role: '社区管理员'
    },
    content: '新的一周开始了！大家有什么学习计划吗？欢迎在评论区分享你的目标。',
    likes: 42,
    comments: 15,
    shares: 6,
    timestamp: '4小时前',
    tags: ['学习计划', '目标设定']
  }
];

const CommunityPage: React.FC = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">社区</h1>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              发布
            </Button>
          </div>

          <div className="flex gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="搜索帖子" 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              筛选
            </Button>
          </div>

          <Tabs defaultValue="all" onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="all">全部</TabsTrigger>
              <TabsTrigger value="following">关注</TabsTrigger>
              <TabsTrigger value="hot">热门</TabsTrigger>
              <TabsTrigger value="new">最新</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-6">
              {posts.map((post) => (
                <Card key={post.id} className={theme === 'dark' ? 'bg-slate-800' : ''}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={post.author.avatar} />
                          <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{post.author.name}</div>
                          <div className="text-sm text-muted-foreground">{post.author.role}</div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>

                    <p className="mb-4">{post.content}</p>

                    {post.images && (
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {post.images.map((image, index) => (
                          <img 
                            key={index} 
                            src={image} 
                            alt={`Post image ${index + 1}`}
                            className="rounded-lg object-cover w-full h-48"
                          />
                        ))}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Heart className="h-4 w-4 mr-1" />
                          {post.likes}
                        </div>
                        <div className="flex items-center">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          {post.comments}
                        </div>
                        <div className="flex items-center">
                          <Share2 className="h-4 w-4 mr-1" />
                          {post.shares}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {post.location && (
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {post.location}
                          </div>
                        )}
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {post.timestamp}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="following">
              <div className="text-center text-muted-foreground py-8">
                关注的内容将在这里显示
              </div>
            </TabsContent>

            <TabsContent value="hot">
              <div className="text-center text-muted-foreground py-8">
                热门内容将在这里显示
              </div>
            </TabsContent>

            <TabsContent value="new">
              <div className="text-center text-muted-foreground py-8">
                最新内容将在这里显示
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CommunityPage; 