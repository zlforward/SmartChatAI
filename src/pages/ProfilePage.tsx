import React, { useState } from 'react';
import { useTheme } from '@/providers/ThemeProvider';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { 
  User, Edit, Camera, Settings, Bell, 
  Heart, MessageSquare, Star, Award, 
  Calendar, MapPin, Link as LinkIcon, 
  Mail, Phone, Globe, Share2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Profile {
  id: string;
  name: string;
  avatar: string;
  role: string;
  bio: string;
  location: string;
  joinDate: string;
  website: string;
  email: string;
  phone: string;
  stats: {
    posts: number;
    followers: number;
    following: number;
    likes: number;
  };
  interests: string[];
  achievements: {
    title: string;
    description: string;
    date: string;
  }[];
}

const profile: Profile = {
  id: '1',
  name: '张明',
  avatar: '/lovable-uploads/c90b4c9c-14b9-4ad5-8183-6c41b3b1d1da.png',
  role: '社区活跃用户',
  bio: '热爱学习，喜欢分享。专注于人工智能和机器学习领域。',
  location: '北京市朝阳区',
  joinDate: '2023年1月',
  website: 'https://example.com',
  email: 'zhangming@example.com',
  phone: '138****8888',
  stats: {
    posts: 42,
    followers: 128,
    following: 56,
    likes: 324
  },
  interests: ['人工智能', '机器学习', '深度学习', '计算机视觉', '自然语言处理'],
  achievements: [
    {
      title: '社区贡献奖',
      description: '在社区中积极分享知识，帮助他人解决问题',
      date: '2023年12月'
    },
    {
      title: '优秀创作者',
      description: '发布的内容获得高度认可和广泛传播',
      date: '2023年10月'
    }
  ]
};

const ProfilePage: React.FC = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('posts');

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <Card className={theme === 'dark' ? 'bg-slate-800' : ''}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={profile.avatar} />
                      <AvatarFallback>{profile.name[0]}</AvatarFallback>
                    </Avatar>
                    <Button 
                      size="icon" 
                      className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h1 className="text-2xl font-bold">{profile.name}</h1>
                      <Badge variant="secondary">{profile.role}</Badge>
                    </div>
                    <p className="text-muted-foreground mt-1">{profile.bio}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    编辑资料
                  </Button>
                  <Button variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    设置
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">{profile.stats.posts}</div>
                  <div className="text-sm text-muted-foreground">帖子</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{profile.stats.followers}</div>
                  <div className="text-sm text-muted-foreground">关注者</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{profile.stats.following}</div>
                  <div className="text-sm text-muted-foreground">关注</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{profile.stats.likes}</div>
                  <div className="text-sm text-muted-foreground">获赞</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  {profile.location}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  加入于 {profile.joinDate}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Globe className="h-4 w-4 mr-2" />
                  <a href={profile.website} className="text-zhiliao-600 hover:underline">
                    {profile.website}
                  </a>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Mail className="h-4 w-4 mr-2" />
                  {profile.email}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Phone className="h-4 w-4 mr-2" />
                  {profile.phone}
                </div>
              </div>

              <div className="mt-6">
                <h2 className="text-lg font-semibold mb-2">兴趣领域</h2>
                <div className="flex flex-wrap gap-2">
                  {profile.interests.map((interest, index) => (
                    <Badge key={index} variant="secondary">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <h2 className="text-lg font-semibold mb-2">成就</h2>
                <div className="space-y-4">
                  {profile.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Award className="h-5 w-5 text-zhiliao-500 mt-1" />
                      <div>
                        <div className="font-medium">{achievement.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {achievement.description}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {achievement.date}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6">
            <Tabs defaultValue="posts" onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="posts">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  帖子
                </TabsTrigger>
                <TabsTrigger value="likes">
                  <Heart className="h-4 w-4 mr-2" />
                  喜欢
                </TabsTrigger>
                <TabsTrigger value="saved">
                  <Star className="h-4 w-4 mr-2" />
                  收藏
                </TabsTrigger>
              </TabsList>

              <TabsContent value="posts">
                <div className="text-center text-muted-foreground py-8">
                  帖子内容将在这里显示
                </div>
              </TabsContent>

              <TabsContent value="likes">
                <div className="text-center text-muted-foreground py-8">
                  喜欢的内容将在这里显示
                </div>
              </TabsContent>

              <TabsContent value="saved">
                <div className="text-center text-muted-foreground py-8">
                  收藏的内容将在这里显示
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

export default ProfilePage; 